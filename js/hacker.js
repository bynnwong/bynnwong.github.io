(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.createElement("canvas");
  canvas.id = "matrix-rain";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext("2d");
  var glyphs = "01ABCDEF#$%&アイウエオカキクケコｻｼｽｾｿﾀﾁﾂﾃﾄ01<>/\\{}[]";
  var fontSize = 14;
  var columns = 0;
  var drops = [];

  function size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.ceil(canvas.width / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -40;
    }
  }

  function frame() {
    ctx.fillStyle = "rgba(5, 8, 5, 0.16)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px Share Tech Mono, monospace";
    for (var i = 0; i < drops.length; i++) {
      var ch = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
      var y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > 0.92 ? "#d6ff4a" : "rgba(57, 255, 20, 0.72)";
      ctx.fillText(ch, i * fontSize, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.85;
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
