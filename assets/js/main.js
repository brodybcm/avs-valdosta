/**
 * AVS, Inc. (Audio, Video & Security, Inc.) — Valdosta, GA
 * Interactive UI Controller (main.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. Sticky Header & Mobile Navigation Toggle
     ------------------------------------------------------------------------ */
  const header = document.querySelector('.site-header');
  const mobileBtn = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Hero Showcase Carousel (Restored High-Res AVS Slides)
     ------------------------------------------------------------------------ */
  const slides = document.querySelectorAll('.showcase-slide');
  const tabs = document.querySelectorAll('.showcase-tab');
  const showcaseContainer = document.querySelector('.hero-showcase');

  if (slides.length > 0 && tabs.length > 0) {
    let currentSlide = 0;
    let slideInterval = null;

    const activateSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
      tabs.forEach((t, i) => {
        t.classList.toggle('active', i === currentSlide);
        t.setAttribute('aria-selected', String(i === currentSlide));
      });
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      slideInterval = setInterval(() => {
        activateSlide(currentSlide + 1);
      }, 5500);
    };

    const stopAutoSlide = () => {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    };

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        activateSlide(idx);
        startAutoSlide();
      });
    });

    if (showcaseContainer) {
      showcaseContainer.addEventListener('mouseenter', stopAutoSlide);
      showcaseContainer.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();
  }

  /* ------------------------------------------------------------------------
     3. Interactive AVS Smart Control Simulator (Residential & Commercial)
     ------------------------------------------------------------------------ */
  const simData = {
    residential: [
      {
        id: 'goodnight',
        icon: '🌙',
        title: '"Goodnight" Scene',
        sub: 'Bedside or smartphone one-touch lockdown',
        badge: 'PERIMETER ARMED • ALL SECURE',
        alert: false,
        headline: 'One-Touch "Goodnight" Whole-Home Scene',
        narrative:
          'Your kids work hard all day to turn on every light in the house. With one tap from your bedside touchscreen or smartphone, AVS turns off every interior light, locks smart deadbolts, arms your DMP security system to Stay/Instant, and activates exterior soffit lighting to keep unwanted visitors at bay.',
        metrics: {
          security: 'Armed Stay (DMP Cellular)',
          lighting: 'Interior 0% • Exterior 100%',
          av: 'All Rooms Powered Down',
          climate: 'Night Setback (68°F)'
        }
      },
      {
        id: 'midnight',
        icon: '✨',
        title: 'Midnight Path (30% Dim)',
        sub: 'Motion-guided soft night lighting',
        badge: 'MOTION PATHWAY ACTIVE',
        alert: false,
        headline: 'Automatic 30% Soft Nighttime Pathway',
        narrative:
          'If your little ones wake in the middle of the night, smart motion sensors automatically trigger a gentle pathway to the bathroom or kitchen. Pre-set at 30% brightness, the lighting path is suitably soft and sufficient—with zero need to walk from room to room flipping wall switches.',
        metrics: {
          security: 'Armed Stay • Interior Bypass',
          lighting: 'Hall & Kitchen Pre-Set 30%',
          av: 'Silent / Do Not Disturb',
          climate: 'Night Comfort Hold (68°F)'
        }
      },
      {
        id: 'theater',
        icon: '🎬',
        title: 'Home Theater Premiere',
        sub: 'Control4 + Marantz + Epson 4K Cinema',
        badge: 'CINEMA SCENE ENGAGED',
        alert: false,
        headline: 'True Cinema Experience in One Press',
        narrative:
          'Press "Watch Movie" on your universal Control4 remote: motorized shades lower, theater sconces fade to a 10% glow over 4 seconds, and your Epson projection system, Marantz AV receiver, Definitive Technology surround array, and Seatcraft theater seating come alive in perfect harmony.',
        metrics: {
          security: 'Driveway Camera PIP Enabled',
          lighting: 'Theater Sconces 10% Fade',
          av: '4K Projector + 7.2.4 Surround',
          climate: 'Quiet Fan Mode (70°F)'
        }
      },
      {
        id: 'panic',
        icon: '🚨',
        title: '"Panic" Deterrence Mode',
        sub: 'Instant interior illumination + exterior flash',
        badge: 'EMERGENCY DETERRENCE ACTIVE',
        alert: true,
        headline: 'Instant "Panic" Lighting & 24/7 Dispatch',
        narrative:
          'If you hear a suspicious noise outside, one touch of the "Panic" button immediately illuminates every interior light in the home to 100%, flashes all exterior floodlights to alert neighbors and first responders, records high-frame-rate video across all cameras, and signals AVS 24-hour monitoring.',
        metrics: {
          security: '24/7 Priority Cellular Dispatch',
          lighting: 'Interior 100% • Exterior Flashing',
          av: 'Whole-Home Audio Siren Alert',
          climate: 'HVAC Emergency Cutoff Ready'
        }
      }
    ],
    commercial: [
      {
        id: 'open',
        icon: '🏢',
        title: 'Morning "Welcome" Scene',
        sub: 'Auto-triggers when first employee badges in',
        badge: 'FACILITY OPEN • ACCESS LOGGED',
        alert: false,
        headline: 'Automated Commercial Opening & Customer Welcome',
        narrative:
          'When the first manager badges in at the RS2 access reader or at a scheduled time of day, your DMP alarm disarms, showroom lighting and music fade up, climate pre-sets activate, and digital signage/TVs wake up to greet your customers with the perfect welcome.',
        metrics: {
          security: 'Disarmed by Authorized Badge',
          lighting: 'Showroom 100% • Accent On',
          av: 'Lobby Audio & Signage Active',
          climate: 'Business Hours Comfort (71°F)'
        }
      },
      {
        id: 'close',
        icon: '🔒',
        title: 'One-Button Facility Close',
        sub: 'Arms intrusion, locks doors & sets watches',
        badge: 'FACILITY ARMED • CELLULAR FACP OK',
        alert: false,
        headline: 'Single-Touch Commercial Lockdown & Energy Save',
        narrative:
          'Eliminate the nightly checklist. With one button press, your commercial security system arms, all magnetic/fob doors lock on schedule, non-essential lights and TVs power down, thermostats switch to away mode, and camera analytics begin watching sensitive areas.',
        metrics: {
          security: 'Armed Away + Cellular Fire OK',
          lighting: 'Safety Egress & Parking Lot Only',
          av: 'All Displays Powered Off',
          climate: 'Overnight Eco Setback (76°F)'
        }
      },
      {
        id: 'boardroom',
        icon: '📊',
        title: 'One-Touch Boardroom',
        sub: 'Screen, projector, lights & conferencing',
        badge: 'PRESENTATION MODE ACTIVE',
        alert: false,
        headline: 'Zero-Headache Automated Conference Room',
        narrative:
          'In an AVS automated boardroom, one touch on the tabletop panel lowers the motorized screen, dims architectural lighting over the conference table, wakes the projector, and connects your presentation and Allworx/VoIP conference audio so you can get straight down to business.',
        metrics: {
          security: 'Boardroom Privacy Lock Active',
          lighting: 'Table 40% • Screen Wall 10%',
          av: 'Projector + Conferencing Live',
          climate: 'Meeting Load Cooling (69°F)'
        }
      },
      {
        id: 'watch',
        icon: '📹',
        title: 'Weekend Activity Alert',
        sub: 'Live mobile video & anomalous event alerts',
        badge: 'REMOTE SURVEILLANCE VERIFIED',
        alert: true,
        headline: '24/7 Mobile Camera Verification & Facility Alerts',
        narrative:
          'You cannot be at work all the time, but you can always keep an eye on operations from the AVS mobile app. Receive real-time push/email alerts with live streaming video clips if a warehouse door opens after hours, equipment is left running overnight, or weekend motion is detected.',
        metrics: {
          security: 'Zone 4 Loading Bay Clip Saved',
          lighting: 'Loading Bay Floods Triggered',
          av: 'Mobile Live Stream Connected',
          climate: 'Server Room Temp Normal (66°F)'
        }
      }
    ]
  };

  const modeBtns = document.querySelectorAll('.sim-mode-btn');
  const sceneBtnsContainer = document.getElementById('scene-buttons-list');
  const sceneBadge = document.getElementById('sim-badge');
  const sceneHeadline = document.getElementById('sim-headline');
  const sceneNarrative = document.getElementById('sim-narrative');
  const metricSecurity = document.getElementById('sim-metric-security');
  const metricLighting = document.getElementById('sim-metric-lighting');
  const metricAv = document.getElementById('sim-metric-av');
  const metricClimate = document.getElementById('sim-metric-climate');

  let currentMode = 'residential';

  const renderSceneDetail = (scene) => {
    if (!sceneHeadline) return;
    sceneBadge.textContent = scene.badge;
    sceneBadge.classList.toggle('alert', Boolean(scene.alert));
    sceneHeadline.textContent = scene.headline;
    sceneNarrative.textContent = scene.narrative;
    metricSecurity.textContent = scene.metrics.security;
    metricLighting.textContent = scene.metrics.lighting;
    metricAv.textContent = scene.metrics.av;
    metricClimate.textContent = scene.metrics.climate;
  };

  const renderMode = (mode) => {
    currentMode = mode;
    if (!sceneBtnsContainer) return;
    const scenes = simData[mode] || [];
    sceneBtnsContainer.innerHTML = '';

    scenes.forEach((scene, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `scene-btn ${idx === 0 ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="scene-btn-icon" aria-hidden="true">${scene.icon}</span>
        <span>
          <span class="scene-btn-title">${scene.title}</span>
          <span class="scene-btn-sub">${scene.sub}</span>
        </span>
      `;
      btn.addEventListener('click', () => {
        sceneBtnsContainer.querySelectorAll('.scene-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderSceneDetail(scene);
      });
      sceneBtnsContainer.appendChild(btn);
    });

    if (scenes[0]) {
      renderSceneDetail(scenes[0]);
    }
  };

  if (modeBtns.length > 0 && sceneBtnsContainer) {
    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        modeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderMode(btn.dataset.mode);
      });
    });
    renderMode('residential');
  }

  /* ------------------------------------------------------------------------
     4. Service Configurator Chips & Form Submission Handling
     ------------------------------------------------------------------------ */
  const chips = document.querySelectorAll('.service-chip');
  const selectedServicesInput = document.getElementById('selected-services-input');

  const updateSelectedServices = () => {
    if (!selectedServicesInput) return;
    const chosen = Array.from(document.querySelectorAll('.service-chip.selected')).map(
      (c) => c.dataset.service || c.textContent.trim()
    );
    selectedServicesInput.value = chosen.join(', ');
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      chip.setAttribute('aria-pressed', String(chip.classList.contains('selected')));
      updateSelectedServices();
    });
  });
  updateSelectedServices();

  const forms = document.querySelectorAll('.avs-interactive-form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      const submitBtn = form.querySelector('button[type="submit"]');
      const nameInput = form.querySelector('input[name="name"], input[name="first_name"]');
      const userName = nameInput && nameInput.value ? nameInput.value.trim() : 'Valued Client';
      const refCode = 'AVS-' + Math.floor(100000 + Math.random() * 900000);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Request Received ✓';
      }

      if (feedback) {
        feedback.innerHTML = `
          <strong>Thank you, ${userName}! (Ref: ${refCode})</strong><br>
          Your request has been logged for our Valdosta team (including your <strong>2 Months Free Monitoring</strong> eligibility).
          For immediate assistance during office hours (M–F, 8 AM – 5 PM), call us directly at
          <a href="tel:+12292440200" style="text-decoration:underline;font-weight:800;">(229) 244-0200</a>.
        `;
        feedback.classList.add('visible');
      }
    });
  });
});
