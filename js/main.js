(function () {
  const header = document.querySelector('.site-header');
  if (header) {
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 80);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var toggle = document.querySelector('.nav-toggle');
  var navDrawer = document.getElementById('nav-drawer');
  var backdrop = document.getElementById('nav-backdrop');

  function closeMenu() {
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (navDrawer) navDrawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle && navDrawer) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      navDrawer.classList.toggle('open', !open);
      if (backdrop) backdrop.classList.toggle('open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });

    document.addEventListener('click', function (e) {
      if (window.innerWidth > 600) return;
      if (!navDrawer.classList.contains('open')) return;
      if (e.target.closest('#nav-drawer') || e.target.closest('.nav-toggle')) return;
      closeMenu();
    });

    navDrawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 600) closeMenu();
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href');
    if (id === '#') return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
