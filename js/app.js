/**
 * BADEN BOWER | Luxury Guaranteed PR Agency Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
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
   2. Interactive Publications Directory & Search Filter
   ========================================================================== */
const PUBLICATIONS_DATA = [
  { name: 'Forbes', tier: 'Tier-1 Masthead', category: 'business', da: 94, readers: '140M/mo', turnaround: '72h Guaranteed', type: 'Editorial Feature' },
  { name: 'Business Insider', tier: 'Tier-1 Masthead', category: 'business', da: 92, readers: '95M/mo', turnaround: '48h Guaranteed', type: 'Journalist Article' },
  { name: 'Bloomberg', tier: 'Tier-1 Masthead', category: 'finance', da: 94, readers: '80M/mo', turnaround: '4-5 Days', type: 'Market Spotlight' },
  { name: 'TechCrunch', tier: 'Tier-1 Tech', category: 'tech', da: 92, readers: '30M/mo', turnaround: '3-4 Days', type: 'Product Feature' },
  { name: 'Vogue', tier: 'Tier-1 Luxury', category: 'luxury', da: 89, readers: '22M/mo', turnaround: '72h Guaranteed', type: 'Style & Culture' },
  { name: 'Vanity Fair', tier: 'Tier-1 Luxury', category: 'luxury', da: 88, readers: '18M/mo', turnaround: '4-5 Days', type: 'Editorial Profile' },
  { name: 'Reuters', tier: 'Global Wire', category: 'wires', da: 93, readers: '65M/mo', turnaround: '48h Guaranteed', type: 'Syndicated Wire' },
  { name: 'Associated Press', tier: 'Global Wire', category: 'wires', da: 92, readers: '50M/mo', turnaround: '24-48h SLA', type: 'Syndicated Wire' },
  { name: 'Yahoo Finance', tier: 'Global Finance', category: 'finance', da: 92, readers: '180M/mo', turnaround: '24h SLA', type: 'Finance Release' },
  { name: 'Entrepreneur', tier: 'Tier-1 Business', category: 'business', da: 91, readers: '25M/mo', turnaround: '72h Guaranteed', type: 'Thought Leadership' },
  { name: 'Inc. Magazine', tier: 'Tier-1 Business', category: 'business', da: 91, readers: '20M/mo', turnaround: '72h Guaranteed', type: 'Founder Story' },
  { name: 'Wired', tier: 'Tier-1 Tech', category: 'tech', da: 93, readers: '35M/mo', turnaround: '3-5 Days', type: 'Innovation Deep-Dive' },
  { name: 'Fast Company', tier: 'Tier-1 Business', category: 'business', da: 91, readers: '18M/mo', turnaround: '3-4 Days', type: 'Disruptor Column' },
  { name: 'CoinTelegraph', tier: 'Crypto & Web3', category: 'crypto', da: 84, readers: '12M/mo', turnaround: '24-48h SLA', type: 'Web3 Spotlight' },
  { name: 'MarketWatch', tier: 'Global Finance', category: 'finance', da: 91, readers: '70M/mo', turnaround: '48h Guaranteed', type: 'Investor News' },
  { name: 'Wall Street Journal', tier: 'Tier-1 Masthead', category: 'finance', da: 95, readers: '110M/mo', turnaround: '5-7 Days', type: 'Syndicated Feature' }
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
    }

    pubGrid.innerHTML = filtered.map(pub => `
      <div class="pub-card liquid-glass">
        <div>

          <div class="pub-header">
            <div class="pub-name">${pub.name}</div>
            <span class="pub-badge-tier">${pub.tier}</span>
          </div>
          <div class="pub-meta-list">
            <div class="pub-meta-row">
              <span>Domain Authority (DA)</span>
              <strong style="color: var(--gold-light);">${pub.da}/100</strong>
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
        </div>
      </div>
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
