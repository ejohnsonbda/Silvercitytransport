// ===== Silver City Transport — Site 2 (editorial) =====
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var menu = document.getElementById('mmenu');
  var burger = document.getElementById('hamburger');
  var mclose = document.getElementById('mclose');
  function open() { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { menu.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', open);
  if (mclose) mclose.addEventListener('click', close);
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });

  // Reveal — content visible by default; this only adds the .in end-state.
  function revealInView() {
    document.querySelectorAll('.rv:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > 0) el.classList.add('in');
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
  }
  revealInView();
  requestAnimationFrame(revealInView);
  window.addEventListener('scroll', revealInView, { passive: true });
  setTimeout(revealInView, 300);

  // Date min = today
  var d = document.getElementById('r-date');
  if (d) {
    var t = new Date();
    d.min = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
  }

  // Reservation form
  var form = document.getElementById('rform');
  var fields = document.getElementById('rfields');
  var done = document.getElementById('rdone');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      fields.style.display = 'none';
      done.classList.add('show');
    });
  }
})();
