// ===== Silver City Transport — interactions =====
(function () {
  'use strict';

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
  var close = document.getElementById('mobileClose');
  function openMenu() { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

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
  // Trigger above-the-fold immediately + on scroll as a robust fallback
  revealInView();
  requestAnimationFrame(revealInView);
  window.addEventListener('scroll', revealInView, { passive: true });
  setTimeout(revealInView, 300);

  // Set min date to today on the date field
  var dateField = document.getElementById('date');
  if (dateField) {
    var t = new Date();
    var iso = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
    dateField.min = iso;
  }

  // Booking form
  var form = document.getElementById('bookingForm');
  var fields = document.getElementById('formFields');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      fields.style.display = 'none';
      success.classList.add('show');
      success.scrollIntoView ? null : null; // no-op; avoid scrollIntoView per guidelines
    });
  }
})();
