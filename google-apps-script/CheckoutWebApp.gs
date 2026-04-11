/**
 * Emperorishop — iPhone checkout backend (Google Apps Script)
 *
 * SETUP
 * 1. Create a new Apps Script project, paste this file as Code.gs.
 * 2. Project Settings → Script properties → Add:
 *    - PAYSTACK_SECRET_KEY = your Paystack SECRET key (test or live) — never put this in the website.
 *    - ADMIN_EMAILS = comma-separated admin addresses (e.g. ops@example.com,sales@example.com)
 *    - SHEET_ID = ID of a Google Sheet (from the sheet URL) for order logs (optional but recommended).
 * 3. Create or open the Sheet: first row will be written as headers if the sheet is empty.
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL and paste it into buyiphone/checkout-config.js as APPS_SCRIPT_URL.
 *
 * The static site POSTs application/x-www-form-urlencoded data (no secret keys in the browser).
 * Each request verifies the Paystack reference server-side before logging and emailing.
 */

var SHEET_NAME = "Orders";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var ref = String(p.paystack_reference || "").trim();
    if (!ref) {
      return jsonOut({ ok: false, error: "missing paystack_reference" });
    }

    var secret = PropertiesService.getScriptProperties().getProperty("PAYSTACK_SECRET_KEY");
    if (!secret) {
      return jsonOut({ ok: false, error: "server misconfigured: PAYSTACK_SECRET_KEY" });
    }

    var verified = verifyPaystackTransaction_(ref, secret);
    if (!verified.ok) {
      return jsonOut({ ok: false, error: verified.error || "verification_failed" });
    }

    var clientPesewas = parseInt(String(p.amount_pesewas || "0"), 10);
    if (verified.amountPesewas && clientPesewas && verified.amountPesewas !== clientPesewas) {
      // Log mismatch but still treat as paid if Paystack says success (amount from Paystack wins).
      Logger.log("Amount mismatch client=" + clientPesewas + " paystack=" + verified.amountPesewas);
    }

    var amountGhsDisplay = verified.amountPesewas
      ? (verified.amountPesewas / 100).toFixed(2)
      : String(p.amount_ghs || "");

    var row = {
      timestamp: new Date(),
      paystackRef: ref,
      customerName: String(p.customer_name || ""),
      customerEmail: String(p.customer_email || ""),
      customerPhone: String(p.customer_phone || ""),
      fulfillment: String(p.fulfillment || ""),
      addressLine1: String(p.address_line1 || ""),
      city: String(p.city || ""),
      region: String(p.region || ""),
      deliveryLat: String(p.delivery_lat || ""),
      deliveryLng: String(p.delivery_lng || ""),
      deliveryNotes: String(p.delivery_notes || ""),
      paymentPlan: String(p.payment_plan || "full"),
      amountGhs: amountGhsDisplay || String(p.amount_ghs || ""),
      orderSummary: String(p.order_summary || ""),
      orderJson: String(p.order_json || ""),
    };

    appendSheetRow_(row, ref);
    sendEmails_(row, verified, ref);

    return jsonOut({ ok: true });
  } catch (err) {
    Logger.log(err);
    return jsonOut({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("Emperorishop checkout endpoint (POST only).");
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function verifyPaystackTransaction_(reference, secretKey) {
  var url = "https://api.paystack.co/transaction/verify/" + encodeURIComponent(reference);
  var res = UrlFetchApp.fetch(url, {
    method: "get",
    headers: { Authorization: "Bearer " + secretKey },
    muteHttpExceptions: true,
  });
  var code = res.getResponseCode();
  var text = res.getContentText();
  var body;
  try {
    body = JSON.parse(text);
  } catch (e) {
    return { ok: false, error: "invalid_paystack_response" };
  }
  if (code !== 200 || !body || body.status !== true) {
    return { ok: false, error: "paystack_http_" + code };
  }
  var d = body.data || {};
  if (d.status !== "success") {
    return { ok: false, error: "transaction_not_successful" };
  }
  return {
    ok: true,
    amountPesewas: d.amount ? parseInt(d.amount, 10) : null,
    currency: d.currency || "GHS",
    paystackCustomerEmail: d.customer && d.customer.email ? d.customer.email : "",
  };
}

function getSheet_() {
  var id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!id) return null;
  return SpreadsheetApp.openById(id);
}

function appendSheetRow_(row, ref) {
  var ss = getSheet_();
  if (!ss) {
    Logger.log("SHEET_ID not set; skipping sheet log.");
    return;
  }
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Paystack ref",
      "Name",
      "Email",
      "Phone",
      "Fulfillment",
      "Address line",
      "City",
      "Region",
      "Lat",
      "Lng",
      "Delivery notes",
      "Payment plan",
      "Amount (GHS)",
      "Order summary",
      "Order JSON",
    ]);
  }
  if (refExists_(sheet, ref)) {
    Logger.log("Duplicate ref, skipping row: " + ref);
    return;
  }
  sheet.appendRow([
    row.timestamp,
    row.paystackRef,
    row.customerName,
    row.customerEmail,
    row.customerPhone,
    row.fulfillment,
    row.addressLine1,
    row.city,
    row.region,
    row.deliveryLat,
    row.deliveryLng,
    row.deliveryNotes,
    row.paymentPlan,
    row.amountGhs,
    row.orderSummary,
    row.orderJson,
  ]);
}

