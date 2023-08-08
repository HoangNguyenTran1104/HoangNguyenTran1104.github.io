import PhotoSwipeLightbox from './photoswipe/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#my-gallery',
  children: 'a',
  mainClass: 'pswp--custom-bg',
  bgOpacity: 1,
  pswpModule: () => import('./photoswipe/dist/photoswipe.esm.js'),
  pinchToClose: true
});
lightbox.init();

// if(window.innerWidth < 1220){
//   alert("Em chưa responsive màn hình <1200! Thông cảm giúp em 😟")
// }