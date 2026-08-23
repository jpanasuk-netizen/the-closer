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
    { c: "",  t: "agents    multi-agent pipeline" },
    { c: "",  t: "clear     clear the log" },
    { c: "dim", t: "Esc closes the floor. This page does not attach to a GPU." }
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
      { c: "dim", t: "type  bench  |  dawn  |  agents  |  help" }
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
    }
  }

  document.querySelectorAll("[data-run]").forEach((btn) => {
    btn.addEventListener("click", () => run(btn.dataset.run));
  });
  document.querySelectorAll("[data-ticket]").forEach((btn) => {
    btn.addEventListener("click", () => run(btn.dataset.ticket));
  });

  document.getElementById("cmd-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = (cmd.value || "").trim().toLowerCase();
    cmd.value = "";
    if (!v) return;
    const aliases = { gpu: "bench", routing: "bench", "8h": "dawn", foods: "dawn", mellon: "bny", benz: "mercedes", grid: "mf", agent: "agents", pipeline: "agents", "?": "help" };
    run(aliases[v] || v);
  });

  setMetricsFromRun(RUNS[2], false);
  sparkPoints = RUNS.map((r) => r.decode);
  drawSpark();
  window.addEventListener("resize", drawSpark);
  syncHash();
})();
