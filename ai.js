function askAI() {
    const input = document.getElementById("question").value.toLowerCase();
    const output = document.getElementById("answer");

    const graph = {
        "hebûn": ["zanabûn"],
        "zanabûn": ["mabûn"],
        "mabûn": ["rasterast"],
        "rasterast": ["zanistarast"],
        "zanistarast": ["civilization"],
        "truth": ["civilization"],
        "structure": ["civilization"],
        "consistency": ["civilization"]
    };

    if (graph[input]) {
        const result = graph[input].join(", ");
        output.innerText = input + " → " + result;
    } else {
        output.innerText = "No relation found.";
    }
}

