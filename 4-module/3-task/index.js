function highlight(table) {
  let rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    let row = rows[i];
    let status = row.cells[3].getAttribute("data-available");

    if (status === "true") {
      row.classList.add("available");
    } else if (status === "false") {
      row.classList.add("unavailable");
    }

    if (!row.cells[3].hasAttribute("data-available")) {
      row.hidden = true;
    }

    let gender = row.cells[2].textContent;

    if (gender === "m") {
      row.classList.add("male");
    } else if (gender === "f") {
      row.classList.add("female");
    }

    let age = parseInt(row.cells[1].textContent);

    if (age < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}