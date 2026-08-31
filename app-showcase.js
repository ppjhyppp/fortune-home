(function(){
  var IMG_API = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image";
  var queue = [];
  var active = 0;
  var MAX_CONCURRENT = 3;

  function loadNext() {
    while (active < MAX_CONCURRENT && queue.length > 0) {
      var item = queue.shift();
      active++;
      var img = new Image();
      img.onload = function() {
        item.el.src = img.src;
        item.el.classList.add("loaded");
        active--;
        loadNext();
      };
      img.onerror = function() {
        active--;
        setTimeout(loadNext, 500);
      };
      img.src = IMG_API + "?prompt=" + encodeURIComponent(item.prompt) + "&image_size=" + item.size;
    }
  }

  var lazyEls = document.querySelectorAll("img[data-img]");
  if ("IntersectionObserver" in window) {
    var imgIO = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          queue.push({el: el, prompt: el.dataset.img, size: "square_hd"});
          imgIO.unobserve(el);
          loadNext();
        }
      });
    }, {rootMargin: "200px"});
    lazyEls.forEach(function(el) { imgIO.observe(el); });
  } else {
    lazyEls.forEach(function(el) {
      queue.push({el: el, prompt: el.dataset.img, size: "square_hd"});
    });
    loadNext();
  }

  var header = document.getElementById("header");
  window.addEventListener("scroll", function(){
    if(window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  var menuToggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
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

  document.querySelectorAll(".app-tabs").forEach(function(tabs){
    tabs.querySelectorAll(".app-tab").forEach(function(tab){
      tab.addEventListener("click", function(){
        tabs.querySelectorAll(".app-tab").forEach(function(t){t.classList.remove("active")});
        tab.classList.add("active");
      });
    });
  });
  document.querySelectorAll(".app-pills").forEach(function(pills){
    pills.querySelectorAll(".app-pill").forEach(function(pill){
      pill.addEventListener("click", function(){
        pills.querySelectorAll(".app-pill").forEach(function(p){p.classList.remove("active")});
        pill.classList.add("active");
      });
    });
  });
  document.querySelectorAll(".app-pd-tabs").forEach(function(tabs){
    tabs.querySelectorAll(".app-pd-tab").forEach(function(tab){
      tab.addEventListener("click", function(){
        tabs.querySelectorAll(".app-pd-tab").forEach(function(t){t.classList.remove("active")});
        tab.classList.add("active");
      });
    });
  });
  document.querySelectorAll(".app-sortbar").forEach(function(bar){
    bar.querySelectorAll(".app-sort-item").forEach(function(item){
      item.addEventListener("click", function(){
        bar.querySelectorAll(".app-sort-item").forEach(function(i){i.classList.remove("active")});
        item.classList.add("active");
      });
    });
  });
  document.querySelectorAll(".app-tabbar").forEach(function(bar){
    bar.querySelectorAll(".app-tabbar-item").forEach(function(item){
      item.addEventListener("click", function(){
        bar.querySelectorAll(".app-tabbar-item").forEach(function(i){i.classList.remove("active")});
        item.classList.add("active");
      });
    });
  });
})();

// ===== Inspiration page click-to-detail interaction =====
window.toggleInspDetail = function(el) {
  var detail = el.parentElement.querySelector('.insp-detail-screen');
  if (detail) {
    el.style.display = 'none';
    detail.style.display = 'block';
  }
};
window.closeInspDetail = function(el) {
  var detailScreen = el.closest('.insp-detail-screen');
  var inspScreen = detailScreen.parentElement.querySelector('.insp-screen');
  if (detailScreen && inspScreen) {
    detailScreen.style.display = 'none';
    inspScreen.style.display = 'block';
  }
};
// Show click hint on hover + autoplay video for inspiration screens
document.querySelectorAll('.insp-screen').forEach(function(screen) {
  var video = screen.querySelector('.insp-video');
  screen.addEventListener('mouseenter', function() {
    if (video) video.play().catch(function(){});
  });
  screen.addEventListener('mouseleave', function() {
    if (video) { video.pause(); video.currentTime = 0; }
  });
});
// Daily tips video: hover to play, show first frame when not hovering
document.querySelectorAll('.daily-tips-video').forEach(function(video) {
  var card = video.closest('.screen-card');
  if (!card) return;
  card.addEventListener('mouseenter', function() {
    video.play().catch(function(){});
  });
  card.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
  });
});
// Browse video: hover to play, show first frame when not hovering
document.querySelectorAll('.browse-video').forEach(function(video) {
  var card = video.closest('.screen-card');
  if (!card) return;
  card.addEventListener('mouseenter', function() {
    video.play().catch(function(){});
  });
  card.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
  });
});
// Member detail video: hover to play, show first frame when not hovering
document.querySelectorAll('.member-video').forEach(function(video) {
  var card = video.closest('.screen-card');
  if (!card) return;
  card.addEventListener('mouseenter', function() {
    video.play().catch(function(){});
  });
  card.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
  });
});
// Inspiration detail video: hover to play, show first frame when not hovering
document.querySelectorAll('.insp-detail-video').forEach(function(video) {
  var card = video.closest('.screen-card');
  if (!card) return;
  card.addEventListener('mouseenter', function() {
    video.play().catch(function(){});
  });
  card.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
  });
});
