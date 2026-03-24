function askAI() {
  const input = document.getElementById("ai-input").value.toLowerCase();
  const output = document.getElementById("ai-output");

  let answer = "No answer.";

  if (input.includes("civilization")) {
    answer = "Zanistarast produces Civilization. Truth stabilizes it.";
  }

  if (input.includes("truth")) {
    answer = "Truth anchors legitimacy and constrains system behavior.";
  }

  if (input.includes("structure")) {
    answer = "Structure organizes relations and supports stability.";
  }

  if (input.includes("consistency")) {
    answer = "Consistency ensures continuity and removes contradictions.";
  }

  output.innerHTML = "<strong>Answer:</strong> " + answer;
}

