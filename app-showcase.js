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

  // Click-to-play videos with transparent play button overlay
  document.querySelectorAll("video").forEach(function(video){
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("preload", "metadata");

    // Create play button overlay
    var wrapper = video.parentElement;
    wrapper.style.position = "relative";

    var playBtn = document.createElement("div");
    playBtn.className = "video-play-btn";
    playBtn.style.cssText = [
      "position:absolute",
      "top:50%",
      "left:50%",
      "transform:translate(-50%, -50%)",
      "width:64px",
      "height:64px",
      "border-radius:50%",
      "background:rgba(255, 255, 255, 0.75)",
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "cursor:pointer",
      "transition:all 0.3s ease",
      "backdrop-filter:blur(4px)",
      "z-index:10",
      "pointer-events:auto"
    ].join(";");

    var playIcon = document.createElement("div");
    playIcon.style.cssText = [
      "width:0",
      "height:0",
      "border-left:22px solid rgba(0,0,0,0.6)",
      "border-top:14px solid transparent",
      "border-bottom:14px solid transparent",
      "margin-left:4px"
    ].join(";");
    playBtn.appendChild(playIcon);

    wrapper.appendChild(playBtn);

    // Toggle play on click
    function togglePlay(e) {
      e.stopPropagation();
      if (video.paused) {
        video.play().then(function(){
          playBtn.style.opacity = "0";
          playBtn.style.pointerEvents = "none";
        }).catch(function(){});
      } else {
        video.pause();
        playBtn.style.opacity = "1";
        playBtn.style.pointerEvents = "auto";
      }
    }

    video.addEventListener("click", togglePlay);
    playBtn.addEventListener("click", togglePlay);

    // Show play button when video pauses
    video.addEventListener("pause", function(){
      playBtn.style.opacity = "1";
      playBtn.style.pointerEvents = "auto";
    });

    // Hide play button when playing
    video.addEventListener("play", function(){
      playBtn.style.opacity = "0";
      playBtn.style.pointerEvents = "none";
    });

    // Hover effect on desktop
    playBtn.addEventListener("mouseenter", function(){
      playBtn.style.transform = "translate(-50%, -50%) scale(1.1)";
      playBtn.style.background = "rgba(255, 255, 255, 0.9)";
    });
    playBtn.addEventListener("mouseleave", function(){
      playBtn.style.transform = "translate(-50%, -50%) scale(1)";
      playBtn.style.background = "rgba(255, 255, 255, 0.75)";
    });
  });
})();
