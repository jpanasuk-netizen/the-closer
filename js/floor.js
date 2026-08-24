(() => {
  const RUNS = [
    { id: 1, t: "15:59:25", model: "qwen3:8b", decode: 1.39, prefill: 33.11, wall: 106.65, load: 200.78, note: "CPU-bound baseline before GPU routing" },
    { id: 2, t: "16:20:48", model: "qwen-gpu:latest", decode: 29.68, prefill: 92.47, wall: 11.23, load: 331.08, note: "First GPU-routed run" },
    { id: 5, t: "16:27:12", model: "qwen-gpu:latest", decode: 37.47, prefill: 110.16, wall: 5.03, load: 243.59, note: "Stabilized after routing/tuning" }
  ];

  const TICKETS = {
    dawn: {
      num: "8h → 1h",
      who: "Dawn Foods",
      lines: [
        { c: "dim", t: "INCIDENT  ·  warehouse load overrunning the night window" },
        { c: "hi",  t: "PARACHUTE · PowerExchange CDC on AS/400 remote journals" },
        { c: "",    t: "read the evidence before touching the config" },
        { c: "",    t: "Type 2 DW standards · security · upgrade path locked" },
        { c: "warn",t: "bottleneck was journal strategy, not 'the ETL is slow'" },
        { c: "ok",  t: "RESULT    · load 8 hours → 1 hour" },
        { c: "gold",t: "featured on informatica.com · customer kept the runbook" }
      ]
    },
    bny: {
      num: "$2.3M+",
      who: "BNY Mellon",
      lines: [
        { c: "dim", t: "CLOSE     · Grid/HA architecture with senior VPs + support" },
        { c: "hi",  t: "ROOM      · CEO Sohaib Abbasi in the conversation" },
        { c: "",    t: "strategic sales + services + support, not a slide deck" },
        { c: "ok",  t: "RESULT    · $2.3M+ outcome" },
        { c: "gold",t: "same closer playbook now pointed at local AI stacks" }
      ]
    },
    mercedes: {
      num: "+200%",
      who: "Mercedes-Benz",
      lines: [
        { c: "dim", t: "RESCUE    · longest-running workflows on fire" },
        { c: "hi",  t: "TUNE      · Grid/HA + workflow performance, not more hardware" },
        { c: "",    t: "trained TCS on the operating path so it stays fixed" },
        { c: "ok",  t: "RESULT    · +200% on the longest workflows" }
      ]
    },
    mf: {
      num: "20+ nodes",
      who: "MF Global",
      lines: [
        { c: "dim", t: "WORLD-FIRST Informatica Grid/HA + DR on RHEL GFS" },
        { c: "hi",  t: "FOOTPRINT · India · UK · New York · Chicago" },
        { c: "",    t: "owned global DR, not a hand-off after go-live" },
        { c: "ok",  t: "INFRA STAFF · 'one of the best Informatica has to offer'" }
      ]
    },
    micron: {
      num: "7,000h",
      who: "Micron",
      lines: [
        { c: "dim", t: "PROGRAM   · Teradata + Hadoop EDW" },
        { c: "hi",  t: "SCOPE     · 2,080 hours → 7,000 hours" },
        { c: "",    t: "PowerExchange · Grid/HA · Fast Clone · Big Data" },
        { c: "ok",  t: "RESULT    · extensions, zero downtime, Consultant of the Year runner-up" }
      ]
    },
    playbook: {
      num: "IPS",
      who: "The Playbook",
      lines: [
        { c: "dim", t: "STANDARD  · Environment Summary · Upgrade Roadmap · Phase review · v10 deck" },
        { c: "hi",  t: "LOOP      · baseline → goal → bottleneck → eliminate → repeat" },
        { c: "",    t: "thread statistics before folklore · do not partition a mystery" },
        { c: "",    t: "knowledge transfer is a deliverable · skill-up is named in the review" },
        { c: "ok",  t: "COACH     · whole stack + GCS in one room · team praised in writing" },
        { c: "gold",t: "public site carries the operating path · hostnames stay in the customer copy" }
      ]
    },
    docs: {
      num: "IPS",
      who: "Documentation standards",
      lines: [
        { c: "dim", t: "COVER     · author + owner + date · not a logo slide" },
        { c: "hi",  t: "SUMMARY  · what is running · what was changed · what is still on fire" },
        { c: "",    t: "ROADMAP   · CPU/RAM/disk/DB graphs · filesystem matrix · HA internals" },
        { c: "",    t: "PHASE     · next increment named · topology risk · outstanding demos" },
        { c: "ok",  t: "v10 DECK  · in-place / parallel / clone · six-class test · DVO" }
      ]
    },
    perf: {
      num: "Tune",
      who: "Performance methodology",
      lines: [
        { c: "dim", t: "RULE 1    · establish baseline or you do not know faster from slower" },
        { c: "hi",  t: "RULE 2    · set a goal or you are done when the clock runs out" },
        { c: "warn",t: "DO NOT PARTITION until a single partition is understood" },
        { c: "",    t: "thread stats first · isolation tests when threads lie" },
        { c: "ok",  t: "MBFS      · cache RAM · 20–30% off job runtime" }
      ]
    },
    coach: {
      num: "Coach",
      who: "Customer coaching",
      lines: [
        { c: "dim", t: "LOYALTY   · customer satisfaction is worthless" },
        { c: "hi",  t: "TRANSFER · walk the loads · name the skill-up · leave the cheat sheet" },
        { c: "",    t: "one room: OS + DB + Informatica + GCS" },
        { c: "ok",  t: "WRITE IT  · praise the team in the deliverable" },
        { c: "gold",t: "the closer leaves a QA twin of production" }
      ]
    },
    farmers: {
      num: "Phase 2",
      who: "Farmers Insurance",
      lines: [
        { c: "dim", t: "PHASE 2  · Guidewire advanced XML · real-time web-service consumers" },
        { c: "hi",  t: "RISK      · 30+ repos / 30+ integration services · domain TCP overhead" },
        { c: "warn",t: "NFS on NAS is the least-recommended HA/performance filesystem" },
        { c: "",    t: "skill-up named: Developer tool + Advanced XML" },
        { c: "ok",  t: "TEAM      · knowledgeable, open, could explain the current architecture" }
      ]
    },
    mbfs: {
      num: "20–30%",
      who: "Mercedes-Benz Financial",
      lines: [
        { c: "dim", t: "LOAD      · ALFA→ODS at 100% CPU · DB2 loader path ~50%" },
        { c: "hi",  t: "FIX       · sorter/lookup/aggregator/joiner cache in RAM" },
        { c: "",    t: "PWX CDC POC vs bulk load · GFS2 flock gap · VCFS recommended" },
        { c: "ok",  t: "RESULT    · 20–30% decrease in job runtime" },
        { c: "gold",t: "cheat sheet and load walkthroughs left with the team" }
      ]
    },
    nwm: {
      num: "P1",
      who: "Northwestern Mutual",
      lines: [
        { c: "dim", t: "CONFIG    · QA/prod domains to best practice" },
        { c: "hi",  t: "APPLIED   · ulimit 64k · concurrent jobs 500 · heap · stale NFS logs" },
        { c: "warn",t: "P1        · workflow start delay connecting to DB2" },
        { c: "",    t: "GCS escalation · DB2 semaphore on the Informatica client" },
        { c: "ok",  t: "PATH      · Grid/HA TCO · QA twin of production" }
      ]
    },
    wr: {
      num: "v9→v10",
      who: "Waddell & Reed",
      lines: [
        { c: "dim", t: "MEASURED  · 2-node 9.1.0 grid · month of CPU/RAM/disk" },
        { c: "hi",  t: "FINDING   · 80–90% CPU · RAM idle · disk wait 30–90 ms" },
        { c: "warn",t: "UNC share is not an HA filesystem · Session on Grid disabled" },
        { c: "",    t: "SQL disk wait >200 ms with RAM sitting unused" },
        { c: "ok",  t: "ROADMAP   · Linux CFS · adaptive dispatch · in-place/parallel/clone" }
      ]
    }
  };

  const AGENT = [
    { step: 0, c: "hi",  t: "PIPELINE  · systems → architect → validator  (local Ollama)" },
    { step: 0, c: "",    t: "SYSTEMS   · bounded task: generate a playable HTML dungeon" },
    { step: 0, c: "",    t: "          · constraints: collision checks, structured JSON, retry budget" },
    { step: 1, c: "hi",  t: "ARCHITECT · layout + entity schema, no free-text hope" },
    { step: 1, c: "",    t: "          · repair loop on schema miss" },
    { step: 2, c: "hi",  t: "VALIDATOR · regression + collision + playable path" },
    { step: 2, c: "ok",  t: "SHIP      · github.com/jpanasuk-netizen/multi-agent-dungeon-crawler" },
    { step: 2, c: "gold",t: "MCP       · Dockroot-MCP: agents see Docker/network, not host-root" }
  ];

  const HELP = [
    { c: "hi", t: "COMMANDS" },
    { c: "",  t: "bench     replay GPU routing bench (sample_hardware_runs.json)" },
    { c: "",  t: "dawn      Dawn Foods 8h → 1h" },
    { c: "",  t: "bny       BNY Mellon $2.3M+ Grid/HA close" },
    { c: "",  t: "mercedes  Mercedes-Benz +200% rescue" },
    { c: "",  t: "mf        MF Global 20+ node Grid/HA + DR" },
    { c: "",  t: "micron    Micron 2,080h → 7,000h" },
    { c: "",  t: "fireworks Secret Key Class B / Fireworks Forever 1996–2004" },
    { c: "",  t: "playbook  documentation standards · performance · coaching" },
    { c: "",  t: "docs      environment summary / roadmap / phase / v10 deck" },
    { c: "",  t: "perf      bottleneck loop and cheat sheet" },
    { c: "",  t: "coach     customer coaching doctrine" },
    { c: "",  t: "farmers   Farmers Insurance Phase 2" },
    { c: "",  t: "mbfs      Mercedes-Benz Financial 20–30%" },
    { c: "",  t: "nwm       Northwestern Mutual P1" },
    { c: "",  t: "wr        Waddell & Reed v9→v10 roadmap" },
    { c: "",  t: "agents    multi-agent pipeline" },
    { c: "",  t: "clear     clear the log" },
    { c: "dim", t: "Esc closes the floor. Type any project name. This page does not attach to a GPU." }
  ];

  const floor = document.getElementById("floor");
  const logEl = document.getElementById("log");
  const clock = document.getElementById("floor-clock");
  const decodeEl = document.getElementById("m-decode");
  const prefillEl = document.getElementById("m-prefill");
  const wallEl = document.getElementById("m-wall");
  const xEl = document.getElementById("m-x");
  const canvas = document.getElementById("spark");
  const cmd = document.getElementById("cmd-input");
  const pipeline = document.getElementById("pipeline");
  const pipes = [...document.querySelectorAll(".pipe")];

  let typing = null;
  let sparkPoints = [1.39];

  function openFloor() {
    document.body.classList.add("floor-open");
    floor.setAttribute("aria-hidden", "false");
    if (location.hash !== "#floor") history.replaceState(null, "", "#floor");
    if (!logEl.dataset.booted) {
      logEl.dataset.booted = "1";
      play(introLines(), { spark: false });
    }
    cmd && cmd.focus();
  }

  function closeFloor() {
    document.body.classList.remove("floor-open");
    floor.setAttribute("aria-hidden", "true");
    if (location.hash === "#floor") history.replaceState(null, "", location.pathname + location.search);
  }

  function syncHash() {
    if (location.hash === "#floor") openFloor();
    else if (document.body.classList.contains("floor-open")) closeFloor();
  }

  document.querySelectorAll("[data-open-floor]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openFloor();
    });
  });
  document.querySelectorAll("[data-close-floor]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      closeFloor();
    });
  });

  window.addEventListener("hashchange", syncHash);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("floor-open")) closeFloor();
  });

  function tickClock() {
    const d = new Date();
    clock.textContent = d.toISOString().replace("T", " ").slice(0, 19) + "Z";
  }
  tickClock();
  setInterval(tickClock, 1000);

  function introLines() {
    return [
      { c: "dim", t: "THE FLOOR  ·  operator replay  ·  not a live GPU attach" },
      { c: "hi",  t: "SOURCE     ·  local_grid_suite/benchmarks/sample_hardware_runs.json" },
      { c: "",    t: "hardware   ·  NVIDIA RTX 4070 12GB  ·  private lab" },
      { c: "",    t: "baseline   ·  qwen3:8b            decode 1.39 tok/s" },
      { c: "ok",  t: "routed     ·  qwen-gpu:latest     decode 37.47 tok/s" },
      { c: "gold",t: "UPLIFT     ·  27× after GPU routing/tuning" },
      { c: "dim", t: "type  bench  |  dawn  |  playbook  |  agents  |  help" }
    ];
  }

  function benchLines() {
    const lines = [
      { c: "hi", t: "grid_cli discover  host=localhost:11434" },
      { c: "",  t: "models     qwen3:8b  qwen-gpu:latest" }
    ];
    RUNS.forEach((r, i) => {
      lines.push({ c: "dim", t: `RUN ${String(r.id).padStart(2, "0")}     ${r.t}  model=${r.model}  target=150` });
      lines.push({ c: i === 0 ? "warn" : "ok", t: `decode=${r.decode.toFixed(2)} tok/s  prefill=${r.prefill}  wall=${r.wall}s  load=${r.load}ms` });
      lines.push({ c: "", t: r.note });
      if (i === 0) lines.push({ c: "hi", t: "routing    qwen3:8b → qwen-gpu:latest  (CUDA / GPU passthrough)" });
    });
    lines.push({ c: "ok",  t: "sqlite insert  logs/grid.db  run_id=5" });
    lines.push({ c: "gold",t: "RESULT     27× decode uplift  ·  methodology in local_grid_suite" });
    return lines;
  }

  function cancelType() {
    if (typing) {
      clearTimeout(typing);
      typing = null;
    }
  }

  function play(lines, opts = {}) {
    cancelType();
    const { clear = true, spark = true } = opts;
    if (clear) logEl.innerHTML = "";
    let i = 0;
    const step = () => {
      if (i >= lines.length) {
        typing = null;
        document.querySelectorAll(".actions button").forEach((b) => { b.disabled = false; });
        return;
      }
      const line = lines[i++];
      const div = document.createElement("div");
      if (line.c) div.className = line.c;
      div.textContent = line.t;
      logEl.appendChild(div);
      logEl.scrollTop = logEl.scrollHeight;
      if (spark && line.t.startsWith("decode=")) {
        const n = parseFloat(line.t.split(" ")[0].split("=")[1]);
        if (!Number.isNaN(n)) {
          sparkPoints.push(n);
          setMetrics(n, line);
        }
      }
      if (line.step != null) {
        pipes.forEach((p, idx) => p.classList.toggle("on", idx <= line.step));
      }
      typing = setTimeout(step, 280);
    };
    document.querySelectorAll(".actions button").forEach((b) => { b.disabled = true; });
    step();
  }

  function setMetricsFromRun(run, pulse) {
    decodeEl.textContent = run.decode.toFixed(2);
    prefillEl.textContent = run.prefill.toFixed(2);
    wallEl.textContent = run.wall.toFixed(2) + "s";
    xEl.textContent = (run.decode / RUNS[0].decode).toFixed(1) + "×";
    const box = decodeEl.closest(".ops-metric");
    if (pulse && box) {
      box.classList.remove("pulse");
      void box.offsetWidth;
      box.classList.add("pulse");
    }
    drawSpark();
  }

  function setMetrics(decode) {
    const run = [...RUNS].reverse().find((r) => r.decode === decode) || { decode, prefill: 0, wall: 0 };
    setMetricsFromRun(run, true);
  }

  function drawSpark() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = canvas.clientWidth || 640;
    const h = canvas.clientHeight || 92;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const pts = sparkPoints.length ? sparkPoints : [1.39];
    const max = Math.max(40, ...pts);
    ctx.strokeStyle = "rgba(34,211,238,0.12)";
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 18) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.beginPath();
    pts.forEach((v, i) => {
      const x = pts.length === 1 ? 12 : (i / (pts.length - 1)) * (w - 24) + 12;
      const y = h - 14 - (v / max) * (h - 28);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 2;
    ctx.stroke();
    pts.forEach((v, i) => {
      const x = pts.length === 1 ? 12 : (i / (pts.length - 1)) * (w - 24) + 12;
      const y = h - 14 - (v / max) * (h - 28);
      ctx.fillStyle = v > 10 ? "#34d399" : "#fb923c";
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function setActive(kind) {
    document.querySelectorAll(".actions button").forEach((b) => {
      b.classList.toggle("active", b.dataset.run === kind);
    });
    document.querySelectorAll(".ticket").forEach((b) => {
      b.classList.toggle("active", b.dataset.ticket === kind);
    });
    pipeline.classList.toggle("show", kind === "agents");
    if (kind !== "agents") pipes.forEach((p) => p.classList.remove("on"));
  }

  function run(kind) {
    if (kind === "bench") {
      sparkPoints = [];
      setMetricsFromRun(RUNS[0], false);
      setActive("bench");
      play(benchLines(), { spark: true });
      return;
    }
    if (kind === "agents") {
      setActive("agents");
      play(AGENT, { spark: false });
      return;
    }
    if (kind === "help") {
      setActive("");
      play(HELP, { spark: false });
      return;
    }
    if (kind === "clear") {
      cancelType();
      logEl.innerHTML = "";
      document.querySelectorAll(".actions button").forEach((b) => { b.disabled = false; });
      return;
    }
    const ticket = TICKETS[kind];
    if (ticket) {
      setActive(kind);
      play([{ c: "gold", t: `TICKET    ·  ${ticket.who}  ·  ${ticket.num}` }, ...ticket.lines], { spark: false });
      window.CLOSER_OPEN_PROJECT?.(kind, { exclusive: false, scroll: false, replay: false });
      return;
    }
    const catalog = window.CLOSER_PROJECTS;
    const list = catalog ? [...(catalog.lab || []), ...(catalog.playbook || []), ...(catalog.legend || [])] : [];
    const p = list.find((x) => x.id === kind) || list.find((x) => (x.who || "").toLowerCase().includes(kind));
    if (p) {
      setActive(p.id);
      const lines = [
        { c: "gold", t: `TICKET    ·  ${p.who}  ·  ${p.num}` },
        { c: "dim", t: p.blurb },
        ...p.bullets.map((b) => ({ c: "", t: "· " + b }))
      ];
      play(lines, { spark: false });
      window.CLOSER_OPEN_PROJECT?.(p.id, { exclusive: false, scroll: false, replay: false });
    }
  }

  document.querySelectorAll("[data-run]").forEach((btn) => {
    btn.addEventListener("click", () => run(btn.dataset.run));
  });
  document.getElementById("floor-tickets")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-ticket]");
    if (btn) run(btn.dataset.ticket);
  });

  window.addEventListener("closer:floor-project", (e) => {
    if (e.detail && e.detail.id) run(e.detail.id);
  });

  document.getElementById("cmd-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = (cmd.value || "").trim().toLowerCase();
    cmd.value = "";
    if (!v) return;
    const aliases = {
      gpu: "bench", routing: "bench", "8h": "dawn", foods: "dawn", mellon: "bny",
      benz: "mercedes", grid: "mf", agent: "agents", pipeline: "agents", "?": "help",
      fireworks: "fireworks", firework: "fireworks", secret: "fireworks",
      secret_key: "fireworks", "secret key": "fireworks", classb: "fireworks",
      shooter: "fireworks",
      playbook: "playbook", docs: "docs", doc: "docs", standard: "docs",
      standards: "docs", perf: "perf", tune: "perf", performance: "perf",
      coach: "coach", coaching: "coach",
      farmers: "farmers", farmer: "farmers", guidewire: "farmers",
      mbfs: "mbfs", "mercedes-benz financial": "mbfs", financial: "mbfs",
      nwm: "nwm", northwestern: "nwm", mutual: "nwm",
      wr: "wr", waddell: "wr", "waddell & reed": "wr", roadmap: "wr"
    };
    run(aliases[v] || v);
  });

  setMetricsFromRun(RUNS[2], false);
  sparkPoints = RUNS.map((r) => r.decode);
  drawSpark();
  window.addEventListener("resize", drawSpark);
  syncHash();
})();
