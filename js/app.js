/**
 * BADEN BOWER | Luxury Guaranteed PR Agency Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroThreeShader();
  initPublicationsExplorer();
  initRoiCalculator();
  initPricingToggle();
  initFaqAccordion();
  initConsultationModal();
  initStatsCounter();
  initWorldClocks();
});


/* ==========================================================================
   1. Navigation & Header Scroll Behavior
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   2. Interactive Publications Directory & Search Filter (2,125+ Vetted Outlets)
   ========================================================================== */
const PUBLICATIONS_DATA = [
  { name: 'Forbes', tier: 'Tier-1 Masthead', category: 'business', da: 94, dr: 92, readers: '140M/mo', turnaround: '72h Guaranteed', type: 'Editorial Feature', price: '$4,200', aeo: true },
  { name: 'Business Insider', tier: 'Tier-1 Masthead', category: 'business', da: 92, dr: 90, readers: '95M/mo', turnaround: '48h Guaranteed', type: 'Journalist Article', price: '$2,800', aeo: true },
  { name: 'Bloomberg', tier: 'Tier-1 Masthead', category: 'finance', da: 94, dr: 93, readers: '80M/mo', turnaround: '4-5 Days', type: 'Market Spotlight', price: '$5,500', aeo: true },
  { name: 'TechCrunch', tier: 'Tier-1 Tech', category: 'tech', da: 92, dr: 91, readers: '30M/mo', turnaround: '3-4 Days', type: 'Product Feature', price: '$3,400', aeo: true },
  { name: 'Vogue', tier: 'Tier-1 Luxury', category: 'luxury', da: 89, dr: 88, readers: '22M/mo', turnaround: '72h Guaranteed', type: 'Style & Culture', price: '$4,800', aeo: false },
  { name: 'Vanity Fair', tier: 'Tier-1 Luxury', category: 'luxury', da: 88, dr: 87, readers: '18M/mo', turnaround: '4-5 Days', type: 'Editorial Profile', price: '$4,500', aeo: false },
  { name: 'Reuters', tier: 'Global Wire', category: 'wires', da: 93, dr: 92, readers: '65M/mo', turnaround: '48h Guaranteed', type: 'Syndicated Wire', price: '$1,850', aeo: true },
  { name: 'Associated Press', tier: 'Global Wire', category: 'wires', da: 92, dr: 91, readers: '50M/mo', turnaround: '24-48h SLA', type: 'Syndicated Wire', price: '$990', aeo: true },
  { name: 'Yahoo Finance', tier: 'Global Finance', category: 'finance', da: 92, dr: 93, readers: '180M/mo', turnaround: '24h SLA', type: 'Finance Release', price: '$990', aeo: true },
  { name: 'Entrepreneur', tier: 'Tier-1 Business', category: 'business', da: 91, dr: 89, readers: '25M/mo', turnaround: '72h Guaranteed', type: 'Thought Leadership', price: '$1,950', aeo: true },
  { name: 'Inc. Magazine', tier: 'Tier-1 Business', category: 'business', da: 91, dr: 90, readers: '20M/mo', turnaround: '72h Guaranteed', type: 'Founder Story', price: '$2,200', aeo: true },
  { name: 'Wired', tier: 'Tier-1 Tech', category: 'tech', da: 93, dr: 92, readers: '35M/mo', turnaround: '3-5 Days', type: 'Innovation Deep-Dive', price: '$3,800', aeo: true },
  { name: 'Fast Company', tier: 'Tier-1 Business', category: 'business', da: 91, dr: 90, readers: '18M/mo', turnaround: '3-4 Days', type: 'Disruptor Column', price: '$2,600', aeo: true },
  { name: 'CoinTelegraph', tier: 'Crypto & Web3', category: 'crypto', da: 84, dr: 82, readers: '12M/mo', turnaround: '24-48h SLA', type: 'Web3 Spotlight', price: '$1,400', aeo: true },
  { name: 'MarketWatch', tier: 'Global Finance', category: 'finance', da: 91, dr: 89, readers: '70M/mo', turnaround: '48h Guaranteed', type: 'Investor News', price: '$1,650', aeo: true },
  { name: 'Wall Street Journal', tier: 'Tier-1 Masthead', category: 'finance', da: 95, dr: 94, readers: '110M/mo', turnaround: '5-7 Days', type: 'Syndicated Feature', price: '$8,900', aeo: true },
  { name: 'USA Today', tier: 'National News', category: 'business', da: 93, dr: 91, readers: '90M/mo', turnaround: '48h Guaranteed', type: 'National Feature', price: '$1,800', aeo: true },
  { name: 'Digital Journal', tier: 'Tech & PR Wire', category: 'wires', da: 87, dr: 80, readers: '8M/mo', turnaround: '24h SLA', type: 'Indexed News Release', price: '$49', aeo: true },
  { name: 'Benzinga', tier: 'Market News', category: 'finance', da: 88, dr: 85, readers: '15M/mo', turnaround: '24h SLA', type: 'Financial Article', price: '$350', aeo: true },
  { name: 'Tech Times', tier: 'Tech News', category: 'tech', da: 83, dr: 79, readers: '5M/mo', turnaround: '48h Guaranteed', type: 'Tech Feature', price: '$180', aeo: true }
];