function refExists_(sheet, ref) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var col = sheet.getRange(2, 2, last, 2).getValues();
  for (var i = 0; i < col.length; i++) {
    if (String(col[i][0]) === ref) return true;
  }
  return false;
}

function sendEmails_(row, verified, ref) {
  var adminRaw = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAILS");
  if (!adminRaw) {
    Logger.log("ADMIN_EMAILS not set; skipping admin email.");
  }

  var customerSubject = "Emperorishop — We received your iPhone order";
  var adminSubject = "[Emperorishop] New paid iPhone order — " + ref;

  var customerHtml = buildCustomerEmailHtml_(row, ref);
  var adminHtml = buildAdminEmailHtml_(row, verified, ref);

  if (row.customerEmail && row.customerEmail.indexOf("@") !== -1) {
    MailApp.sendEmail({
      to: row.customerEmail,
      subject: customerSubject,
      htmlBody: customerHtml,
      name: "Emperorishop",
    });
  } else {
    Logger.log("Invalid or missing customer email; skipping customer notification.");
  }

  if (adminRaw) {
    var admins = adminRaw.split(",").map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return s;
    });
    if (admins.length) {
      var adminOpts = {
        to: admins[0],
        subject: adminSubject,
        htmlBody: adminHtml,
        name: "Emperorishop Orders",
      };
      if (admins.length > 1) {
        adminOpts.cc = admins.slice(1).join(",");
      }
      MailApp.sendEmail(adminOpts);
    }
  }
}

function buildCustomerEmailHtml_(row, ref) {
  var bg = "#f5f5f7";
  var blue = "#0071e3";
  var text = "#1d1d1f";
  var muted = "#6e6e73";
  var card = "#ffffff";

  var addr =
    row.addressLine1 || row.city || row.region
      ? esc_(row.addressLine1) +
        (row.city ? "<br/>" + esc_(row.city) : "") +
        (row.region ? ", " + esc_(row.region) : "")
      : "—";

  var loc =
    row.deliveryLat && row.deliveryLng
      ? esc_(row.deliveryLat) + ", " + esc_(row.deliveryLng)
      : "—";

  return (
    '<div style="margin:0;padding:0;background:' +
    bg +
    ';font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:' +
    text +
    ';">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:' +
    bg +
    ';padding:32px 16px;">' +
    "<tr><td align=\"center\">" +
    '<table role="presentation" width="100%" style="max-width:560px;background:' +
    card +
    ';border-radius:16px;padding:28px 24px 32px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">' +
    "<tr><td>" +
    '<p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:' +
    blue +
    ';">Emperorishop</p>' +
    '<h1 style="margin:0 0 12px;font-size:24px;font-weight:600;line-height:1.15;color:' +
    text +
    ';">Thank you for your order</h1>' +
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.5;color:' +
    muted +
    ';">We\'ve received your payment and saved your details. Reference: <strong style="color:' +
    text +
    ';">' +
    esc_(ref) +
    "</strong></p>" +
    '<div style="background:' +
    bg +
    ';border-radius:12px;padding:16px 18px;margin-bottom:20px;">' +
    '<p style="margin:0 0 6px;font-size:12px;font-weight:600;color:' +
    muted +
    ';">YOUR CONFIGURATION</p>' +
    '<p style="margin:0;font-size:15px;line-height:1.45;color:' +
    text +
    ';">' +
    esc_(row.orderSummary) +
    "</p>" +
    '<p style="margin:12px 0 0;font-size:17px;font-weight:600;color:' +
    text +
    ';">Amount paid: GH₵ ' +
    esc_(String(row.amountGhs)) +
    "</p>" +
    "</div>" +
    '<p style="margin:0 0 6px;font-size:12px;font-weight:600;color:' +
    muted +
    ';">FULFILLMENT</p>' +
    '<p style="margin:0 0 16px;font-size:15px;line-height:1.45;color:' +
    text +
    ';">' +
    esc_(row.fulfillment === "delivery" ? "Delivery" : "Pick up from store") +
    "</p>" +
    (row.fulfillment === "delivery"
      ? '<p style="margin:0 0 4px;font-size:12px;font-weight:600;color:' +
        muted +
        ';">ADDRESS / LOCATION</p>' +
        '<p style="margin:0 0 16px;font-size:15px;line-height:1.45;color:' +
        text +
        ';">' +
        addr +
        "</p>" +
        '<p style="margin:0 0 4px;font-size:12px;font-weight:600;color:' +
        muted +
        ';">COORDINATES (IF PROVIDED)</p>' +
        '<p style="margin:0 0 16px;font-size:14px;line-height:1.45;color:' +
        text +
        ';">' +
        loc +
        "</p>"
      : "") +
    '<p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:' +
    muted +
    ';">Questions? Reply to this email or contact Emperorishop support.</p>' +
    '<p style="margin:20px 0 0;font-size:12px;color:' +
    muted +
    ';">© Emperorishop · Ghana</p>' +
    "</td></tr></table>" +
    "</td></tr></table></div>"
  );
}

