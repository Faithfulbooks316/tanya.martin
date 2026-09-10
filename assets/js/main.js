(function () {
  "use strict";
  var PHONE_DISPLAY = "(401) 304-738_";
  var PHONE_TEL = "tel:+14013044738X";
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var PATH_KEY = "ccc-path";
  function getPath() { try { return sessionStorage.getItem(PATH_KEY) || ""; } catch (e) { return ""; } }
  function setPath(value) {
    try { sessionStorage.setItem(PATH_KEY, value); } catch (e) {}
    document.body.setAttribute("data-path", value);
    var hidden = document.getElementById("path-field");
    if (hidden) hidden.value = value;
    document.querySelectorAll("[data-path-card]").forEach(function (card) {
      card.classList.toggle("active", card.getAttribute("data-path-card") === value);
    });
    var hint = document.getElementById("path-hint");
    if (hint) {
      hint.textContent = value === "residential"
        ? "Residential path selected. First-month offer is calculated below."
        : value === "commercial"
          ? "Commercial path selected. Contract ranges use 2026 industry square-foot rates."
          : "Choose residential or commercial to see the matching agreement range.";
    }
  }
  document.querySelectorAll("[data-choose-path]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setPath(btn.getAttribute("data-choose-path"));
      var target = document.getElementById(btn.getAttribute("data-choose-path") + "-contract");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  setPath(getPath());
  var params = new URLSearchParams(window.location.search);
  if (params.get("path") === "residential" || params.get("path") === "commercial") setPath(params.get("path"));
  var RI_STANDARD = 201;
  var INTRO = Math.round(RI_STANDARD * 0.25);
  document.querySelectorAll("[data-intro-price]").forEach(function (el) { el.textContent = "$" + INTRO; });
  document.querySelectorAll("[data-standard-price]").forEach(function (el) { el.textContent = "$" + RI_STANDARD; });
  var rates = {
    office: { low: 0.088, high: 0.107, label: "Office" },
    retail: { low: 0.09, high: 0.11, label: "Retail / restaurant floor" },
    medical: { low: 0.15, high: 0.185, label: "Medical" },
    warehouse: { low: 0.052, high: 0.065, label: "Warehouse" }
  };
  var formEst = document.getElementById("est-form");
  var estOut = document.getElementById("est-out");
  if (formEst && estOut) {
    formEst.addEventListener("submit", function (e) {
      e.preventDefault();
      var sq = Number(document.getElementById("est-sqft").value);
      var type = document.getElementById("est-type").value;
      var visits = Number(document.getElementById("est-visits").value);
      if (!sq || sq < 200) { estOut.textContent = "Enter at least 200 square feet."; return; }
      var r = rates[type] || rates.office;
      var low = Math.round(sq * r.low * visits);
      var high = Math.round(sq * r.high * visits);
      estOut.textContent = r.label + " industry planning range: $" + low.toLocaleString() + "-$" + high.toLocaleString() + " per month before a site walk. Crystal Clear quotes after seeing the finishes.";
      setPath("commercial");
    });
  }
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        status.className = "form-status err";
        status.textContent = "Please complete the required fields.";
        return;
      }
      var action = form.getAttribute("action") || "";
      if (action.indexOf("FORM_ID") !== -1) {
        e.preventDefault();
        status.className = "form-status err";
        status.textContent = "The form inbox is not connected yet. Email tanyaamartin1@gmail.com or call " + PHONE_DISPLAY + ".";
        return;
      }
      e.preventDefault();
      fetch(action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) { status.className = "form-status ok"; status.textContent = "Message sent. Tanya will follow up."; form.reset(); setPath(getPath()); }
          else throw new Error("fail");
        })
        .catch(function () { status.className = "form-status err"; status.textContent = "Could not send. Email tanyaamartin1@gmail.com instead."; });
    });
  }
  var dialog = document.getElementById("lightbox");
  if (dialog) {
    var tiles = Array.prototype.slice.call(document.querySelectorAll("[data-lb]"));
    var img = document.getElementById("lb-img");
    var cap = document.getElementById("lb-cap");
    var idx = 0; var last = null;
    function openAt(i) {
      idx = (i + tiles.length) % tiles.length;
      var t = tiles[idx];
      img.src = t.getAttribute("data-src");
      img.alt = t.getAttribute("data-alt") || "";
      cap.textContent = t.getAttribute("data-cap") || "";
      if (typeof dialog.showModal === "function") dialog.showModal();
      cap.focus();
    }
    tiles.forEach(function (tile, i) {
      tile.addEventListener("click", function () { last = tile; openAt(i); });
      tile.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); last = tile; openAt(i); }
      });
    });
    document.getElementById("lb-close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("close", function () { if (last) last.focus(); });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") openAt(idx + 1);
      if (e.key === "ArrowLeft") openAt(idx - 1);
    });
  }
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    if (!a.getAttribute("href") || a.getAttribute("href").indexOf("X") !== -1) a.setAttribute("href", PHONE_TEL);
  });
})();
