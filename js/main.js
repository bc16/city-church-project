// City Church Project — one-page site JS
// Progressive enhancement only: all content is in index.html.
// Forms are PREPARED, not live, until an endpoint is set below.
// To go live, set one of these to a real form/email endpoint
// (Formspree, ConvertKit/Mailchimp, Resend, etc.) and update README.
// Until then, submissions are NOT sent — the form shows that plainly.
const FORM_ENDPOINTS = {
  call: null,       // e.g. "https://formspree.io/f/xxxx"
  signup: null,
  newsletter: null, // e.g. your newsletter provider's subscribe URL
};

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Sticky header shadow + back-to-top -----
  const header = document.getElementById('site-header');
  const backBtn = document.getElementById('back-to-top');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    if (backBtn) backBtn.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ----- Mobile nav -----
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  // ----- Scrollspy: highlight the nav link for the section in view -----
  const spyLinks = document.querySelectorAll('[data-spy]');
  const spySections = document.querySelectorAll('[data-spy-section]');
  if ('IntersectionObserver' in window && spyLinks.length && spySections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('data-spy-section');
        spyLinks.forEach(link => link.classList.toggle('active', link.getAttribute('data-spy') === id));
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    spySections.forEach(s => spy.observe(s));
  }

  // ----- Reveal on scroll -----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => reveal.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ----- What We Do tabs (with keyboard arrow support) -----
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = document.querySelectorAll('[role="tabpanel"]');
  const selectTab = (tab) => {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(p => { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) { e.preventDefault(); next.focus(); selectTab(next); }
    });
  });

  // ----- Forms: validate, then confirm (or POST if an endpoint is set) -----
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Native-style validation: highlight the first invalid field
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const kind = form.getAttribute('data-form');
      const endpoint = FORM_ENDPOINTS[kind];
      const data = Object.fromEntries(new FormData(form).entries());
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      // Remove any prior success note
      form.querySelectorAll('.form-success').forEach(n => n.remove());

      if (endpoint) {
        // Live mode: POST to the configured service
        try {
          if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error('Form service returned ' + res.status);
          showSuccess(form, 'Thanks — you\'re in. We\'ll be in touch soon.');
          form.reset();
        } catch (err) {
          showSuccess(form, 'Hmm — that didn\'t send. Please try again, or reach out directly once contact details are published.');
        } finally {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        }
        return;
      }

      // Preview mode: no endpoint yet, so nothing is sent — say so plainly
      const messages = {
        call: 'Thanks — this form isn\'t connected yet, so your request hasn\'t been sent. Please check back once the form is live.',
        signup: 'Thanks — this form isn\'t connected yet, so your signup hasn\'t been sent. Please check back once the form is live.',
        newsletter: 'Thanks — this form isn\'t connected yet, so you haven\'t been added. Please check back once the newsletter is live.',
      };
      showSuccess(form, messages[kind] || 'Thanks — noted.');
      form.reset();
    });
  });

  function showSuccess(form, text) {
    const note = document.createElement('p');
    note.className = 'form-success';
    note.setAttribute('role', 'status');
    note.textContent = text;
    form.prepend(note);
    note.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// Safety net: if reveal never fired, show everything after 2.5s.
setTimeout(function () {
  document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) { el.classList.add('visible'); });
}, 2500);