function initPublicationsExplorer() {
  const pubGrid = document.getElementById('pubGrid');
  const searchInput = document.getElementById('pubSearchInput');
  const filterChips = document.querySelectorAll('.filter-chip');

  if (!pubGrid) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderPublications() {
    const filtered = PUBLICATIONS_DATA.filter(pub => {
      const matchCategory = currentCategory === 'all' || pub.category === currentCategory;
      const matchSearch = pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      pubGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
          <div style="font-size: 36px; margin-bottom: 12px; color: var(--gold-light);">✦</div>
          <h4 style="font-size: 18px; color: #fff; margin-bottom: 8px;">No outlets match your search</h4>
          <p style="font-size: 14px;">We have direct editorial commercial ties with over 1,900+ publications globally. Contact us for custom mastheads.</p>
        </div>
      `;
      return;
    }    pubGrid.innerHTML = filtered.map(pub => `
      <div class="pub-card liquid-glass">
        <div>
          <div class="pub-header">
            <div>
              <div class="pub-name">${pub.name}</div>
              <div style="display: flex; gap: 6px; align-items: center; margin-top: 4px;">
                <span class="pub-badge-tier">${pub.tier}</span>
                ${pub.aeo ? '<span class="badge-aeo">AI / LLM Cited</span>' : ''}
              </div>
            </div>
            <div class="pub-price-tag">${pub.price}</div>
          </div>
          <div class="pub-meta-list">
            <div class="pub-meta-row">
              <span>Domain Authority (DA / DR)</span>
              <strong style="color: var(--gold-light);">DA ${pub.da} | DR ${pub.dr}</strong>
            </div>
            <div class="da-bar-wrapper">
              <div class="da-bar-fill" style="width: ${pub.da}%"></div>
            </div>
            <div class="pub-meta-row" style="margin-top: 8px;">
              <span>Monthly Readership</span>
              <span>${pub.readers}</span>
            </div>
            <div class="pub-meta-row">
              <span>Placement Format</span>
              <span>${pub.type}</span>
            </div>
          </div>
        </div>
        <div class="pub-footer">
          <span class="turnaround-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${pub.turnaround}
          </span>
          <button class="pub-select-btn" onclick="openBookingModalWithOutlet('${pub.name}')">Select Outlet</button>
    `).join('');
  }

  // Initial render
  renderPublications();

  // Search event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderPublications();
    });
  }

  // Filter chip click
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-filter') || 'all';
      renderPublications();
    });
  });

  window.filterByGoal = function(category, searchTerm) {
    const pubSection = document.getElementById('publications');
    if (pubSection) pubSection.scrollIntoView({ behavior: 'smooth' });

    currentCategory = category || 'all';
    searchQuery = searchTerm || '';
    if (searchInput) searchInput.value = searchQuery;

    filterChips.forEach(c => {
      c.classList.toggle('active', (c.getAttribute('data-filter') || 'all') === currentCategory);
    });

    renderPublications();
  };
}


/* ==========================================================================
   3. PR ROI & Earned Media Value (EMV) Calculator
   ========================================================================== */
function initRoiCalculator() {
  const articlesSlider = document.getElementById('calcArticlesSlider');
  const articlesVal = document.getElementById('calcArticlesVal');
  const tierSelect = document.getElementById('calcTierSelect');
  const emvTotal = document.getElementById('calcEmvTotal');
  const impressionsEst = document.getElementById('calcImpressionsEst');
  const adEquivEst = document.getElementById('calcAdEquivEst');
  const costSavingsEst = document.getElementById('calcCostSavingsEst');

  if (!articlesSlider || !emvTotal) return;

  function recalculate() {
    const articles = parseInt(articlesSlider.value, 10);
    const tierMultiplier = parseFloat(tierSelect.value);

    // Dynamic calculations
    const baseValuePerArticle = 14500 * tierMultiplier;
    const totalEmv = articles * baseValuePerArticle;
    const estImpressions = (articles * 85000 * tierMultiplier);
    const adEquiv = Math.round(totalEmv * 0.88);
    const traditionalPrAgencyCost = articles * 5500;
    const badenBowerCost = articles * 1250;
    const estimatedSavings = Math.max(0, traditionalPrAgencyCost - badenBowerCost);

    articlesVal.textContent = `${articles} Article${articles > 1 ? 's' : ''}`;
    emvTotal.textContent = `$${totalEmv.toLocaleString()}`;
    impressionsEst.textContent = `${(estImpressions / 1000).toFixed(0)}K+ Targeted Views`;
    adEquivEst.textContent = `$${adEquiv.toLocaleString()}`;
    costSavingsEst.textContent = `$${estimatedSavings.toLocaleString()} vs Old Retainers`;
  }

  articlesSlider.addEventListener('input', recalculate);
  tierSelect.addEventListener('change', recalculate);

  recalculate();
}

/* ==========================================================================
   4. Pricing Switcher (One-Off vs. Monthly Retainer)
   ========================================================================== */
function initPricingToggle() {
  const toggleBtn = document.getElementById('pricingToggle');
  const labelOneOff = document.getElementById('labelOneOff');
  const labelMonthly = document.getElementById('labelMonthly');
  const priceSingle = document.getElementById('priceSingle');
  const priceRankings = document.getElementById('priceRankings');
  const priceLogos = document.getElementById('priceLogos');
  const cadenceSingle = document.getElementById('cadenceSingle');
  const cadenceRankings = document.getElementById('cadenceRankings');
  const cadenceLogos = document.getElementById('cadenceLogos');

  if (!toggleBtn) return;

  let isMonthly = true;

  function updatePricing() {
    if (isMonthly) {
      toggleBtn.classList.add('monthly');
      labelMonthly.classList.add('active');
      labelOneOff.classList.remove('active');

      if (priceSingle) priceSingle.textContent = '990';
      if (priceRankings) priceRankings.textContent = '1,500';
      if (priceLogos) priceLogos.textContent = '3,000';

      if (cadenceSingle) cadenceSingle.textContent = '/ one-off placement';
      if (cadenceRankings) cadenceRankings.textContent = '/ month (18 Placements/yr)';
      if (cadenceLogos) cadenceLogos.textContent = '/ month (Forbes & Vogue Tier)';
    } else {
      toggleBtn.classList.remove('monthly');
      labelOneOff.classList.add('active');
      labelMonthly.classList.remove('active');

      if (priceSingle) priceSingle.textContent = '990';
      if (priceRankings) priceRankings.textContent = '4,200';
      if (priceLogos) priceLogos.textContent = '8,500';

      if (cadenceSingle) cadenceSingle.textContent = '/ single feature';
      if (cadenceRankings) cadenceRankings.textContent = '/ 3-Article Pack Bundle';
      if (cadenceLogos) cadenceLogos.textContent = '/ Top Tier-1 Masthead Pack';
    }
  }

  toggleBtn.addEventListener('click', () => {
    isMonthly = !isMonthly;
    updatePricing();
  });

  if (labelOneOff) labelOneOff.addEventListener('click', () => { isMonthly = false; updatePricing(); });
  if (labelMonthly) labelMonthly.addEventListener('click', () => { isMonthly = true; updatePricing(); });
}

/* ==========================================================================
   5. Interactive FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   6. Consultation & Booking Multi-Step Modal
   ========================================================================== */
let selectedOutletFromDirectory = '';

window.openBookingModalWithOutlet = function(outletName) {
  selectedOutletFromDirectory = outletName;
  const modal = document.getElementById('consultationModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const outletInput = document.getElementById('modalOutletInput');
    if (outletInput && outletName) {
      outletInput.value = outletName;
    }
  }
};

function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeBtn = document.getElementById('modalCloseBtn');
  const stepDots = document.querySelectorAll('.step-dot');
  const steps = document.querySelectorAll('.form-step');
  const nextBtn = document.getElementById('modalNextBtn');
  const prevBtn = document.getElementById('modalPrevBtn');
  const submitBtn = document.getElementById('modalSubmitBtn');
  const goalChips = document.querySelectorAll('.goal-chip');
  const selectedGoalInput = document.getElementById('modalGoalInput');

  if (!modal) return;

  let currentStep = 1;

  function showStep(stepNum) {
    currentStep = stepNum;
    steps.forEach((s, idx) => {
      s.classList.toggle('active', idx + 1 === stepNum);
    });
    stepDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx < stepNum);
    });

    if (prevBtn) {
      prevBtn.style.display = stepNum === 1 ? 'none' : 'inline-flex';
    }
    if (nextBtn) {
      nextBtn.style.display = stepNum === 3 ? 'none' : 'inline-flex';
    }
    if (submitBtn) {
      submitBtn.style.display = stepNum === 3 ? 'inline-flex' : 'none';
    }
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      showStep(1);
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Goal chips selection
  goalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      goalChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      if (selectedGoalInput) {
        selectedGoalInput.value = chip.getAttribute('data-goal') || chip.textContent.trim();
      }
    });
  });

  // Step navigation
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < 3) {
        showStep(currentStep + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  }

  // Form submission simulation
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalBody = modal.querySelector('.modal-body');
      const modalFooter = modal.querySelector('.modal-footer');
      const modalStepIndicator = modal.querySelector('.modal-step-indicator');

      const nameVal = document.getElementById('modalNameInput')?.value || 'Valued Executive';
      const refCode = 'BB-' + Math.floor(100000 + Math.random() * 900000);

      if (modalStepIndicator) modalStepIndicator.style.display = 'none';
      if (modalFooter) modalFooter.style.display = 'none';

      modalBody.innerHTML = `
        <div class="modal-success-state">
          <div class="success-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h4>Strategy Session Reserved</h4>
          <p>Thank you, <strong>${nameVal}</strong>. Your dedicated Baden Bower Campaign Director has been assigned.</p>
          <div style="background: rgba(212,175,55,0.1); border: 1px dashed var(--gold-primary); border-radius: 8px; padding: 14px; margin: 20px 0; font-family: monospace; font-size: 14px; color: var(--gold-light);">
            Booking Confirmation Ref: <strong>${refCode}</strong>
          </div>
          <p style="font-size: 13px; color: var(--text-muted);">A calendar invite and editorial onboarding brief have been dispatched to your email. We look forward to securing your guaranteed coverage.</p>
          <button class="btn btn-gold" style="margin-top: 24px;" onclick="document.getElementById('consultationModal').classList.remove('open'); document.body.style.overflow = '';">Done</button>
        </div>
      `;
    });
  }
}

/* ==========================================================================
   7. Viewport Stats Number Counter
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          if (isNaN(target)) return;

          let count = 0;
          const duration = 1800;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            stat.textContent = Math.floor(count).toLocaleString() + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   8. Live Global Office Clocks (NY, London, Sydney)
   ========================================================================== */
function initWorldClocks() {
  const clockNY = document.getElementById('clockNY');
  const clockLondon = document.getElementById('clockLondon');
  const clockSydney = document.getElementById('clockSydney');

  function updateClocks() {
    const now = new Date();

    const optionsNY = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const optionsLondon = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const optionsSydney = { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    if (clockNY) clockNY.textContent = new Intl.DateTimeFormat('en-US', optionsNY).format(now);
    if (clockLondon) clockLondon.textContent = new Intl.DateTimeFormat('en-GB', optionsLondon).format(now);
    if (clockSydney) clockSydney.textContent = new Intl.DateTimeFormat('en-AU', optionsSydney).format(now);
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* ==========================================================================
   9. Three.js 3D Golden Particle & Wave Shader Background
   ========================================================================== */
function initHeroThreeShader() {
  const canvas = document.getElementById('hero-webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, heroSection.clientWidth / heroSection.clientHeight, 1, 1000);
  camera.position.set(0, 50, 180);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle Wave Grid Geometry
  const countX = 60;
  const countY = 60;
  const numParticles = countX * countY;
  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);
  const colors = new Float32Array(numParticles * 3);

  const goldColor1 = new THREE.Color(0xD4AF37); // Champagne Gold
  const goldColor2 = new THREE.Color(0xF6E6A8); // Light Gold
  const darkNavy = new THREE.Color(0x101E35);   // Deep Navy

  let i = 0, j = 0;
  for (let ix = 0; ix < countX; ix++) {
    for (let iy = 0; iy < countY; iy++) {
      positions[i] = ix * 14 - (countX * 14) / 2; // x
      positions[i + 1] = 0;                       // y
      positions[i + 2] = iy * 14 - (countY * 14) / 2; // z

      scales[j] = 1.0;

      const mixedColor = ix % 3 === 0 ? goldColor2 : (ix % 2 === 0 ? goldColor1 : darkNavy);
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;

      i += 3;
      j++;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Custom Particle Shader Material
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: `
      attribute float scale;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float uTime;
      void main() {
        vColor = color;
        vec3 p = position;
        p.y += sin((p.x * 0.05) + uTime * 1.5) * 12.0 + cos((p.z * 0.05) + uTime * 1.2) * 12.0;
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = (scale * 3.5) * (180.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5, 0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.05, d) * 0.85;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, shaderMaterial);
  scene.add(particles);

  // Mouse Interaction
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
  });

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    shaderMaterial.uniforms.uTime.value = elapsedTime;

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 0.8;
    camera.position.y = 50 - (targetY * 0.4);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  // Resize Listener
  window.addEventListener('resize', () => {
    if (!heroSection) return;
    camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  });
}

