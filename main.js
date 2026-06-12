/* Find a Massage Therapist UK — page behaviour
   1. Tension line: hero signature animation (knot -> release)
   2. Header shadow on scroll
   3. Mobile nav toggle
   4. Scroll-reveal sections
*/

(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add(prefersReduced ? "reduced-motion" : "motion-ready");

  function setStagger(container, selector, step, maxDelay) {
    if (!container) return;
    container.classList.add("reveal-group");
    Array.prototype.forEach.call(container.querySelectorAll(selector), function (item, index) {
      item.style.setProperty("--item-delay", Math.min(index * step, maxDelay) + "ms");
    });
  }

  setStagger(document.querySelector(".treatment-grid"), ".treatment-card", 65, 420);
  setStagger(document.querySelector(".steps-grid"), ".step", 90, 270);
  setStagger(document.querySelector(".location-grid"), ".location-tile", 85, 340);
  setStagger(document.querySelector(".town-links"), "a", 45, 360);
  setStagger(document.querySelector(".faq"), "details", 70, 280);

  Array.prototype.forEach.call(document.querySelectorAll(".therapist-card.reveal"), function (card, index) {
    card.style.setProperty("--reveal-delay", Math.min(index * 95, 260) + "ms");
  });

  /* ============================================================
     1. Tension line
     A single rope drawn across the hero. It loads taut with a
     knot in it, then loosens into a calm wave. Geometry is a
     Catmull-Rom spline through N points; the two states share
     the same point count so they can be interpolated.
     ============================================================ */

  var path = document.getElementById("tensionLine");
  var hero = document.querySelector(".hero");

  if (path && hero) {
    var N = 26;
    var X0 = -60;
    var X1 = 1660;
    var xs = [];
    for (var i = 0; i < N; i++) xs.push(X0 + ((X1 - X0) * i) / (N - 1));

    function smoothstep(u) {
      u = Math.max(0, Math.min(1, u));
      return u * u * (3 - 2 * u);
    }

    // Released: calm and low beneath the search card on the left,
    // rising into an ample, loose wave in the open right half
    function releasePoints(phase) {
      var pts = [];
      for (var i = 0; i < N; i++) {
        var x = xs[i];
        var rise = smoothstep((x - 820) / 680);
        var base = 525 - 285 * rise;
        var amp = 18 + 42 * rise;
        pts.push([x, base + amp * Math.sin(i * 0.62 + phase)]);
      }
      return pts;
    }

    // Tense: a taut diagonal with a knot tangled in it.
    // The SVG stretches to the hero (preserveAspectRatio: none), so the
    // knot's x-radius is corrected against the hero's real aspect ratio
    // to keep its loops round at any viewport size. On narrow screens
    // the knot moves to the open band beneath the trust chips, where it
    // isn't hidden behind the search card.
    function tensePoints() {
      var box = hero.getBoundingClientRect();
      var f = (1600 * box.height) / (560 * Math.max(1, box.width));
      f = Math.max(1, Math.min(7, f));
      var narrow = f > 3;
      var cx = narrow ? 560 : 1140;
      var cy = narrow ? 515 : 345;
      var rs = narrow ? 0.55 : 1;

      var pts = [];
      for (var i = 0; i < N; i++) {
        var x = xs[i];
        pts.push([x, 575 - (325 * (x + 60)) / 1720 + 5 * Math.sin(i * 2.3)]);
      }
      var step = (X1 - X0) / (N - 1);
      var ci = Math.round((cx - X0) / step);
      for (var k = 0; k < 8; k++) {
        var a = -0.8 + k * 2.45;
        var r = (46 + 26 * Math.sin(k * 1.9 + 1)) * rs;
        pts[ci - 4 + k] = [cx + r * Math.cos(a) * f + k * 4, cy + r * Math.sin(a) * 0.85];
      }
      return pts;
    }

    function lerpPoints(a, b, t) {
      var out = [];
      for (var i = 0; i < a.length; i++) {
        out.push([a[i][0] + (b[i][0] - a[i][0]) * t, a[i][1] + (b[i][1] - a[i][1]) * t]);
      }
      return out;
    }

    // Catmull-Rom spline -> cubic bezier path string
    function toPath(pts) {
      var d = "M " + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
      for (var i = 0; i < pts.length - 1; i++) {
        var p0 = pts[Math.max(0, i - 1)];
        var p1 = pts[i];
        var p2 = pts[i + 1];
        var p3 = pts[Math.min(pts.length - 1, i + 2)];
        var c1x = p1[0] + (p2[0] - p0[0]) / 6;
        var c1y = p1[1] + (p2[1] - p0[1]) / 6;
        var c2x = p2[0] - (p3[0] - p1[0]) / 6;
        var c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d +=
          " C " + c1x.toFixed(1) + " " + c1y.toFixed(1) +
          ", " + c2x.toFixed(1) + " " + c2y.toFixed(1) +
          ", " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
      }
      return d;
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    var knot;

    if (prefersReduced) {
      // Show the resolved state, no motion
      path.setAttribute("d", toPath(releasePoints(0)));
    } else {
      var DRAW_MS = 1600;
      var HOLD_MS = 400;
      var MORPH_MS = 3000;
      var DRIFT_SPEED = 0.00045; // phase radians per ms

      var rafId = null;
      var startTime = null;

      function frame(now) {
        if (startTime === null) startTime = now;
        var elapsed = now - startTime;

        if (elapsed < DRAW_MS) {
          // Phase 1: the taut, knotted line draws itself in
          var L = path.getTotalLength();
          path.style.strokeDasharray = L;
          path.style.strokeDashoffset = L * (1 - easeInOutCubic(elapsed / DRAW_MS));
        } else if (elapsed < DRAW_MS + HOLD_MS) {
          path.style.strokeDasharray = "none";
          path.style.strokeDashoffset = 0;
        } else {
          // Phase 2: the knot works itself loose
          var m = Math.min(1, (elapsed - DRAW_MS - HOLD_MS) / MORPH_MS);
          var t = easeInOutCubic(m);
          var phase = elapsed * DRIFT_SPEED * t;
          path.setAttribute("d", toPath(lerpPoints(knot, releasePoints(phase), t)));
        }
        rafId = requestAnimationFrame(frame);
      }

      function play() {
        if (rafId) cancelAnimationFrame(rafId);
        startTime = null;
        knot = tensePoints();
        path.setAttribute("d", toPath(knot));
        rafId = requestAnimationFrame(frame);
      }

      play();

      // Debug hook for design review (harmless in production)
      window.__tension = {
        play: play,
        freeze: function (t) {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = null;
          path.style.strokeDasharray = "none";
          path.style.strokeDashoffset = 0;
          path.setAttribute("d", toPath(lerpPoints(knot, releasePoints(0), t)));
        }
      };

      // Replay when the hero comes back after fully leaving the viewport
      var left = false;
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            left = true;
          } else if (left) {
            left = false;
            play();
          }
        });
      }).observe(hero);
    }
  }

  /* ============================================================
     2. Header shadow once the page scrolls
     ============================================================ */

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     3. Mobile nav toggle
     ============================================================ */

  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ============================================================
     4. Small interaction polish
     ============================================================ */

  document.querySelectorAll(".faq details").forEach(function (details) {
    details.addEventListener("toggle", function () {
      if (details.open) {
        document.querySelectorAll(".faq details[open]").forEach(function (other) {
          if (other !== details) other.removeAttribute("open");
        });
      }
    });
  });

  if (!prefersReduced && "IntersectionObserver" in window) {
    var heroLine = document.querySelector(".tension-svg");
    if (heroLine) {
      window.addEventListener(
        "scroll",
        function () {
          var y = Math.min(window.scrollY, 420);
          heroLine.style.transform = "translate3d(0," + y * 0.08 + "px,0)";
        },
        { passive: true }
      );
    }
  }

  /* ============================================================
     5. Scroll-reveal
     ============================================================ */

  if (!prefersReduced && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
