/* Prana Spa Centre — WhatsApp appointment helper */
(function () {
  "use strict";
  var WHATSAPP_NUMBER = "918210976669";

  function openWhatsApp(message) {
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form[data-prana-whatsapp-form]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

        var data = new FormData(form);
        var name = (data.get("name") || "").toString().trim();
        var phone = (data.get("phone") || "").toString().trim();
        var treatment = (data.get("service") || data.get("treatment") || "").toString().trim();
        var date = (data.get("preferred_date") || "").toString().trim();
        var message = (data.get("message") || "").toString().trim();
        var requestType = form.getAttribute("data-prana-whatsapp-form") === "contact"
          ? "an enquiry"
          : "an appointment";

        var lines = [
          "Hello Prana Spa Centre, I would like to make " + requestType + ".",
          name ? "Name: " + name : "",
          phone ? "Phone: " + phone : "",
          treatment ? "Treatment: " + treatment : "",
          date ? "Preferred date: " + date : "",
          message ? "Message: " + message : ""
        ].filter(Boolean);

        openWhatsApp(lines.join("\n"));
      });
    });
  });
})();
