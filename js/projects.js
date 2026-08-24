(() => {
  const FEATURED = ["playbook", "dawn", "bny", "mbfs", "farmers", "fireworks"];
  let DATA = null;

  function loadProjects() {
    if (window.CLOSER_PROJECTS) return Promise.resolve(window.CLOSER_PROJECTS);
    return fetch("data/projects.json")
      .then((r) => {
        if (!r.ok) throw new Error("projects.json " + r.status);
        return r.json();
      })
      .then((data) => {
        window.CLOSER_PROJECTS = data;
        return data;
      });
  }

  function allProjects(data) {
    return [...(data.lab || []), ...(data.playbook || []), ...(data.legend || [])];
  }

  function findProject(id) {
    if (!DATA) return null;
    return allProjects(DATA).find((p) => p.id === id) || null;
  }

  function toneClass(tone) {
    if (!tone) return "";
    return "c-" + tone;
  }

  function bullets(list) {
    return `<ul class="proj-bullets">${(list || []).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function dealCard(p) {
    return `<details class="deal" id="proj-${esc(p.id)}" data-project="${esc(p.id)}">
      <summary>
        <div class="num ${toneClass(p.tone)}">${esc(p.num)}</div>
        <div class="who">${esc(p.who)}</div>
        <p>${esc(p.blurb)}</p>
        <span class="chev" aria-hidden="true"></span>
      </summary>
      ${bullets(p.bullets)}
    </details>`;
  }

  function labRow(p) {
    return `<details class="lab-row" id="proj-${esc(p.id)}" data-project="${esc(p.id)}">
      <summary>
        <b class="${toneClass(p.tone)}">${esc(p.num)}</b>
        <div>
          <h3>${esc(p.who)}</h3>
          <p>${esc(p.blurb)}</p>
        </div>
        <span class="chev" aria-hidden="true"></span>
      </summary>
      ${bullets(p.bullets)}
    </details>`;
  }

  function fillSelect(sel) {
    if (!sel || !DATA) return;
    const current = sel.value;
    sel.innerHTML = `<option value="">Select a project — bullets drop down</option>`;
    [
      ["Independent lab", DATA.lab],
      ["The playbook", DATA.playbook],
      ["The receipts", DATA.legend]
    ].forEach(([label, items]) => {
      const og = document.createElement("optgroup");
      og.label = label;
      (items || []).forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p.id;
        opt.textContent = `${p.who}  ·  ${p.num}`;
        og.appendChild(opt);
      });
      sel.appendChild(og);
    });
    if (current) sel.value = current;
  }

  function renderFloorTickets(selectedId) {
    const mount = document.getElementById("floor-tickets");
    if (!mount || !DATA) return;
    const selected = findProject(selectedId);
    const featuredHtml = FEATURED.map((id) => {
      const p = findProject(id);
      if (!p) return "";
      const active = p.id === selectedId ? " active" : "";
      return `<button class="ticket${active}" type="button" data-ticket="${esc(p.id)}" data-open-project="${esc(p.id)}">
        <div class="num ${toneClass(p.tone)}">${esc(p.num)}</div>
        <div class="who">${esc(p.who)}</div>
        <p>${esc(p.blurb)}</p>
      </button>`;
    }).join("");
    const detail = selected
      ? `<div class="ticket-detail" id="floor-bullet-drop">
          <div class="ticket-detail-h"><span class="num ${toneClass(selected.tone)}">${esc(selected.num)}</span> ${esc(selected.who)}</div>
          <p class="ticket-blurb">${esc(selected.blurb)}</p>
          ${bullets(selected.bullets)}
        </div>`
      : `<div class="ticket-detail muted">Select a project. Full-detail bullets drop here.</div>`;
    mount.innerHTML = detail + featuredHtml;
  }

  function syncSelects(id) {
    document.querySelectorAll("#project-pick, #legend-pick, #playbook-pick, #floor-project-pick").forEach((sel) => {
      if (sel && sel.value !== id) sel.value = id || "";
    });
    document.querySelectorAll("[data-open-project]").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("data-open-project") === id);
    });
  }

  function openProject(id, opts = {}) {
    const { exclusive = true, scroll = true, replay = false } = opts;
    const target = document.getElementById("proj-" + id);
    if (target) {
      if (exclusive) {
        document.querySelectorAll("details.deal, details.lab-row").forEach((d) => {
          if (d !== target) d.open = false;
        });
      }
      target.open = true;
      if (scroll && !document.body.classList.contains("floor-open")) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    renderFloorTickets(id);
    syncSelects(id);
    window.dispatchEvent(new CustomEvent("closer:project", { detail: { id } }));
    if (replay) {
      window.dispatchEvent(new CustomEvent("closer:floor-project", { detail: { id } }));
    }
  }

  function hashProject() {
    const h = location.hash || "";
    if (h.startsWith("#proj-")) openProject(h.slice(6), { scroll: true });
  }

  function wire(data) {
    DATA = data;
    const labMount = document.getElementById("lab-rows");
    const playbookMount = document.getElementById("playbook-rows");
    const dealMount = document.getElementById("deals");
    if (labMount) labMount.innerHTML = (data.lab || []).map(labRow).join("");
    if (playbookMount) playbookMount.innerHTML = (data.playbook || []).map(labRow).join("");
    if (dealMount) dealMount.innerHTML = (data.legend || []).map(dealCard).join("");

    fillSelect(document.getElementById("project-pick"));
    fillSelect(document.getElementById("legend-pick"));
    fillSelect(document.getElementById("playbook-pick"));
    fillSelect(document.getElementById("floor-project-pick"));
    renderFloorTickets("");

    const onPick = (replay, exclusive, scroll) => (e) => {
      if (e.target.value) openProject(e.target.value, { exclusive, scroll, replay });
    };
    document.getElementById("project-pick")?.addEventListener("change", onPick(false, true, true));
    document.getElementById("legend-pick")?.addEventListener("change", onPick(false, true, true));
    document.getElementById("playbook-pick")?.addEventListener("change", onPick(false, true, true));
    document.getElementById("floor-project-pick")?.addEventListener("change", onPick(true, false, false));

    document.addEventListener("toggle", (e) => {
      const d = e.target;
      if (!(d instanceof HTMLDetailsElement)) return;
      if (!d.open) return;
      const id = d.dataset.project;
      if (!id) return;
      syncSelects(id);
      renderFloorTickets(id);
    }, true);

    window.addEventListener("hashchange", hashProject);
    hashProject();
  }

  window.CLOSER_OPEN_PROJECT = openProject;
  window.CLOSER_FIND_PROJECT = findProject;

  loadProjects()
    .then(wire)
    .catch((err) => {
      console.error(err);
      const dealMount = document.getElementById("deals");
      if (dealMount && !dealMount.children.length) {
        dealMount.innerHTML = `<p class="proj-fallback">Could not load project bullets. Open this page over http (GitHub Pages) or next to data/projects.json.</p>`;
      }
    });
})();
