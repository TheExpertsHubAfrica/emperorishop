(function () {
  "use strict";

  var config = window.EMPERORISHOP_CHECKOUT || {};

  function $(id) {
    return document.getElementById(id);
  }

  var modalCustomer = $("checkout-modal-customer");
  var modalSuccess = $("checkout-modal-success");
  var form = $("checkout-customer-form");
  var deliveryPanel = $("checkout-delivery-panel");
  var btnCloseCustomer = $("checkout-modal-customer-close");
  var btnCloseSuccess = $("checkout-modal-success-dismiss");
  var btnDoneSuccess = $("checkout-modal-success-done");
  var backdropCustomer = $("checkout-modal-customer-backdrop");
  var backdropSuccess = $("checkout-modal-success-backdrop");
  var btnUseLocation = $("checkout-btn-use-location");
  var locationHint = $("checkout-location-hint");
  var inputLat = $("checkout-delivery-lat");
  var inputLng = $("checkout-delivery-lng");
  var errBox = $("checkout-form-error");

  var pendingSnap = null;

  function getOrderSnapshot() {
    if (window.emperorishopBuyMacbook && window.emperorishopBuyMacbook.getOrderSnapshot) {
      var m = window.emperorishopBuyMacbook.getOrderSnapshot();
      if (m) return m;
    }
    if (window.emperorishopBuyiPhone && window.emperorishopBuyiPhone.getOrderSnapshot) {
      return window.emperorishopBuyiPhone.getOrderSnapshot();
    }
    return null;
  }

  function showError(msg) {
    if (!errBox) return;
    errBox.textContent = msg || "";
    errBox.hidden = !msg;
  }

  function openModal(el) {
    if (!el) return;
    el.hidden = false;
    document.body.classList.add("checkout-modal-open");
    var focusTarget = el.querySelector("input:not([type='hidden']), select, button");
    if (focusTarget) focusTarget.focus();
  }

  function closeModal(el) {
    if (!el) return;
    el.hidden = true;
    if ((!modalCustomer || modalCustomer.hidden) && (!modalSuccess || modalSuccess.hidden)) {
      document.body.classList.remove("checkout-modal-open");
    }
  }

  function fulfillmentValue() {
    var r = form && form.elements.fulfillment;
    if (!r) return "pickup";
    if (r.value === "delivery") return "delivery";
    return "pickup";
  }

  function syncDeliveryPanel() {
    if (!deliveryPanel) return;
    deliveryPanel.hidden = fulfillmentValue() !== "delivery";
  }

  function randomSuffix() {
    return Math.floor(Math.random() * 1e6)
      .toString()
      .padStart(6, "0");
  }

  function paystackRef() {
    return "EMP-" + Date.now() + "-" + randomSuffix();
  }

  function validateCustomer() {
    showError("");
    var name = ($("checkout-customer-name") && $("checkout-customer-name").value.trim()) || "";
    var email = ($("checkout-customer-email") && $("checkout-customer-email").value.trim()) || "";
    var phone = ($("checkout-customer-phone") && $("checkout-customer-phone").value.trim()) || "";
    var plan = "full";
    var planEl = form.querySelector('input[name="paymentPlan"]:checked');
    if (planEl && planEl.value === "installments") plan = "installments";

    if (!name || name.length < 2) {
      showError("Please enter your full name.");
      return null;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Please enter a valid email address.");
      return null;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      showError("Please enter a valid phone number.");
      return null;
    }
    if (plan === "installments") {
      showError("Installment checkout is not available yet. Please choose full payment.");
      return null;
    }

    var fulfillment = fulfillmentValue();
    var lat = (inputLat && inputLat.value) || "";
    var lng = (inputLng && inputLng.value) || "";
    var line1 = ($("checkout-address-line1") && $("checkout-address-line1").value.trim()) || "";
    var city = ($("checkout-city") && $("checkout-city").value.trim()) || "";
    var region = ($("checkout-region") && $("checkout-region").value.trim()) || "";
    var notes = ($("checkout-delivery-notes") && $("checkout-delivery-notes").value.trim()) || "";

    if (fulfillment === "delivery") {
      var hasCoords = lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng));
      var hasAddress = line1 && city && region;
      if (!hasCoords && !hasAddress) {
        showError(
          "For delivery, either capture your location or enter your full address (line, city, and region)."
        );
        return null;
      }
    }

    return {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      paymentPlan: plan,
      fulfillment: fulfillment,
      deliveryLat: lat,
      deliveryLng: lng,
      addressLine1: line1,
      city: city,
      region: region,
      deliveryNotes: notes,
    };
  }

  function postToAppsScript(payload) {
    var url = (config.APPS_SCRIPT_URL || "").trim();
    if (!url) {
      console.warn(
        "[Emperorishop] Set EMPERORISHOP_CHECKOUT.APPS_SCRIPT_URL in checkout-config.js to log orders."
      );
      return;
    }
    var body = new URLSearchParams();
    Object.keys(payload).forEach(function (k) {
      if (payload[k] !== undefined && payload[k] !== null) {
        body.append(k, String(payload[k]));
      }
    });
    fetch(url, {
      method: "POST",
      body: body.toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      mode: "no-cors",
      cache: "no-store",
    }).catch(function (e) {
      console.warn("[Emperorishop] Apps Script request:", e);
    });
  }

  function runPaystack(snap, customer) {
    var pk = (config.PAYSTACK_PUBLIC_KEY || "").trim();
    if (!pk) {
      showError("Paystack public key is not configured.");
      return;
    }
    if (typeof PaystackPop === "undefined") {
      showError("Payment library failed to load. Please refresh and try again.");
      return;
    }

    var ref = paystackRef();
    var handler = PaystackPop.setup({
      key: pk,
      email: customer.customerEmail,
      amount: snap.amountPesewas,
      currency: "GHS",
      ref: ref,
      metadata: {
        custom_fields: [
          {
            display_name: "Order",
            variable_name: "order_summary",
            value: snap.summaryLine.slice(0, 200),
          },
        ],
      },
      callback: function (response) {
        closeModal(modalCustomer);
        var payload = {
          paystack_reference: response.reference || ref,
          customer_name: customer.customerName,
          customer_email: customer.customerEmail,
          customer_phone: customer.customerPhone,
          payment_plan: customer.paymentPlan,
          fulfillment: customer.fulfillment,
          delivery_lat: customer.deliveryLat,
          delivery_lng: customer.deliveryLng,
          address_line1: customer.addressLine1,
          city: customer.city,
          region: customer.region,
          delivery_notes: customer.deliveryNotes,
          order_summary: snap.summaryLine,
          amount_ghs: String(snap.totalGhs),
          amount_pesewas: String(snap.amountPesewas),
          family_key: snap.familyKey || "",
          order_json: JSON.stringify(snap),
        };
        postToAppsScript(payload);
        openModal(modalSuccess);
      },
      onClose: function () {},
    });
    handler.openIframe();
  }

  window.emperorishopOpenCheckout = function () {
    showError("");
    var snap = getOrderSnapshot();
    if (!snap) {
      return;
    }
    pendingSnap = snap;
    var preview = $("checkout-order-preview");
    var amt = $("checkout-amount-display");
    if (preview) preview.textContent = snap.summaryLine;
    if (amt) {
      amt.textContent = "GH₵\u00a0" + snap.totalGhs.toLocaleString("en-GH") + " (full payment)";
    }
    if (form) form.reset();
    if (inputLat) inputLat.value = "";
    if (inputLng) inputLng.value = "";
    if (locationHint) {
      locationHint.textContent = "";
      locationHint.hidden = true;
    }
    syncDeliveryPanel();
    openModal(modalCustomer);
  };

  if (form) {
    form.addEventListener("change", function (e) {
      if (e.target && e.target.name === "fulfillment") syncDeliveryPanel();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var snap = pendingSnap || getOrderSnapshot();
      if (!snap) return;
      var customer = validateCustomer();
      if (!customer) return;
      runPaystack(snap, customer);
    });
  }

  if (btnUseLocation) {
    btnUseLocation.addEventListener("click", function () {
      showError("");
      if (!navigator.geolocation) {
        showError("Location is not supported in this browser. Please enter your address manually.");
        return;
      }
      locationHint.hidden = false;
      locationHint.textContent = "Requesting location…";
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          if (inputLat) inputLat.value = String(pos.coords.latitude);
          if (inputLng) inputLng.value = String(pos.coords.longitude);
          locationHint.textContent =
            "Location captured. You may add more detail below for the courier.";
        },
        function () {
          showError("Could not read your location. Please allow permission or enter your address manually.");
          locationHint.textContent = "";
          locationHint.hidden = true;
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  }

  function wireClose() {
    if (btnCloseCustomer)
      btnCloseCustomer.addEventListener("click", function () {
        closeModal(modalCustomer);
      });
    if (backdropCustomer)
      backdropCustomer.addEventListener("click", function () {
        closeModal(modalCustomer);
      });
    function closeSuccess() {
      closeModal(modalSuccess);
    }
    if (btnCloseSuccess) btnCloseSuccess.addEventListener("click", closeSuccess);
    if (btnDoneSuccess) btnDoneSuccess.addEventListener("click", closeSuccess);
    if (backdropSuccess)
      backdropSuccess.addEventListener("click", function () {
        closeModal(modalSuccess);
      });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal(modalCustomer);
        closeModal(modalSuccess);
      }
    });
  }

  wireClose();
  syncDeliveryPanel();
})();
