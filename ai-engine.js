function zanistarastEngine(question) {
  const ctx = classifyQuestion(question);

  const parts = {
    hebun: hebunAnalysis(ctx),
    zanabun: zanabunAnalysis(ctx),
    mabun: mabunAnalysis(ctx),
    rabun: rabunAnalysis(ctx),
    rasterast: rasterastValidation(ctx),
    newroza: newrozaImpact(ctx)
  };

  const article = generateArticle(ctx, parts);

const validation =
  rasterastValidator(article);

if (!validation.valid) {

  return `
  <article>

  <h2>Rasterast Uyarısı</h2>

  <p>
  ${validation.warnings.join("<br>")}
  </p>

  ${article}

  </article>
  `;
}

return article;

}
