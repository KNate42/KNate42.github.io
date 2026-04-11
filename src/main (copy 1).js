// ── Переключатель языка
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('lang-toggle');
  const langLabel = document.getElementById('lang-label');
  let currentLang = 'en';

  function applyLang(lang) {
    document.querySelectorAll('[data-en]').forEach((el) => {
      el.textContent = el.dataset[lang];
    });
    document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';
    langLabel.textContent = lang === 'en' ? 'RU' : 'EN';
    currentLang = lang;
  }

  toggleBtn.addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'ru' : 'en');
  });
});
