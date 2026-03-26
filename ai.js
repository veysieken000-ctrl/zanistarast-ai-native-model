function typeText(element, htmlPrefix, text, speed = 18) {
  let i = 0;
  element.innerHTML = htmlPrefix;

  function step() {
    if (i < text.length) {
      element.innerHTML = htmlPrefix + text.slice(0, i + 1);
      i++;
      setTimeout(step, speed);
    }
  }

  step();
}

function askAI() {
  const input = document.getElementById("ai-input").value.toLowerCase().trim();
  const output = document.getElementById("ai-output");
  const loading = document.getElementById("ai-loading");

  const answers = {
    "civilization": "Civilization is produced by Zanistarast and stabilized by truth, structure, and consistency.",
    "medeniyet": "Medeniyet, Zanistarast içinde hakikat, yapı ve tutarlılık ile kurulan düzenli sistemik üretimdir.",
    "truth": "Truth stabilizes civilization and anchors legitimacy in the system.",
    "gerçek": "Gerçek, sistemin doğrulanabilir temelini oluşturur ve yapıyı sabitler.",
    "structure": "Structure supports civilization by organizing relations and preventing collapse.",
    "yapı": "Yapı, ilişkileri düzenler, dağılmayı önler ve sistemin taşıyıcı iskeletini kurar.",
    "consistency": "Consistency orders the system and reduces contradiction.",
    "tutarlılık": "Tutarlılık, çelişkiyi azaltır ve sistemin doğrulama katmanını güçlendirir.",
    "zanistarast": "Zanistarast is a layered, falsifiable structural framework that models recurring patterns across natural, computational, and human systems.",
    "rasterast": "Rasterast filters distortion and prepares the system for synthesis.",
    "mabûn": "Mabûn stabilizes structural-economic order through responsibility.",
    "mabun": "Mabûn stabilizes structural-economic order through responsibility.",
    "zanabûn": "Zanabûn validates knowledge and connects being to structured understanding.",
    "zanabun": "Zanabûn validates knowledge and connects being to structured understanding.",
    "hebûn": "Hebûn grounds the system ontologically and makes higher layers possible.",
    "hebun": "Hebûn grounds the system ontologically and makes higher layers possible."
  };

  if (input === "") {
    output.innerHTML = "<strong>Answer:</strong> Please enter a question or keyword.";
    return;
  }

  loading.style.display = "flex";
  output.innerHTML = "<strong>Answer:</strong> ";

  let finalAnswer = answers[input];

  if (!finalAnswer) {
    finalAnswer = "No interpretation found in the current Zanistarast system.";
  }

  setTimeout(() => {
    loading.style.display = "none";
    typeText(output, "<strong>Answer:</strong> ", finalAnswer, 18);
  }, 900);
}
