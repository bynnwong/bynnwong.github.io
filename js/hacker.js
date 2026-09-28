(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.createElement("canvas");
  canvas.id = "matrix-rain";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext("2d");
  var flakes = [];
  var shapes = ["❄", "❅", "❆", "✻"];

  function makeFlake(anywhere) {
    return {
      x: Math.random() * canvas.width,
      y: anywhere ? Math.random() * canvas.height : -20,
      r: 10 + Math.random() * 10,
      s: 0.45 + Math.random() * 1.1,
      drift: (Math.random() - 0.5) * 0.7,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      a: 0.35 + Math.random() * 0.55
    };
  }

  function size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var count = Math.max(28, Math.round(canvas.width / 28));
    flakes = [];
    for (var i = 0; i < count; i++) flakes.push(makeFlake(true));
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.y += f.s;
      f.x += f.drift + Math.sin(f.y / 40) * 0.35;
      ctx.font = f.r + "px serif";
      ctx.fillStyle = "rgba(230, 248, 255, " + f.a + ")";
      ctx.fillText(f.shape, f.x, f.y);
      if (f.y > canvas.height + 24) flakes[i] = makeFlake(false);
    }
    requestAnimationFrame(frame);
  }

  size();
  frame();
  window.addEventListener("resize", size);

  var path = location.pathname;
  if (path !== "/" && path !== "/index.html") return;

  var boot = document.createElement("div");
  boot.id = "boot-screen";
  boot.innerHTML =
    "<pre>" +
    "BYNNWONG SYS  //  BUILD 2018\n" +
    "AUTH ............... OK\n" +
    "MOUNT /posts ....... OK\n" +
    "OPEN CHANNEL ....... OK\n" +
    "<span>&gt; welcome back, operator_</span>" +
    "</pre>";
  document.body.appendChild(boot);
  window.setTimeout(function () {
    boot.className = "boot-out";
  }, 1450);
  window.setTimeout(function () {
    if (boot.parentNode) boot.parentNode.removeChild(boot);
  }, 2100);
})();
