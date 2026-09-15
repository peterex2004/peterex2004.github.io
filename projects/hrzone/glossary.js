/* Threshold Zone Bench — glossary popovers, English / 中文.
   Author a term in HTML as:  LTHR<i data-g="lthr"></i>
   Each <i data-g> becomes a "?" button with a hover / focus / tap popover.
   The popover follows the page language. Proper nouns are left untranslated. */
(function(){
  "use strict";

  var G = {
    lthr:{
      t:"LTHR — lactate threshold heart rate", tz:"LTHR — 乳酸閾值心率",
      en:"The heart rate at your lactate threshold: the highest intensity you can hold in a metabolic steady state, roughly 40–60 minutes of all-out effort. Measured as the average HR over the final 20 minutes of a solo 30-minute time trial. Unlike HRmax, it rises as you get fitter — which is exactly why it makes the better anchor.",
      zh:"乳酸閾值時的心率，即你能夠維持代謝穩態的最高強度，大約相當於全力 40–60 分鐘。量度方法是獨自進行 30 分鐘計時測試，取最後 20 分鐘的平均心率。與 HRmax 不同，LTHR 會隨體能進步而上升 — 這正是它更適合做錨值的原因。"},

    hrmax:{
      t:"HRmax — maximum heart rate", tz:"HRmax — 最大心率",
      en:"The highest heart rate your heart can reach in maximal exercise. Set largely by age and genetics; training barely moves it. It is not a fitness marker — a high HRmax is not 'better', and two equally fit athletes can differ by 30 bpm.",
      zh:"全力運動時心臟能夠達到的最高心率，主要由年齡與基因決定，訓練幾乎不會改變。它不是體能指標 — HRmax 高並不代表能力強，兩名體能相當的運動員可以相差 30 bpm。"},

    hrr:{
      t:"HRR — heart rate reserve", tz:"HRR — 心率儲備",
      en:"HRmax minus resting HR: the working range your heart actually has available. A fit athlete with a resting HR of 42 has a much larger reserve than a sedentary person with the same HRmax and a resting HR of 72 — which is why zones built on reserve individualise better.",
      zh:"HRmax 減去靜止心率，即心臟實際可用的工作範圍。靜止心率 42 的運動員，儲備遠大於同樣 HRmax 但靜止心率 72 的人 — 所以用儲備計算的 zone 更具個人化。"},

    karvonen:{
      t:"Karvonen method", tz:"Karvonen 法",
      en:"Setting zones as a percentage of heart rate reserve rather than of HRmax: HR = rest + p × (max − rest). Recommended by the ACSM for exercise prescription, because %HRR tracks %VO2 reserve more closely than %HRmax tracks %VO2max.",
      zh:"以心率儲備的百分比而非 HRmax 的百分比來設定 zone：心率 = 靜止 + p ×（最大 − 靜止）。ACSM 推薦用於運動處方，因為 %HRR 與 %VO2 reserve 的對應，比 %HRmax 與 %VO2max 的對應準確得多。"},

    vo2max:{
      t:"VO2max", tz:"VO2max — 最大攝氧量",
      en:"The maximum rate at which the body can take in, transport and use oxygen. The ceiling on aerobic power, usually expressed in ml of oxygen per kg of body weight per minute.",
      zh:"身體吸入、運送及使用氧氣的最高速率，即有氧能力的上限，通常以每公斤體重每分鐘多少毫升氧氣表示。"},

    vo2r:{
      t:"VO2 reserve", tz:"VO2 reserve — 攝氧儲備",
      en:"VO2max minus resting VO2 — the oxygen-uptake equivalent of heart rate reserve. Because the two reserves scale together, %HRR lines up with %VO2R far better than %HRmax lines up with %VO2max.",
      zh:"VO2max 減去靜止攝氧量，是心率儲備在攝氧量上的對應概念。由於兩種儲備同步變化，%HRR 與 %VO2R 的吻合程度，遠高於 %HRmax 與 %VO2max。"},

    lt:{
      t:"Lactate threshold", tz:"乳酸閾值",
      en:"The intensity above which blood lactate starts accumulating faster than the body can clear it. Below it, effort is sustainable for hours. Above it, a clock starts running and it does not stop until you slow down.",
      zh:"超過這個強度，血乳酸累積的速度就會快過身體清除的速度。閾值以下可以維持數小時；一旦越過，計時就開始倒數，直到你減速為止。"},

    sd:{
      t:"SD — standard deviation", tz:"SD — 標準差",
      en:"A measure of how spread out a population is around its average. About 68% of people fall within ±1 SD of a formula's prediction — which is another way of saying roughly 1 person in 3 falls further out than that.",
      zh:"量度群體圍繞平均值的分散程度。約 68% 的人落在公式預測值的 ±1 SD 之內 — 換句話說，大約每 3 人就有 1 人偏離得比這個範圍更遠。"},

    friel:{
      t:"Joe Friel", tz:"Joe Friel",
      en:"Coach and author of The Triathlete's Training Bible. His widely used zone tables are anchored on LTHR rather than HRmax, and differ between running and cycling because threshold HR differs between the two.",
      zh:"教練，《The Triathlete's Training Bible》作者。他廣泛採用的 zone 表以 LTHR 而非 HRmax 為錨，而且跑步與單車使用不同數值，因為兩者的閾值心率本身就有差異。"},

    tanaka:{
      t:"Tanaka equation (2001)", tz:"Tanaka 公式（2001）",
      en:"Tanaka, Monahan & Seals, Journal of the American College of Cardiology. Pooled 351 studies covering 18,712 subjects (r = −0.90 with age) and validated on 514 more: HRmax = 208 − 0.7 × age. The current general-purpose default.",
      zh:"Tanaka、Monahan 與 Seals，刊於《美國心臟病學會雜誌》。統合 351 項研究、18,712 名受試者（與年齡的相關系數 r = −0.90），再以另外 514 人作實驗室驗證：HRmax = 208 − 0.7 × 年齡。現時的通用預設公式。"},

    gulati:{
      t:"Gulati equation (2010)", tz:"Gulati 公式（2010）",
      en:"Gulati et al., Circulation, from 5,437 asymptomatic women in the St. James Women Take Heart Project: HRmax = 206 − 0.88 × age. Developed because the classic equations were derived almost entirely from male cohorts and overestimate women's HRmax.",
      zh:"Gulati 等人，刊於《Circulation》，基於 St. James Women Take Heart 研究中 5,437 名無症狀女性：HRmax = 206 − 0.88 × 年齡。制定原因是傳統公式幾乎全部取自男性樣本，會高估女性的 HRmax。"},

    nes:{
      t:"Nes equation (2013)", tz:"Nes 公式（2013）",
      en:"Nes et al., from the HUNT Fitness Study in Norway: HRmax = 211 − 0.64 × age, with a reported standard deviation of about 10.8 bpm — one of the few papers that states its spread plainly.",
      zh:"Nes 等人，來自挪威 HUNT Fitness Study：HRmax = 211 − 0.64 × 年齡，報告標準差約 10.8 bpm — 是少數清楚交代離散程度的研究之一。"},

    fox:{
      t:"220 − age (Fox)", tz:"220 − 年齡（Fox）",
      en:"The formula everyone knows. It was never derived from an original dataset, has no published validation cohort, and underestimates HRmax badly past age 40. Kept on this page only so you can see how far off it is.",
      zh:"人人都聽過的那條公式。它從未由原始數據推導而來，亦無發表過驗證樣本，40 歲之後嚴重低估 HRmax。本頁保留它，只是為了讓你看到它偏離多遠。"},

    tt:{
      t:"Time trial (TT)", tz:"計時測試（TT）",
      en:"A solo, self-paced maximal effort over a fixed time or distance — no drafting, no training partners, no pacing help. The standard field method for finding LTHR.",
      zh:"獨自進行、自行控速的全力測試，固定時間或距離 — 不可跟車、不可有人陪跑或協助控速。這是實地量度 LTHR 的標準方法。"},

    drift:{
      t:"Cardiac drift", tz:"心血管漂移（cardiac drift）",
      en:"The slow upward creep of heart rate through a long session at constant pace, driven by rising core temperature and falling plasma volume. Same effort, higher number — the zone did not move, your body did.",
      zh:"長時間課節中即使配速不變，心率仍會緩慢上升，成因是核心體溫上升與血漿容量下降。同樣強度、更高讀數 — 移動的不是 zone，而是你的身體狀態。"},

    talk:{
      t:"Talk test", tz:"談話測試",
      en:"Judging intensity by how much you can say in one breath: full sentences in Zone 2, short phrases in Zone 3, a few words in Zone 4, nothing in Zone 5. Free, needs no device, and individual to you — the best cross-check on any table.",
      zh:"以一口氣能說多少字來判斷強度：Zone 2 可說完整句子、Zone 3 只能短句、Zone 4 一次幾個字、Zone 5 無法說話。免費、不需器材，而且完全因人而異 — 是驗證任何 zone 表最好的方法。"},

    beta:{
      t:"Beta-blockers", tz:"β-受體阻斷劑（beta-blockers）",
      en:"A class of drug that blunts the heart's response to adrenaline, lowering both resting and maximal heart rate by amounts that vary with the drug and the dose. Every equation on this site is invalid while you are taking them — zones must come from a supervised test on your current medication.",
      zh:"一類抑制心臟對腎上腺素反應的藥物，會同時降低靜止心率與最大心率，幅度視乎藥物與劑量而定。服藥期間本網站所有公式均不適用 — zone 必須由現行用藥狀態下的監測測試得出。"},

    acsm:{
      t:"ACSM", tz:"ACSM — 美國運動醫學會",
      en:"The American College of Sports Medicine, whose exercise-prescription guidelines are the most widely used reference standard in the field.",
      zh:"美國運動醫學會，其運動處方指引是業界最廣泛引用的參考標準。"},

    z5abc:{
      t:"Zone 5a / 5b / 5c", tz:"Zone 5a / 5b / 5c",
      en:"Friel subdivides Zone 5 because one label hides three different sessions: 5a (100–102% LTHR) short threshold work, 5b (103–106%) VO2max intervals, 5c (above 106%) anaerobic capacity.",
      zh:"Friel 把 Zone 5 再細分，因為單一標籤其實掩蓋了三種不同課節：5a（LTHR 100–102%）短時間閾值訓練、5b（103–106%）VO2max 間歇、5c（106% 以上）無氧能力。"},

    steady:{
      t:"Metabolic steady state", tz:"代謝穩態",
      en:"A state in which oxygen uptake, blood lactate and heart rate settle at a plateau instead of climbing. It is the defining feature of a sustainable intensity, and its upper edge is the lactate threshold.",
      zh:"攝氧量、血乳酸與心率會停在一個平台而不再攀升的狀態。這是「可持續強度」的定義特徵，而它的上緣就是乳酸閾值。"},

    adapt:{
      t:"Capillary & mitochondrial density", tz:"微血管與粒線體密度",
      en:"The adaptations that make Zone 2 worth the hours: more capillaries per muscle fibre to deliver oxygen, and more mitochondria inside those fibres to use it. Together they raise how much work you can do aerobically, which is what raises threshold.",
      zh:"這些適應正是 Zone 2 值得花上長時間的理由：每條肌纖維有更多微血管輸送氧氣，纖維內部有更多粒線體去使用氧氣。兩者合起來提升你在有氧狀態下能做的功，而這才是拉高閾值的真正機制。"},

    regression:{
      t:"Population regression", tz:"群體回歸",
      en:"A line fitted through the data of a large group. It predicts the average person of a given age and says nothing whatsoever about any individual — which is the single most misunderstood fact about age-based HRmax formulas.",
      zh:"在大樣本數據中擬合出來的一條線。它預測的是某個年齡的「平均人」，對任何一個具體個人完全沒有說明力 — 這是年齡型 HRmax 公式最常被誤解的一點。"},

    lag:{
      t:"Heart rate lag", tz:"心率滯後",
      en:"Heart rate takes 1–3 minutes to catch up with a change in effort. For intervals shorter than about 3 minutes it is still climbing when the repetition ends, so the number you see never represents the work you did. Pace or power governs those sessions.",
      zh:"強度改變之後，心率需要 1–3 分鐘才追得上。短於約 3 分鐘的間歇，反覆結束時心率仍在上升，你看到的數字根本不代表你做過的功。這類課節應以配速或功率為準。"},

    bpm:{
      t:"bpm", tz:"bpm — 每分鐘心跳次數",
      en:"Beats per minute.",
      zh:"每分鐘心跳次數。"}
  };

  var pop = document.createElement("div");
  pop.id = "gpop"; pop.setAttribute("role","tooltip"); pop.hidden = true;
  pop.innerHTML = '<h4></h4><p class="body"></p>';
  document.body.appendChild(pop);

  var current = null, showT = null, hideT = null, overPop = false;
  function lang(){ return (window.Lang && window.Lang.current() === "zh") ? "zh" : "en"; }

  function place(btn){
    var r = btn.getBoundingClientRect(), p = pop.getBoundingClientRect();
    var gap = 8, pad = 12;
    var left = r.left + r.width/2 - p.width/2;
    left = Math.max(pad, Math.min(left, window.innerWidth - p.width - pad));
    var top = r.bottom + gap;
    if (top + p.height > window.innerHeight - pad){
      var above = r.top - p.height - gap;
      top = (above > pad) ? above : Math.max(pad, window.innerHeight - p.height - pad);
    }
    pop.style.left = Math.round(left) + "px";
    pop.style.top  = Math.round(top) + "px";
  }

  function show(btn){
    var e = G[btn.dataset.g];
    if (!e) return;
    clearTimeout(hideT);
    var zh = lang() === "zh";
    pop.querySelector("h4").textContent = zh ? (e.tz || e.t) : e.t;
    pop.querySelector(".body").textContent = zh ? e.zh : e.en;
    pop.hidden = false;
    pop.style.left = "-9999px"; pop.style.top = "0px";
    place(btn);
    btn.setAttribute("aria-expanded","true");
    current = btn;
  }

  function hide(){
    clearTimeout(showT);
    if (current) current.setAttribute("aria-expanded","false");
    pop.hidden = true; current = null;
  }

  function scheduleHide(){
    clearTimeout(hideT);
    hideT = setTimeout(function(){ if (!overPop) hide(); }, 140);
  }

  pop.addEventListener("mouseenter", function(){ overPop = true; clearTimeout(hideT); });
  pop.addEventListener("mouseleave", function(){ overPop = false; scheduleHide(); });

  function upgrade(root){
    (root || document).querySelectorAll("i[data-g]").forEach(function(marker){
      var key = marker.dataset.g;
      if (!G[key]){ marker.remove(); return; }
      var b = document.createElement("button");
      b.type = "button"; b.className = "q"; b.textContent = "?";
      b.dataset.g = key;
      b.setAttribute("aria-label", (lang() === "zh" ? "解釋：" : "Explain: ") + (lang()==="zh" ? (G[key].tz||G[key].t) : G[key].t));
      b.setAttribute("aria-expanded", "false");
      marker.replaceWith(b);

      b.addEventListener("mouseenter", function(){
        clearTimeout(showT);
        showT = setTimeout(function(){ show(b); }, 70);
      });
      b.addEventListener("mouseleave", function(){ clearTimeout(showT); scheduleHide(); });
      b.addEventListener("focus", function(){ show(b); });
      b.addEventListener("blur", function(){ scheduleHide(); });
      b.addEventListener("click", function(ev){
        ev.preventDefault();
        if (current === b) hide(); else show(b);
      });
    });
  }

  document.addEventListener("keydown", function(e){ if (e.key === "Escape") hide(); });
  window.addEventListener("scroll", function(){ if (current) hide(); }, true);
  window.addEventListener("resize", function(){ if (current) hide(); });
  document.addEventListener("click", function(e){
    if (current && !e.target.closest(".q") && !e.target.closest("#gpop")) hide();
  });
  document.addEventListener("langchange", function(){ if (current) show(current); });

  window.Glossary = { upgrade: upgrade, terms: G };
  upgrade(document);
})();
