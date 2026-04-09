(() => {
  const API_URL = "https://zanistarast-ai-server.onrender.com/api/ask";

  async function askQuestion(question) {
    const cleanQuestion = String(question || "").trim();

    if (!cleanQuestion) {
      throw new Error("Question is empty");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: cleanQuestion })
    });

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const data = await response.json();
    return data;
  }

  window.AIRequest = {
    askQuestion
  };
})();

