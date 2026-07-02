/**
 * Zanistarast Formal Client
 * Connects Website to AI Native Model formal verification API
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

    return await response.json();
}

window.verifyWithZanistarast =
    verifyWithZanistarast;


