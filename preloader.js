document.addEventListener("DOMContentLoaded", () => {

  gsap.set(".revealer svg", { scale: 0 });

  // 1. Start immediately at 0, then stagger by 0.5s
  const delays = [0, 0.5, 1]; 
  
  document.querySelectorAll(".revealer svg").forEach((el, i) => {
    gsap.to(el, {
      scale: 45,
      duration: 1.5,
      ease: "power4.inOut",
      delay: delays[i],
      onComplete: () => {
        if (i === delays.length - 1) {
          const loader = document.querySelector(".loader");
          if(loader) {
            loader.remove();
          }
        }
      },
    });
  });

  // 2. Shifted these forward by 2.5s (originally 4.5)
  gsap.to(".toggle-btn, .logo, .shiny-cta", {
        scale: 1,
        duration: 1,
        ease: "power4.inOut",
        delay: 2, 
      });

  gsap.to(".hero .content h1", {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: "power4.inOut",
        delay: 2,
      });
});