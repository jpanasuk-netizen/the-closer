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
    ["CONNECT_YOUR_LIFE.html", "Agents"]
  ];

  var packets = [
    ["Closer", "https://jpanasuk-netizen.github.io/the-closer/", "https://huggingface.co/spaces/jpanasuk/the-closer"],
    ["American Tech", "https://jpanasuk-netizen.github.io/for-american-tech/", "https://huggingface.co/spaces/jpanasuk/for-american-tech"],
    ["Paylocity", "https://jpanasuk-netizen.github.io/for-paylocity/", "https://huggingface.co/spaces/jpanasuk/for-paylocity"],
    ["Carex", "https://jpanasuk-netizen.github.io/for-carex-fde/", "https://huggingface.co/spaces/jpanasuk/for-carex-fde"],
    ["Cresta", "https://jpanasuk-netizen.github.io/for-cresta/", "https://huggingface.co/spaces/jpanasuk/for-cresta"],
    ["Edisyl", "https://jpanasuk-netizen.github.io/for-edisyl/", "https://huggingface.co/spaces/jpanasuk/for-edisyl"],
    ["Toloka", "https://jpanasuk-netizen.github.io/for-toloka/", "https://huggingface.co/spaces/jpanasuk/for-toloka"],
    ["Warp Speed", "https://jpanasuk-netizen.github.io/for-warp-speed/", "https://huggingface.co/spaces/jpanasuk/for-warp-speed"]
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
