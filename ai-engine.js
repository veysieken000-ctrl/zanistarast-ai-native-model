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

  return generateArticle(ctx, parts);
}
