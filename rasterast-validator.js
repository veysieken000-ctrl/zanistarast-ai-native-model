function rasterastValidator(article) {

  const warnings = [];

  if (article.length < 300) {
    warnings.push("Makale çok kısa.");
  }

  if (article.includes("gizlice")) {
    warnings.push("Manipülasyon riski.");
  }

  if (article.includes("kesin olarak")) {
    warnings.push("Gerekçesiz kesin hüküm.");
  }

  if (article.includes("her zaman")) {
    warnings.push("Aşırı genelleme.");
  }

  return {
    valid: warnings.length === 0,
    warnings
  };
}
