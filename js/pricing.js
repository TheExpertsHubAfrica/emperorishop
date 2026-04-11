/**
 * Single reference rate for USD → Ghana cedi display (marketing / illustrative).
 * Update EMPERORISHOP_USD_TO_GHS when you refresh the rate.
 */
(function (global) {
  var USD_TO_GHS = 15.5;
  global.EMPERORISHOP_USD_TO_GHS = USD_TO_GHS;
  global.emperorishopGhsFromUsd = function (usd) {
    return Math.round(Number(usd) * USD_TO_GHS);
  };
  global.emperorishopFormatGhs = function (usd) {
    return "GH₵\u00a0" + global.emperorishopGhsFromUsd(usd).toLocaleString("en-GH");
  };
  global.emperorishopMonthlyGhs = function (totalUsd, months) {
    months = months || 24;
    return Math.round((Number(totalUsd) / months) * USD_TO_GHS);
  };
})(typeof window !== "undefined" ? window : this);
