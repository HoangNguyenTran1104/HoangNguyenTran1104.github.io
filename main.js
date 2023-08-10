import PhotoSwipeLightbox from './photoswipe/dist/photoswipe-lightbox.esm.js';

// if(window.innerWidth < 1220){
//   alert("Em chưa responsive màn hình <1200! Thông cảm giúp em 😟")
// }


/** Typing Animation */
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

/** Typing Animation */


/** Gallery */
const lightbox = new PhotoSwipeLightbox({
  gallery: '#my-gallery',
  children: 'a',
  mainClass: 'pswp--custom-bg',
  bgOpacity: 1,
  pswpModule: () => import('./photoswipe/dist/photoswipe.esm.js'),
  pinchToClose: true
});
lightbox.init();

/** Gallery */

/** Animation */
function scrollTrigger(selector, options = {}){
  let els = document.querySelectorAll(selector)
  els = Array.from(els)
  els.forEach(el => {
      addObserver(el, options)
  })
}

function addObserver(el, options){
  if(!('IntersectionObserver' in window)){
      if(options.cb){
          options.cb(el)
      }else{
          entry.target.classList.add('active')
      }
      return
  }
  let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elemts list and the observer instance
      entries.forEach(entry => {
          if(entry.isIntersecting){
              if(options.cb){
                  options.cb(el)
              }else{
                  entry.target.classList.add('active')
              }
              observer.unobserve(entry.target)
          }
      })
  }, options)
  observer.observe(el)
}
// Example usages:
scrollTrigger('.intro-text')

scrollTrigger('.scroll-reveal', {
  rootMargin: '-200px',
})

scrollTrigger('.loader', {
  rootMargin: '-200px',
  cb: function(el){
      el.innerText = 'Loading...'
      setTimeout(() => {
          el.innerText = 'Task Complete!'
      }, 1000)
  }
})
/** Animation */