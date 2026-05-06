// ===== PORTFOLIO DATA =====
const portfolioData = {
  name: "Isha Sahu",
  title: "UX/UI Designer",
  email: "hello@eshasahu.design",
  about: {
    bio: "I'm Isha — a UX/UI designer who believes that good design should feel invisible. It should guide you, not distract you. It should solve real problems for real people.",
    bio2: "My journey started with a brush and canvas, and now continues with interfaces and interactions. I focus on understanding users deeply before designing anything.",
    bio3: "I don't make pretty UI. I make usable products that solve real problems."
  },
  skills: ["Figma", "User Research", "Prototyping", "Design Systems", "HTML/CSS"],
  projects: [
    {
      title: "MoneyShip",
      description: "Simplifying money management for small business owners",
      tags: ["UX Research", "Mobile App", "Fintech"]
    },
    {
      title: "Creative Platform",
      description: "Redesigning the experience for artists and creators",
      tags: ["UI Design", "Design Systems", "User Research"]
    },
    {
      title: "Eco Tracker",
      description: "Making sustainability tracking delightful",
      tags: ["Dashboard", "Data Viz", "Sustainability"]
    }
  ],
  social: {
    dribbble: "https://dribbble.com",
    linkedin: "https://linkedin.com",
    behance: "https://behance.net"
  }
};

// ===== DREAMY HARP-LIKE MELODIC SYNTHESIS =====
class GuitarAudio {
  constructor() {
    this.audioContext = null;
    this.initialized = false;
    // C major pentatonic — one octave higher for bright, sparkling tone
    this.notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    // Matching harmony notes for cascade effect (thirds above)
    this.harmonies = [659.25, 783.99, 880.00, 987.77, 1046.50, 1318.51];
  }

