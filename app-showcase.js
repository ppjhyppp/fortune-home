(function(){
  var header = document.getElementById("header");
  window.addEventListener("scroll", function(){
    if(window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  var menuToggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
  if (menuToggle) {
    menuToggle.addEventListener("click", function(){
      menuToggle.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        menuToggle.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
      }
    });
  }, {threshold:0.1, rootMargin:"0px 0px -60px 0px"});

  document.querySelectorAll(".reveal").forEach(function(el){
    observer.observe(el);
  });

  // Autoplay all muted videos when visible (works on both desktop and mobile)
  var videoObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      var video = entry.target;
      if(entry.isIntersecting) {
        video.play().catch(function(){});
      } else {
        video.pause();
      }
    });
  }, {threshold:0.3});

  document.querySelectorAll("video").forEach(function(video){
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    videoObserver.observe(video);
  });
})();
