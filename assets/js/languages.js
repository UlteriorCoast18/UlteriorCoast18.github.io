$(document).ready(function() {
  const $toggle = $("#language-toggle");
  const $thumb = $toggle.find(".toggle-thumb");
  const $flagES = $(".flag-es");
  const $flagEN = $(".flag-en");

  function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    return userLang.startsWith("es") ? "es" : "en";
  }

  function setLanguage(lang) {
    $.getJSON(`assets/lang/${lang}.json`, function(translations) {
      $("[data-text]").each(function() {
        const key = $(this).data("text");
        $(this).html(translations[key]);
      });
    });

    if (lang === "es") {
      $thumb.css("left", "6px");
      $flagES.removeClass("flag-inactive");
      $flagEN.addClass("flag-inactive");
    } else {
      $thumb.css("left", "60px");
      $flagEN.removeClass("flag-inactive");
      $flagES.addClass("flag-inactive");
    }
  }

  let lang = detectLanguage();
  setLanguage(lang);

  $toggle.click(function() {
    lang = (lang === "en") ? "es" : "en";
    setLanguage(lang);
  });
});