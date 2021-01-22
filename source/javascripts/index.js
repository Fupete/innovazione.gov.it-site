import Swiper from "swiper/bundle";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-select/js/bootstrap-select.js";
import "bootstrap-italia/src/js/plugins/dropdown";
import "bootstrap-italia/src/js/plugins/navbar";
import "bootstrap-italia/src/js/plugins/sticky-header";
import "lazysizes";
import "focus-visible/src/focus-visible.js"

const progressIndicator = require("progress-indicator.js");
const DatoCmsSearch = require("datocms-search.widget.js");

if ($(".swiper-container").length > 0) {
  //some-slider-wrap-in
  let swiperInstances = [];
  $(".swiper-container").each(function (index, element) {
    //some-slider-wrap-in
    const $this = $(this);
    $this.addClass("instance-" + index); //instance need to be unique (ex: some-slider)
    $this
      .parent()
      .find(".swiper-pagination")
      .addClass("pagination-" + index);
    $this
      .parent()
      .find(".swiper-button-prev")
      .addClass("prev-" + index); //prev must be unique (ex: some-slider-prev)
    $this
      .parent()
      .find(".swiper-button-next")
      .addClass("next-" + index); //next must be unique (ex: some-slider-next)
    swiperInstances[index] = new Swiper(".instance-" + index, {
      //instance need to be unique (ex: some-slider)
      // your settings ...
      preloadImages: false,
      lazy: true,
      navigation: {
        prevEl: ".prev-" + index, //prev must be unique (ex: some-slider-prev)
        nextEl: ".next-" + index, //next must be unique (ex: some-slider-next)
      },
      pagination: {
        el: ".pagination-" + index,
        type: "bullets",
        clickable: true,
      },
    });
  });

  //or all of them
  setTimeout(function () {
    for (const slider of swiperInstances) {
      slider.update();
    }
  }, 50);
}

const searchClient = new DatoCmsSearch(
  "7bc02ea800b5526cd655912c1b6cfa",
  "production"
);

const initSearch = () => {
  if (searchClient === null) {
    return null;
  }
  return searchClient.addWidget("#search-container", {
    initialLocale: $("html").attr("lang"),
  });
};

initSearch();
unfocus();
progressIndicator.updateProgress()
window.onscroll = function() {progressIndicator.updateProgress()};
