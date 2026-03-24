function askAI() {
  const input = document.getElementById("ai-input").value.toLowerCase().trim();
  const output = document.getElementById("ai-output");

  const graph = {
    "hebûn": ["zanabûn"],
    "hebun": ["zanabûn"],
    "zanabûn": ["mabûn"],
    "zanabun": ["mabûn"],
    "mabûn": ["rasterast"],
    "mabun": ["rasterast"],
    "rasterast": ["zanistarast"],
    "zanistarast": ["civilization"],
    "truth": ["civilization"],
    "structure": ["civilization"],
    "consistency": ["civilization"],
    "civilization": ["produced by zanistarast", "stabilized by truth", "supported by structure", "ordered by consistency"]
  };

  if (!input) {
    output.innerHTML = "<strong>Answer:</strong> Please enter a question or keyword.";
    return;
  }

  if (graph[input]) {
    output.innerHTML = "<strong>Answer:</strong> " + input + " → " + graph[input].join(", ");
  } else {
    output.innerHTML = "<strong>Answer:</strong> No relation found.";
  }
}

