// Animate on entry without hiding content: everything remains available if JS fails.
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && 'animate' in Element.prototype) {
  const animations = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (preference.matches) continue;
      const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--reveal-delay')) || 0;
      const animation = entry.target.animate([
        { opacity: 0.25, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 550, delay, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('main > section:not(.hero):not(.process-section), [data-reveal]').forEach(element => observer.observe(element));
  preference.addEventListener('change', () => {
    if (preference.matches) { animations.forEach(animation => animation.cancel()); animations.clear(); }
  });
  document.addEventListener('focusin', () => {
    animations.forEach(animation => animation.cancel()); animations.clear();
  });
}
