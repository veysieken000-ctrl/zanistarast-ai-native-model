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

async function askAI() {
  const input = document.getElementById("ai-input").value.trim();
  const output = document.getElementById("ai-output");
  const loading = document.getElementById("ai-loading");

  if (!input) {
    output.innerHTML = "<strong>Answer:</strong> Please enter a question.";
    return;
  }

  loading.style.display = "flex";
  output.innerHTML = "<strong>Answer:</strong> ";

  try {
    const response = await fetch("http://localhost:3000/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: input
      })
    });

    const data = await response.json();

    loading.style.display = "none";

    typeText(
      output,
      "<strong>Answer:</strong> ",
      data.answer || "No response from server.",
      18
    );

  } catch (error) {
    loading.style.display = "none";

    output.innerHTML =
      "<strong>Answer:</strong> Connection error. Backend not reachable.";
  }
}

// Enter ile gönderme
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("ai-input");

  if (input) {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        askAI();
      }
    });
  }
});




