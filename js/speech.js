// Compatibility helper for pages that import js/speech.js.
// Live Mira answers use the same status-aware /api/ask endpoint as speech.html.
async function sendMessage(question, options = {}) {
    const configuredApiBase =
        document.querySelector('meta[name="zanistarast-api-base"]')?.content?.trim();
    const apiBase = configuredApiBase || document.baseURI;
    const language =
        options.language ||
        document.getElementById("languageSelect")?.value ||
        "tr-TR";

    const response = await fetch(new URL("api/ask", apiBase), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: String(question || "").trim(), language })
    });

    let data = {};
    try { data = await response.json(); } catch {}

    if (!response.ok) {
        throw new Error(data.answer || data.error || "Mira API request failed.");
    }

    return data;
}
