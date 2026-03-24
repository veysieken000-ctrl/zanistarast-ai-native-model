const nodes = [
  {
    id: "Hebun",
    x: 120,
    y: 180,
    label: "Hebûn",
    description: "Ontological foundation of the system.",
    role: "Grounds all higher layers."
  },
  {
    id: "Zanabun",
    x: 300,
    y: 180,
    label: "Zanabûn",
    description: "Epistemic validation layer.",
    role: "Validates knowledge claims through structure."
  },
  {
    id: "Mabun",
    x: 480,
    y: 180,
    label: "Mabûn",
    description: "Structural-economic balance layer.",
    role: "Stabilizes responsibility-based order."
  },
  {
    id: "Rasterast",
    x: 660,
    y: 180,
    label: "Rasterast",
    description: "Consistency filtering method.",
    role: "Filters distortion, bias, and invalid claims."
  },
  {
    id: "Zanistarast",
    x: 840,
    y: 180,
    label: "Zanistarast",
    description: "Synthesis layer of the framework.",
    role: "Integrates all coherent lower layers."
  },
  {
    id: "Civilization",
    x: 1020,
    y: 180,
    label: "Civilization",
    description: "Civilizational output of structural coherence.",
    role: "Represents stable integrated system output."
  },
  {
    id: "Truth",
    x: 250,
    y: 360,
    label: "Truth",
    description: "Primary governing principle.",
    role: "Constrains power and anchors legitimacy."
  },
  {
    id: "Structure",
    x: 500,
    y: 360,
    label: "Structure",
    description: "Structural principle of the model.",
    role: "Supports order and blocks narrative drift."
  },
  {
    id: "Consistency",
    x: 750,
    y: 360,
    label: "Consistency",
    description: "Coherence principle.",
    role: "Orders the system and filters noise."
  }
];

const edges = [
  { from: "Hebun", to: "Zanabun", label: "grounds" },
  { from: "Zanabun", to: "Mabun", label: "informs" },
  { from: "Mabun", to: "Rasterast", label: "feeds" },
  { from: "Rasterast", to: "Zanistarast", label: "filters" },
  { from: "Zanistarast", to: "Civilization", label: "produces" },

  { from: "Truth", to: "Civilization", label: "stabilizes" },
  { from: "Structure", to: "Civilization", label: "supports" },
  { from: "Consistency", to: "Civilization", label: "orders" }
];

const svg = document.getElementById("graph-svg");
const details = document.getElementById("graph-details");

function drawLine(x1, y1, x2, y2, label) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#666");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - 8;

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", midX);
  text.setAttribute("y", midY);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "#444");
  text.setAttribute("font-size", "12");
  text.textContent = label;
  svg.appendChild(text);
}

function drawNode(node) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.style.cursor = "pointer";

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", node.x - 55);
  rect.setAttribute("y", node.y - 22);
  rect.setAttribute("width", "110");
  rect.setAttribute("height", "44");
  rect.setAttribute("rx", "8");
  rect.setAttribute("fill", "#111");
  rect.setAttribute("stroke", "#222");

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", node.x);
  text.setAttribute("y", node.y + 5);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "white");
  text.setAttribute("font-size", "14");
  text.textContent = node.label;

  g.appendChild(rect);
  g.appendChild(text);

  g.addEventListener("click", () => {
    const outgoing = edges.filter(e => e.from === node.id);
    const incoming = edges.filter(e => e.to === node.id);

    details.innerHTML = `
      <h3>${node.label}</h3>
      <p><strong>Description:</strong> ${node.description}</p>
      <p><strong>Role:</strong> ${node.role}</p>
      <p><strong>Outgoing:</strong> ${outgoing.length ? outgoing.map(e => `${e.label} → ${e.to}`).join(", ") : "None"}</p>
      <p><strong>Incoming:</strong> ${incoming.length ? incoming.map(e => `${e.from} → ${e.label}`).join(", ") : "None"}</p>
    `;
  });

  svg.appendChild(g);
}

edges.forEach(edge => {
  const fromNode = nodes.find(n => n.id === edge.from);
  const toNode = nodes.find(n => n.id === edge.to);
  drawLine(fromNode.x, fromNode.y, toNode.x, toNode.y, edge.label);
});

nodes.forEach(drawNode);

