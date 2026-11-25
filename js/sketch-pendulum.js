// Small, critically damped paper movement. Only runs while visible and moving.
document.querySelectorAll('.sketch-board, .digital-row, .wordmark-row').forEach(board => {
  const sheets = [...board.querySelectorAll('.sketch-mount > figure')];
  if (!sheets.length) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const states = sheets.map((node, index) => ({
    node, angle: 0, velocity: 0,
    strength: index ? .8 : 1, damping: index ? 15 : 17
  }));
  let visible = false, frame = 0, previousFrame = 0;
  let previousY = scrollY, previousScroll = performance.now(), lastInput = 0, drive = 0;
  const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));

  function rest() {
    cancelAnimationFrame(frame);
    frame = 0;
    drive = 0;
    states.forEach(state => {
      state.angle = state.velocity = 0;
      state.node.style.setProperty('--sketch-swing', '0deg');
    });
  }
  function configure() {
    rest();
    states.forEach(state => {
      if (motion.matches) {
        state.node.removeAttribute('data-pendulum');
        state.node.style.removeProperty('--sketch-swing');
      } else {
        state.node.setAttribute('data-pendulum', '');
      }
    });
    previousY = scrollY;
    previousScroll = performance.now();
  }
  function animate(now) {
    frame = 0;
    if (!visible || motion.matches || document.hidden) { rest(); return; }
    const dt = Math.min((now - previousFrame) / 1000, .05);
    previousFrame = now;
    const target = now - lastInput < 70 ? drive : 0;
    let moving = false;
    states.forEach(state => {
      // Exact critically damped spring step: no accumulating oscillation.
      const goal = target * state.strength;
      const error = state.angle - goal;
      const correction = state.velocity + state.damping * error;
      const decay = Math.exp(-state.damping * dt);
      state.angle = clamp(goal + (error + correction * dt) * decay, 2.6);
      state.velocity = (state.velocity - state.damping * correction * dt) * decay;
      if (now - lastInput > 850 || (Math.abs(state.angle) < .01 && Math.abs(state.velocity) < .05 && !target)) {
        state.angle = state.velocity = 0;
      }
      state.node.style.setProperty('--sketch-swing', `${state.angle.toFixed(4)}deg`);
      moving ||= Math.abs(state.angle) > 0 || Math.abs(state.velocity) > 0 || target !== 0;
    });
    if (moving) frame = requestAnimationFrame(animate);
  }
  window.addEventListener('scroll', () => {
    const now = performance.now();
    const delta = scrollY - previousY;
    const elapsed = Math.max(16, now - previousScroll);
    previousY = scrollY;
    previousScroll = now;
    if (!visible || motion.matches || !delta) return;
    drive = clamp(delta / elapsed * 1.2, 2.6);
    lastInput = now;
    if (!frame) {
      previousFrame = now;
      frame = requestAnimationFrame(animate);
    }
  }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) rest();
    }, { rootMargin: '100px 0px' }).observe(board);
  } else visible = true;
  document.addEventListener('visibilitychange', () => { if (document.hidden) rest(); });
  motion.addEventListener('change', configure);
  configure();
});