  async init() {
    if (this.initialized) return;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.initialized = true;
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Plays a gentle two-note cascade like a harp or music box
  async playMelodicPluck(rootFreq, harmonyFreq) {
    await this.init();
    const ctx = this.audioContext;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    const now = ctx.currentTime;

    // Create shared effect chain for lush space
    const reverbDelay1 = ctx.createDelay();
    reverbDelay1.delayTime.setValueAtTime(0.25, now);
    const reverbDelay2 = ctx.createDelay();
    reverbDelay2.delayTime.setValueAtTime(0.5, now);
    const reverbGain1 = ctx.createGain();
    reverbGain1.gain.setValueAtTime(0.37, now);
    const reverbGain2 = ctx.createGain();
    reverbGain2.gain.setValueAtTime(0.19, now);

    const master = ctx.createGain();
    master.gain.setValueAtTime(1.0, now);

    // Connect reverb network
    reverbDelay1.connect(reverbGain1);
    reverbGain1.connect(ctx.destination);
    reverbDelay2.connect(reverbGain2);
    reverbGain2.connect(ctx.destination);
    reverbGain1.connect(reverbDelay2);

    // === ROOT NOTE ===
    this.createBellVoice(ctx, rootFreq, now, 0, master, reverbDelay1);

    // === HARMONY NOTE === (plays 120ms later, softer)
    this.createBellVoice(ctx, harmonyFreq, now, 0.12, master, reverbDelay1);
  }

  createBellVoice(ctx, freq, now, delayOffset, master, reverbInput) {
    const t = now + delayOffset;
    const duration = 2.2;

    // 1. Bright sine core
    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(freq, t);

    // 2. Triangle overtone — more harmonics for vibrancy
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(freq, t);

    // 3. High shimmer sparkle
    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(freq * 3.5, t);

    // 4. Extra high sparkle for brilliance
    const sparkle = ctx.createOscillator();
    sparkle.type = 'triangle';
    sparkle.frequency.setValueAtTime(freq * 5.0, t);

    // Envelopes — snappy attack, shorter decay
    const sineGain = ctx.createGain();
    sineGain.gain.setValueAtTime(0, t);
    sineGain.gain.linearRampToValueAtTime(0.47, t + 0.008);
    sineGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    const triGain = ctx.createGain();
    triGain.gain.setValueAtTime(0, t);
    triGain.gain.linearRampToValueAtTime(0.23, t + 0.012);
    triGain.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.6);

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0, t);
    shimmerGain.gain.linearRampToValueAtTime(0.13, t + 0.015);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.35);

    const sparkleGain = ctx.createGain();
    sparkleGain.gain.setValueAtTime(0, t);
    sparkleGain.gain.linearRampToValueAtTime(0.075, t + 0.01);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.25);

    // Bright bandpass filter — lets highs shine
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3500, t);
    filter.frequency.exponentialRampToValueAtTime(1200, t + 1.5);
    filter.Q.setValueAtTime(0.6, t);

    // Chorus detune
    const chorus = ctx.createOscillator();
    chorus.type = 'sine';
    chorus.frequency.setValueAtTime(freq * 1.004, t);
    const chorusGain = ctx.createGain();
    chorusGain.gain.setValueAtTime(0, t);
    chorusGain.gain.linearRampToValueAtTime(0.075, t + 0.015);
    chorusGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    // Panning
    const panner = ctx.createStereoPanner();
    const panVal = (Math.random() - 0.5) * 0.6;
    panner.pan.setValueAtTime(panVal, t);

    // Connect
    sine.connect(filter);
    filter.connect(sineGain);
    sineGain.connect(panner);

    tri.connect(triGain);
    triGain.connect(panner);

    shimmer.connect(shimmerGain);
    shimmerGain.connect(panner);

    sparkle.connect(sparkleGain);
    sparkleGain.connect(panner);

    chorus.connect(chorusGain);
    chorusGain.connect(panner);

    panner.connect(master);
    panner.connect(reverbInput);

    // Start
    sine.start(t);
    tri.start(t);
    shimmer.start(t);
    sparkle.start(t);
    chorus.start(t);

    // Stop
    sine.stop(t + duration);
    tri.stop(t + duration * 0.6);
    shimmer.stop(t + duration * 0.35);
    sparkle.stop(t + duration * 0.25);
    chorus.stop(t + duration);
  }

  async vibrateString(stringElement, index) {
    stringElement.classList.add("vibrating");
    setTimeout(() => {
      stringElement.classList.remove("vibrating");
    }, 500);

    // Play root + harmony cascade
    await this.playMelodicPluck(this.notes[index], this.harmonies[index]);
  }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ===== ANIMATE ON SCROLL =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  const selectors = [
    '.hero-left', '.guitar-wrapper', '.project-card', 
    '.playground-card', '.about-content', '.about-photo-wrap'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('animate-in');
      el.style.transitionDelay = `${i * 0.1}s`;
      observer.observe(el);
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

// ===== PARALLAX FLOATING SHAPES =====
function initParallaxShapes() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const shapes = document.querySelectorAll('.floating-shapes .shape');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        shapes.forEach((shape, i) => {
          const speed = 0.02 * (i + 1);
          const yOffset = scrollY * speed;
          const currentTransform = shape.style.transform || '';
          shape.style.transform = `translateY(${yOffset}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ===== MOUSE PARALLAX ON HERO =====
function initHeroParallax() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const hero = document.querySelector('.hero');
  const bgShape = document.querySelector('.hero-bg-shape');
  if (!hero || !bgShape) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    bgShape.style.transform = `translate(${x * 30}px, ${y * 30}px) scale(1.1)`;
  });
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<span class="custom-cursor__text">View<br>Case Study</span>';
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states for index cards — ONLY in work section
  document.querySelectorAll('#work .index-card').forEach(card => {
    card.addEventListener('mouseenter', () => cursor.classList.add('custom-cursor--active'));
    card.addEventListener('mouseleave', () => cursor.classList.remove('custom-cursor--active'));
  });
}

// ===== SCROLL TO TOP ON REFRESH =====
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initScrollAnimations();
  initNavbarScroll();
  initScrollReveal();
  initParallaxShapes();
  initHeroParallax();
  initCustomCursor();

  // Guitar audio
  const guitar = new GuitarAudio();

  document.querySelectorAll(".guitar-string").forEach((string, index) => {
    string.addEventListener("mouseenter", () => {
      guitar.vibrateString(string, index);
    });

    string.addEventListener("click", () => {
      guitar.vibrateString(string, index);
    });
  });
});
