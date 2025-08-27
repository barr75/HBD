// Ambil elemen yang diperlukan
const center = document.getElementById('centerContent');

// Fungsi membuat konfeti
function createConfetti() {
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = -Math.random() * 20 + 'px';
    confetti.style.setProperty('--hue', Math.floor(Math.random() * 360));
    confetti.style.animationDuration = 2 + Math.random() * 3 + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// Fungsi kembang api
function launchFireworks(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = ['#ff4b5c', '#ffb400', '#00c9a7', '#8b5cf6', '#f43f5e'];

  function createParticle(x, y) {
    for (let i = 0; i < 50; i++) {
      particles.push({
        x,
        y,
        radius: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 6,
        speedY: (Math.random() - 0.5) * 6,
        alpha: 1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= 0.02;
      if (p.alpha <= 0) particles.splice(i, 1);
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (particles.length > 0) requestAnimationFrame(drawParticles);
  }

  createParticle(canvas.width / 2, canvas.height / 2);
  drawParticles();
}

// Jalankan otomatis saat halaman dibuka
window.addEventListener('DOMContentLoaded', () => {
  createConfetti();
  launchFireworks('fireworks-left');
  launchFireworks('fireworks-right');
});
