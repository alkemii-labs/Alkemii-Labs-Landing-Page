document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. ISOLATION: Grab elements and immediately exit if they don't exist on this page.
  const container = document.getElementById("how-we-work");
  const header = document.getElementById("how-we-work-header");
  const cards = document.getElementById("how-we-work-cards");
  const stepsWrap = document.getElementById("how-we-work-steps");

  if (!container || !header || !cards) return; 

  const cardElements = cards.querySelectorAll(".how-we-work-card");
  const steps = stepsWrap ? stepsWrap.querySelectorAll(".how-we-work-step") : [];

  // Helper function to toggle active classes
  const setActiveStep = (index) => {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });
  };

  // 2. RESPONSIVE SANDBOX: Use gsap.matchMedia() instead of manual window resize listeners
  let mm = gsap.matchMedia();

  // --- DESKTOP BEHAVIOR (> 1000px) ---
  mm.add("(min-width: 1001px)", () => {
    
    // Intro Animation
    if (steps.length > 0) {
      gsap.fromTo(steps, 
        { opacity: 0, x: -40 },
        { 
          opacity: 1, x: 0, duration: 0.3, stagger: -0.1, ease: "none",
          scrollTrigger: {
            trigger: stepsWrap,
            start: "top 75%",
            once: true
          }
        }
      );
    }

    // Main Pinning (with anticipatePin for mid-page stability)
    ScrollTrigger.create({
      trigger: container,
      start: "top top", 
      endTrigger: cards,
      end: "bottom bottom",
      pin: header,
      pinSpacing: false,
      anticipatePin: 1 // Crucial: Prevents layout jumps when pinning mid-page
    });

    // Card Step Triggers
    cardElements.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
        onLeave: () => {
          if (index < cardElements.length - 1) setActiveStep(index + 1);
        },
        onLeaveBack: () => {
          if (index > 0) setActiveStep(index - 1);
        },
      });
    });

    // Note: matchMedia automatically cleans up all these triggers if the screen shrinks!
  });

  // --- MOBILE BEHAVIOR (<= 1000px) ---
  mm.add("(max-width: 1000px)", () => {
    
    // Just run the intro animation, no pinning or active step tracking
    if (steps.length > 0) {
      gsap.fromTo(steps, 
        { opacity: 0, x: -40 },
        { 
          opacity: 1, x: 0, duration: 0.3, stagger: -0.1, ease: "none",
          scrollTrigger: {
            trigger: stepsWrap,
            start: "top 75%",
            once: true
          }
        }
      );
    }
  });

});