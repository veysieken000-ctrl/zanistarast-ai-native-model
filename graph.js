const nodes = [
  {
    id: "Hebun",
    x: 120,
    y: 180,
    label: "Hebûn",
    description: "Ontological foundation of the system.",
    role: "Grounds all higher layers.",
    func: "Defines existence constraints.",
    formula: "Existence → Constraint → Structure"
  },
  {
    id: "Zanabun",
    x: 300,
    y: 180,
    label: "Zanabûn",
    description: "Epistemic validation layer.",
    role: "Validates knowledge claims.",
    func: "Filters knowledge through structure.",
    formula: "Knowledge → Validation → Coherence"
  },
  {
    id: "Mabun",
    x: 480,
    y: 180,
    label: "Mabûn",
    description: "Structural-economic balance layer.",
    role: "Stabilizes responsibility-based systems.",
    func: "Balances responsibility and entropy.",
    formula: "Stability = f(Responsibility, Order)"
  },
  {
    id: "Rasterast",
    x: 660,
    y: 180,
    label: "Rasterast",
    description: "Consistency filtering method.",
    role: "Filters distortion and bias.",
    func: "Removes invalid structures.",
    formula: "Input → Filter → Valid Output"
  },
  {
    id: "Zanistarast",
    x: 840,
    y: 180,
    label: "Zanistarast",
    description: "Synthesis layer of the framework.",
    role: "Integrates all coherent lower layers.",
    func: "Builds unified system logic.",
    formula: "Integration → Coherence → System"
  },
  {
    id: "Civilization",
    x: 1020,
    y: 180,
    label: "Civilization",
    description: "Output of structured systems.",
    role: "Represents stable system result.",
    func: "Embeds knowledge into reality.",
    formula: "Structure → Stability → Civilization"
  },
  {
    id: "Truth",
    x: 250,
    y: 360,
    label: "Truth",
    description: "Primary governing principle.",
    role: "Anchors legitimacy.",
    func: "Constrains system behavior.",
    formula: "Truth → Constraint → Order"
  },
  {
    id: "Structure",
    x: 500,
    y: 360,
    label: "Structure",
    description: "Structural principle.",
    role: "Supports system stability.",
    func: "Organizes relations.",
    formula: "Structure → Relation → Stability"
  },
  {
    id: "Consistency",
    x: 750,
    y: 360,
    label: "Consistency",
    description: "Coherence principle.",
    role: "Ensures system continuity.",
    func: "Eliminates contradictions.",
    formula: "Consistency → Order → Continuity"
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

  g.addEventListener("click", function () {
    const outgoing = edges.filter(function (e) { return e.from === node.id; });
    const incoming = edges.filter(function (e) { return e.to === node.id; });

    const outgoingText = outgoing.length
      ? outgoing.map(function (e) { return e.label + " → " + e.to; }).join(", ")
      : "None";

    const incomingText = incoming.length
      ? incoming.map(function (e) { return e.from + " → " + e.label; }).join(", ")
      : "None";

    details.innerHTML =
      "<h3>" + node.label + "</h3>" +
      "<p><strong>Description:</strong> " + node.description + "</p>" +
      "<p><strong>Role:</strong> " + node.role + "</p>" +
      "<p><strong>Function:</strong> " + node.func + "</p>" +
      "<p><strong>Formula:</strong> " + node.formula + "</p>" +
      "<p><strong>Outgoing:</strong> " + outgoingText + "</p>" +
      "<p><strong>Incoming:</strong> " + incomingText + "</p>";
  });

  svg.appendChild(g);
}

edges.forEach(function (edge) {
  const fromNode = nodes.find(function (n) { return n.id === edge.from; });
  const toNode = nodes.find(function (n) { return n.id === edge.to; });
  drawLine(fromNode.x, fromNode.y, toNode.x, toNode.y, edge.label);
});

nodes.forEach(drawNode);

function runQuery() {
  const input = document.getElementById("query-input").value.toLowerCase();
  const resultDiv = document.getElementById("query-result");

  let result = "No result.";

  edges.forEach(function(edge) {
    if (input.includes(edge.to.toLowerCase())) {
      result = edge.from + " → " + edge.label + " → " + edge.to;
    }
  });

  resultDiv.innerHTML = "<strong>Result:</strong> " + result;
}

