function filterByTag(tag) {
  const cards = document.querySelectorAll("[data-tags]");

  cards.forEach(function (card) {
    const tags = card.getAttribute("data-tags") || "";

    if (tag === "Tümü" || tags.includes(tag)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  localStorage.setItem("zanistarast_active_tag", tag);
}

window.filterByTag = filterByTag;
