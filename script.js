document
  .getElementById("parkingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const carPlate = document.getElementById("carPlate").value;
    const entryTime = document.getElementById("entryTime").value;

    if (carPlate && entryTime) {
      const carList = document.getElementById("carTableBody");
      const row = document.createElement("tr");

      const plateCell = document.createElement("td");
      plateCell.textContent = carPlate;

      const entryCell = document.createElement("td");
      entryCell.textContent = entryTime;

      const exitCell = document.createElement("td");
      const exitInput = document.createElement("input");
      exitInput.type = "time";
      exitInput.addEventListener("change", function () {
        const exitTime = exitInput.value;
        const priceCell = row.cells[3];
        const price = calculatePrice(entryTime, exitTime);
        priceCell.textContent = `R$ ${price.toFixed(2)}`;
      });
      exitCell.appendChild(exitInput);

      const priceCell = document.createElement("td");
      priceCell.textContent = "R$ 0.00";

      row.appendChild(plateCell);
      row.appendChild(entryCell);
      row.appendChild(exitCell);
      row.appendChild(priceCell);

      carList.appendChild(row);

      // Limpar os campos do formulário
      document.getElementById("carPlate").value = "";
      document.getElementById("entryTime").value = "";
    }
  });

function calculatePrice(entryTime, exitTime) {
  const entry = new Date(`1970-01-01T${entryTime}:00`);
  const exit = new Date(`1970-01-01T${exitTime}:00`);
  const difference = (exit - entry) / (1000 * 60); // Diferença em minutos

  if (difference <= 34) {
    return 5.0;
  } else if (difference <= 64) {
    return 8.0;
  } else if (difference <= 124) {
    return 12.0;
  } else if (difference <= 184) {
    return 16.0;
  } else if (difference <= 244) {
    return 20.0;
  } else if (difference >= 245) {
    return 20.0;
  }
}
