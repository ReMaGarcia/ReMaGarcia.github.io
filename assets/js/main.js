/* ReMaGarcia · portfolio
   Anio del pie y carruseles ([data-slider]). Sin dependencias. */
"use strict";
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('anio').textContent = new Date().getFullYear();

  document.querySelectorAll('[data-slider]').forEach(function (root) {
    var track = root.querySelector('.track');
    var slides = Array.prototype.slice.call(track.children);
    var dotsBox = root.querySelector('.dots');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var dots = [];
    var current = 0, timer = null;

    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    }
    function paint(i) {
      current = i;
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    }

    slides.forEach(function (s, k) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'dot';
      b.setAttribute('aria-label', 'Ir a la diapositiva ' + (k + 1) + ' de ' + slides.length);
      b.addEventListener('click', function () { go(k); });
      dotsBox.appendChild(b); dots.push(b);
    });

    prev.addEventListener('click', function () { go(current - 1); });
    next.addEventListener('click', function () { go(current + 1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
    });
    track.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        paint(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
      }, 60);
    }, { passive: true });
    window.addEventListener('resize', function () { track.scrollLeft = current * track.clientWidth; });
    paint(0);
  });
})();
