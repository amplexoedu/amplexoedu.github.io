// main.js — particles background + card tilt
(function(){
  // Particles canvas
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas && canvas.getContext && canvas.getContext('2d');
  let w, h, particles = [];

  function resize(){
    if(!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function rand(min,max){return Math.random()*(max-min)+min}

  function createParticles(){
    particles = [];
    const count = Math.max(30, Math.floor((w*h)/80000));
    for(let i=0;i<count;i++){
      particles.push({
        x: rand(0,w), y: rand(0,h), r: rand(0.6,2.4), vx: rand(-0.15,0.15), vy: rand(-0.25,-0.05), alpha: rand(0.06,0.22)
      });
    }
  }

  function draw(){
    if(!ctx) return;
    ctx.clearRect(0,0,w,h);
    for(let p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.y < -10) p.y = h + 10;
      if(p.x < -10) p.x = w + 10;
      if(p.x > w+10) p.x = -10;
      ctx.beginPath();
      ctx.fillStyle = `rgba(215,38,38,${p.alpha})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
  }

  function loop(){
    draw();
    requestAnimationFrame(loop);
  }

  if(canvas && ctx){
    resize();
    createParticles();
    window.addEventListener('resize', ()=>{resize(); createParticles();});
    requestAnimationFrame(loop);
  }

  // Card tilt
  const cards = document.querySelectorAll('.card');
  cards.forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      const cx = rect.width/2; const cy = rect.height/2;
      const dx = (x - cx) / cx; const dy = (y - cy) / cy;
      const tiltX = (-dy) * 6; const tiltY = dx * 6;
      card.style.transform = `translateZ(0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
      card.setAttribute('data-tilt','true');
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
      card.removeAttribute('data-tilt');
    });
  });

  // Button ripple
  document.addEventListener('click', (e)=>{
    const target = e.target.closest('.btn');
    if(!target) return;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height)*1.2;
    ripple.style.width = ripple.style.height = size+'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    target.appendChild(ripple);
    setTimeout(()=>{ripple.remove()},600);
  });
})();
