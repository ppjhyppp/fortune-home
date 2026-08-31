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

  function enqueue(el, prompt, size) {
    queue.push({el: el, prompt: prompt, size: size});
  }

  var lazyEls = document.querySelectorAll("img[data-img], [data-bg]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          if (el.tagName === "IMG" && el.dataset.img) {
            enqueue(el, el.dataset.img, "square_hd");
          } else if (el.dataset.bg) {
            (function(el, prompt) {
              var img = new Image();
              img.onload = function() {
                el.style.backgroundImage = "url('" + img.src + "')";
                el.classList.add("bg-loaded");
              };
              img.src = IMG_API + "?prompt=" + encodeURIComponent(prompt) + "&image_size=landscape_16_9";
            })(el, el.dataset.bg);
          }
          io.unobserve(el);
          loadNext();
        }
      });
    }, {rootMargin: "200px"});
    lazyEls.forEach(function(el) { io.observe(el); });
  } else {
    lazyEls.forEach(function(el) {
      if (el.tagName === "IMG" && el.dataset.img) {
        enqueue(el, el.dataset.img, "square_hd");
      } else if (el.dataset.bg) {
        el.style.backgroundImage = "url('" + IMG_API + "?prompt=" + encodeURIComponent(el.dataset.bg) + "&image_size=landscape_16_9')";
      }
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

  var heroBg = document.querySelector(".hero-bg");
  if(heroBg){
    window.addEventListener("scroll", function(){
      var scrollY = window.scrollY;
      if(scrollY < window.innerHeight){
        heroBg.style.transform = "scale(1.05) translateY(" + (scrollY * 0.3) + "px)";
      }
    });
  }
})();