function buildAdminEmailHtml_(row, verified, ref) {
  var bg = "#f5f5f7";
  var text = "#1d1d1f";
  var muted = "#6e6e73";
  var card = "#ffffff";
  var blue = "#0071e3";

  var rowsHtml =
    rowHtml_("Paystack ref", ref) +
    rowHtml_("Customer", esc_(row.customerName)) +
    rowHtml_("Email", esc_(row.customerEmail)) +
    rowHtml_("Phone", esc_(row.customerPhone)) +
    rowHtml_("Fulfillment", esc_(row.fulfillment)) +
    rowHtml_("Amount (GHS)", esc_(String(row.amountGhs))) +
    rowHtml_("Plan", esc_(row.paymentPlan)) +
    rowHtml_("Order", esc_(row.orderSummary)) +
    rowHtml_("Address line", esc_(row.addressLine1)) +
    rowHtml_("City / Region", esc_(row.city) + " / " + esc_(row.region)) +
    rowHtml_("Lat / Lng", esc_(row.deliveryLat) + " / " + esc_(row.deliveryLng)) +
    rowHtml_("Notes", esc_(row.deliveryNotes));

  return (
    '<div style="margin:0;padding:0;background:' +
    bg +
    ';font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:' +
    text +
    ';">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:' +
    bg +
    ';padding:28px 16px;">' +
    "<tr><td align=\"center\">" +
    '<table role="presentation" width="100%" style="max-width:640px;background:' +
    card +
    ';border-radius:14px;padding:24px 22px 28px;">' +
    "<tr><td>" +
    '<p style="margin:0 0 4px;font-size:12px;font-weight:600;color:' +
    blue +
    ';">New paid order</p>' +
    '<h1 style="margin:0 0 16px;font-size:22px;font-weight:600;">iPhone checkout</h1>' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;">' +
    rowsHtml +
    "</table>" +
    '<p style="margin:20px 0 0;font-size:12px;color:' +
    muted +
    ';">Paystack verified · Currency ' +
    esc_(String(verified.currency || "GHS")) +
    "</p>" +
    "</td></tr></table></td></tr></table></div>"
  );
}

function rowHtml_(label, value) {
  var muted = "#6e6e73";
  var text = "#1d1d1f";
  return (
    "<tr>" +
    '<td style="padding:8px 0;border-bottom:1px solid #e8e8ed;vertical-align:top;width:32%;color:' +
    muted +
    ';">' +
    esc_(label) +
    "</td>" +
    '<td style="padding:8px 0;border-bottom:1px solid #e8e8ed;color:' +
    text +
    ';">' +
    value +
    "</td>" +
    "</tr>"
  );
}

function esc_(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
