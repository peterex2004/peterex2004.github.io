/* Threshold Zone Bench — language switch (EN / 中文).
   Markup carries both languages; CSS hides the inactive one.
   Proper nouns (VO2max, LTHR, HRmax, HRR, Karvonen, Friel, bpm…) stay untranslated. */
(function(){
  "use strict";
  var KEY = "tzb-lang";

  function detect(){
    var v = null;
    try { v = localStorage.getItem(KEY); } catch(e){}
    if (v === "en" || v === "zh") return v;
    return (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  }

  function apply(l, persist){
    document.documentElement.setAttribute("data-lang", l);
    document.documentElement.setAttribute("lang", l === "zh" ? "zh-Hant" : "en");
    if (persist){ try { localStorage.setItem(KEY, l); } catch(e){} }
    document.querySelectorAll(".langsw button").forEach(function(b){
      b.setAttribute("aria-pressed", b.dataset.lang === l ? "true" : "false");
    });
    document.dispatchEvent(new CustomEvent("langchange", {detail:{lang:l}}));
  }

  window.Lang = {
    current: function(){ return document.documentElement.getAttribute("data-lang") || detect(); },
    set: function(l){ apply(l, true); }
  };

  apply(window.Lang.current(), false);

  document.addEventListener("click", function(e){
    var b = e.target.closest(".langsw button");
    if (b) window.Lang.set(b.dataset.lang);
  });
})();
