/* ═══════════════════════════════════════════
   A CORNER OF THE INTERNET — Interactions
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollReveals();
    initTiltOnScroll();
    initOpeningAnim();
    initGuitar();
});

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════ */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    const interactives = document.querySelectorAll('a, button, .polaroid, .wall-photo, .tag');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

/* ═══════════════════════════════════════════
   SCROLL REVEALS
   ═══════════════════════════════════════════ */
function initScrollReveals() {
    const selectors = [
        '.head-soft', '.serif-soft', '.anno', '.lbl',
        '.num', '.tags', '.polaroid', '.hand-note',
        '.wax-seal', '.phase', '.wall-photo',
        '.trait-row', '.close-email', '.close-links', '.close-note',
        '.bridge-note', '.hand-intro', '.scroll-nudge',
        '.closing-divider', '.process-grid'
    ];

    selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('reveal');
            el.classList.add(`reveal-d${(i % 4) + 1}`);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════
   SUBTLE TILT ON SCROLL
   ═══════════════════════════════════════════ */
function initTiltOnScroll() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const polaroids = document.querySelectorAll('.polaroid');
    const notes = document.querySelectorAll('.hand-note');
    const seals = document.querySelectorAll('.wax-seal');
    const wallPhotos = document.querySelectorAll('.wall-photo');
    const phases = document.querySelectorAll('.phase');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                polaroids.forEach((p, i) => {
                    const rect = p.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const offset = (scrollY * 0.015 * (i % 2 === 0 ? 1 : -1));
                        const base = p.classList.contains('polaroid-2') ? -3 : 3;
                        p.style.transform = `rotate(${base + offset * 0.08}deg)`;
                    }
                });

                notes.forEach((n, i) => {
                    const rect = n.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const offset = (scrollY * 0.012 * (i % 2 === 0 ? 1 : -1));
                        n.style.transform = `rotate(${3 + offset * 0.08}deg)`;
                    }
                });

                seals.forEach((s, i) => {
                    const rect = s.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const offset = (scrollY * 0.008 * (i % 2 === 0 ? 1 : -1));
                        const base = s.classList.contains('close-seal') ? 8 : -12;
                        s.style.transform = `rotate(${base + offset * 0.08}deg)`;
                    }
                });

                wallPhotos.forEach((w, i) => {
                    const rect = w.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const offset = scrollY * 0.01 * (i % 2 === 0 ? 1 : -1);
                        const baseRot = [-2, 1.5, -1, 2.5][i % 4];
                        w.style.transform = `rotate(${baseRot + offset * 0.05}deg)`;
                    }
                });

                phases.forEach((p, i) => {
                    const rect = p.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const offset = scrollY * 0.005 * (i % 2 === 0 ? 1 : -1);
                        p.style.transform = `translateY(${offset * 0.05}px)`;
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ═══════════════════════════════════════════
   OPENING ANIMATION
   ═══════════════════════════════════════════ */
function initOpeningAnim() {
    const opening = document.querySelector('.opening');
    if (!opening) return;

    const title = opening.querySelector('.head-soft');
    const anno = opening.querySelector('.anno');
    const hand = opening.querySelector('.hand-intro');
    const hint = opening.querySelector('.scroll-nudge');

    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(50px)';
        title.style.transition = 'opacity 1.1s var(--ease-out), transform 1.1s var(--ease-out)';
    }
    if (anno) {
        anno.style.opacity = '0';
        anno.style.transition = 'opacity 1s var(--ease-out) 0.5s';
    }
    if (hand) {
        hand.style.opacity = '0';
        hand.style.transition = 'opacity 0.8s var(--ease-out) 0.2s';
    }
    if (hint) {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 1s var(--ease-out) 1.1s';
    }

    requestAnimationFrame(() => {
        setTimeout(() => { if (hand) hand.style.opacity = '1'; }, 100);
        setTimeout(() => {
            if (title) { title.style.opacity = '1'; title.style.transform = 'translateY(0)'; }
        }, 250);
        setTimeout(() => { if (anno) anno.style.opacity = '0.5'; }, 600);
        setTimeout(() => { if (hint) hint.style.opacity = '0.35'; }, 1200);
    });
}

/* ═══════════════════════════════════════════
   GUITAR STRINGS
   ═══════════════════════════════════════════ */
function initGuitar() {
    const strings = document.querySelectorAll('.guitar-string');
    if (!strings.length) return;

    // Add cursor hover class to guitar wrap
    const guitarWrap = document.querySelector('.guitar-wrap');
    if (guitarWrap) {
        guitarWrap.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        guitarWrap.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    }

    strings.forEach((str) => {
        str.addEventListener('mouseenter', () => {
            str.style.stroke = '#fff';
            str.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.6))';
            // Subtle vibrate
            vibrateString(str);
        });
        str.addEventListener('mouseleave', () => {
            str.style.stroke = 'rgba(255,255,255,0.55)';
            str.style.filter = 'none';
        });
    });
}

function vibrateString(str) {
    let count = 0;
    const baseX1 = parseFloat(str.getAttribute('x1'));
    const baseX2 = parseFloat(str.getAttribute('x2'));

    function step() {
        if (count > 10) {
            str.setAttribute('x1', baseX1);
            str.setAttribute('x2', baseX2);
            return;
        }
        const offset = Math.sin(count * 1.5) * 0.6;
        str.setAttribute('x1', baseX1 + offset);
        str.setAttribute('x2', baseX2 + offset);
        count++;
        requestAnimationFrame(step);
    }
    step();
}
