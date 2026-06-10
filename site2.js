// ===== Silver City Transport — Site 2 (editorial) =====
(function () {
  'use strict';

  // ── Formspree endpoint ──────────────────────────────────────────────────────
  // Same form ID as script.js — replace YOUR_FORM_ID with your Formspree ID.
  var FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
  // ───────────────────────────────────────────────────────────────────────────

  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var menu = document.getElementById('mmenu');
  var burger = document.getElementById('hamburger');
  var mclose = document.getElementById('mclose');
  function openMenu() { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', openMenu);
  if (mclose) mclose.addEventListener('click', closeMenu);
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // Reveal
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

  // Reservation form — sends to bookings@silvercitytransport.com via Formspree
  var form = document.getElementById('rform');
  var fields = document.getElementById('rfields');
  var done = document.getElementById('rdone');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var btn = form.querySelector('.submit');
      var origHTML = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Sending…';

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.ok) {
          fields.style.display = 'none';
          done.classList.add('show');
        } else {
          btn.disabled = false;
          btn.innerHTML = origHTML;
          alert('Something went wrong. Please call 441.799.4124 or email bookings@silvercitytransport.com directly.');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.innerHTML = origHTML;
        alert('Something went wrong. Please call 441.799.4124 or email bookings@silvercitytransport.com directly.');
      });
    });
  }
})();
