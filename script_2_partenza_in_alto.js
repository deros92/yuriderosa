window.addEventListener('load', function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var lightningInterval;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Particle(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y > canvas.height) {
      this.speedY *= -1;
    }
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = '#00FFFF';
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  function createParticles() {
    for (var i = 0; i < 100; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      var size = Math.random() * 3 + 1;
      var speedX = (Math.random() - 0.5) * 2;
      var speedY = (Math.random() - 0.5) * 2;

      particles.push(new Particle(x, y, size, speedX, speedY));
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animateParticles);
  }

  function createLightning() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;

    ctx.beginPath();
    ctx.strokeStyle = '#FFFF00';
    ctx.moveTo(x, y);

    for (var i = 0; i < 20; i++) {
      var newX = x + Math.random() * 40 - 20;
      var newY = y + Math.random() * 40 - 20;
      ctx.lineTo(newX, newY);
      x = newX;
      y = newY;
    }

    ctx.stroke();
  }

  function startLightningInterval() {
    createLightning();
    lightningInterval = setInterval(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animateParticles();
      createLightning();
    }, 5000);
  }

  var header = document.querySelector('header');
  var canvasContainer = document.createElement('div');
  canvasContainer.id = 'canvas-container';
  canvasContainer.appendChild(canvas);
  header.appendChild(canvasContainer);

  createParticles();
  animateParticles();
  startLightningInterval();

  resizeCanvas(); // Imposta la larghezza del canvas iniziale al caricamento della pagina

  window.addEventListener('resize', function() {
    resizeCanvas(); // Aggiorna la larghezza del canvas durante il ridimensionamento della finestra
  });

});
