function renderTree(data, container) {
  const ul = document.createElement("ul");
  for (const key in data) {
    const li = document.createElement("li");
    li.textContent = key;
    if (data[key].enfants) {
      renderTree(data[key].enfants, li);
    } else if (Array.isArray(data[key])) {
      const subUl = document.createElement("ul");
      data[key].forEach(item => {
        const subLi = document.createElement("li");
        subLi.textContent = item;
        subUl.appendChild(subLi);
      });
      li.appendChild(subUl);
    }
    ul.appendChild(li);
  }
  container.appendChild(ul);
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("veilleTree");
  renderTree(veilleData, container);
});
