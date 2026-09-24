/**
 * Zanistarast Formal Client
 * Connects Website to the formal-system inspection API.
 * IMPORTANT: a successful formal-system response is not scientific proof,
 * canonical authority, or Rasterast approval. Live Mira answers remain
 * status-aware through /api/ask.
 */

async function verifyWithZanistarast(payload) {

    const response = await fetch("/api/formal/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error("Formal verification request failed.");
    }

    const result = await response.json();

    return {
        ...result,
        epistemic_notice:
            "Formal-system verification is a technical/formal result only; it does not confer scientific proof, canonical authority, or Rasterast approval."
    };
}

window.verifyWithZanistarast =
    verifyWithZanistarast;


