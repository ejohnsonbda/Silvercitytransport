// ===== Silver City Transport — interactions =====
(function () {
  'use strict';

  // ── Formspree endpoint ──────────────────────────────────────────────────────
  // Sign up at https://formspree.io, create a form for bookings@silvercitytransport.com,
  // then replace YOUR_FORM_ID below with the 8-character ID Formspree gives you.
  var FORM_ENDPOINT = 'https://formspree.io/f/mgobzjda';
  // ───────────────────────────────────────────────────────────────────────────

  // Sticky nav state
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var menu = document.getElementById('mobileMenu');
  var burger = document.getElementById('hamburger');
  var closeBtn = document.getElementById('mobileClose');
  function openMenu() { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  function revealInView() {
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add('in');
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
  revealInView();
  requestAnimationFrame(revealInView);
  window.addEventListener('scroll', revealInView, { passive: true });
  setTimeout(revealInView, 300);

  // Set min date to today
  var dateField = document.getElementById('date');
  if (dateField) {
    var t = new Date();
    dateField.min = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
  }

  // Booking form — sends to bookings@silvercitytransport.com via Formspree
  var form = document.getElementById('bookingForm');
  var fields = document.getElementById('formFields');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      if (form.querySelector('.honeypot') && form.querySelector('.honeypot').value) return;

      var btn = form.querySelector('[type="submit"]');
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
          success.classList.add('show');
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
