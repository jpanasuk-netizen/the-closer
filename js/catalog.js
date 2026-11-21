(function () {
  var mount = document.querySelector("[data-closer-chrome]");
  if (!mount) return;

  var pages = [
    ["index.html", "Home"],
    ["resume.html", "Resume"],
    ["playbook.html", "Playbook"],
    ["loyalty.html", "Loyalty"],
    ["canonical-stack-packet.html", "Packet"],
    ["hunt.html", "Hunt"],
    ["skill-matrix.html", "Matrix"],
    ["CONNECT_YOUR_LIFE.html", "Agents"],
    ["week/2026-11-13_20/", "Nov 13–20"],
    ["week/2026-11-06_12/", "Nov 6–12"],
    ["week/2026-10-29_11-05/", "Oct 29–Nov 5"],
    ["week/2026-09-22_28/", "Sep 22–28"],
    ["week/2026-09-17_24/", "Sep 17–24"]
  ];

  var packets = [
    ["Closer", "https://jpanasuk-netizen.github.io/the-closer/", "https://huggingface.co/spaces/jpanasuk/the-closer"]
  ];

  var file = (location.pathname.split("/").pop() || "").split("?")[0];
  if (!file || file === "the-closer") file = "index.html";

  var cat = pages.map(function (p) {
    var on = file.toLowerCase() === p[0].toLowerCase() ? ' class="on"' : "";
    return '<a href="' + p[0] + '"' + on + ">" + p[1] + "</a>";
  }).join("");

  var pkt = packets.map(function (p) {
    return '<span class="pair">' + p[0] + ' <a href="' + p[1] + '">GH</a> · <a href="' + p[2] + '">HF</a></span>';
  }).join("");

  mount.classList.add("closer-chrome");
  mount.innerHTML =
    '<nav class="catalog" aria-label="Closer catalog">' + cat + "</nav>" +
    '<nav class="packets" aria-label="Live packets">' + pkt + "</nav>";
})();
