/**
 * Checkout configuration (safe to expose publicly: Paystack public key only).
 * NEVER put your Paystack secret key here — set it in Apps Script Properties only.
 *
 * After deploying the Google Apps Script web app, paste its URL into APPS_SCRIPT_URL.
 */
window.EMPERORISHOP_CHECKOUT = {
  PAYSTACK_PUBLIC_KEY: "pk_test_fae6ba8263469a9e1fe3ba838500d012d8556fc2",
  /** Deploy "Web app" from Apps Script and paste the /exec URL here */
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyvVtcc56-Y02zLr-3SM20xhTaMsYtg2PXGCzXpmiRnfJygUoFmOMBQos39aGVL4d0ohQ/exec",
};
