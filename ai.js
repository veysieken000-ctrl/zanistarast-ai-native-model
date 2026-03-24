function askAI() {
  var input = document.getElementById("ai-input").value.toLowerCase().trim();
  var output = document.getElementById("ai-output");

  var answers = {
    "civilization": "Civilization is produced by Zanistarast and stabilized by truth, structure, and consistency.",
    "truth": "Truth stabilizes civilization and anchors legitimacy in the system.",
    "structure": "Structure supports civilization by organizing relations and preventing collapse.",
    "consistency": "Consistency orders the system and reduces contradiction.",
    "zanistarast": "Zanistarast is the synthesis layer that produces civilization from coherent lower layers.",
    "rasterast": "Rasterast filters distortion and prepares the system for synthesis.",
    "mabun": "Mabûn stabilizes structural-economic order through responsibility.",
    "mabûn": "Mabûn stabilizes structural-economic order through responsibility.",
    "zanabun": "Zanabûn validates knowledge and connects being to structured understanding.",
    "zanabûn": "Zanabûn validates knowledge and connects being to structured understanding.",
    "hebun": "Hebûn grounds the system ontologically and makes higher layers possible.",
    "hebûn": "Hebûn grounds the system ontologically and makes higher layers possible."
  };

  if (input === "") {
    output.innerHTML = "<strong>Answer:</strong> Please enter a question or keyword.";
    return;
  }

  if (answers[input]) {
    output.innerHTML = "<strong>Answer:</strong> " + answers[input];
  } else {
    output.innerHTML = "<strong>Answer:</strong> No interpretation found in the current system.";
  }
}

