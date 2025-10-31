$(document).ready(function () {
  const $toggle = $("#language-toggle");
  const $thumb = $toggle.find(".toggle-thumb");
  const $flagES = $(".flag-es");
  const $flagEN = $(".flag-en");

  function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    return userLang.startsWith("es") ? "es" : "en";
  }

  function setLanguage(lang) {

    // 1. Aplica fade-out a los textos traducibles
    const $elements = $("[data-text]");
    $elements.addClass("hidden");

    // 2. Espera a que termine la animación (300ms) antes de cambiar el contenido
    setTimeout(() => {
      $.getJSON(`assets/lang/${lang}.json`, function (translations) {

        $elements.each(function () {
          const key = $(this).data("text");
          $(this).html(translations[key]);
        });

        // 3. Fade-in
        $elements.removeClass("hidden");
      });
    }, 300);

    // 🟢 Animación del toggle (lo que ya tenías)
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

  $toggle.click(function () {
    lang = (lang === "en") ? "es" : "en";
    setLanguage(lang);
  });
});
