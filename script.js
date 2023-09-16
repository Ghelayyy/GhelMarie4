
let selectedRow = null;
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => div.remove(), 3000);
}

// Function to clear all form fields
function clearFields() {
  document.querySelector("#contactPerson").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#contactNumber").value = "";
}

// Function to handle form submission
document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const contactPerson = document.querySelector("#contactPerson").value;
  const address = document.querySelector("#address").value;
  const contactNumber = document.querySelector("#contactNumber").value;

  // Validate form fields
  if (contactPerson === "" || address === "" || contactNumber === "") {
    showAlert("PLEASE FILL ALL FIELDS", "danger");
  } else {
    if (selectedRow === null) {

      // Add a new row to the student list
      const list = document.querySelector("#student-list");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${contactPerson}</td>
        <td>${address}</td>
        <td>${contactNumber}</td>
        <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </td>
      `;

      list.appendChild(row);
      showAlert("CONTACT ADDED SUCCESSFULLY", "success");
    } else {
      // Edit the selected row
      selectedRow.children[0].textContent = contactPerson;
      selectedRow.children[1].textContent = address;
      selectedRow.children[2].textContent = contactNumber;
      selectedRow = null;
      showAlert("CONTACT INFO EDITED", "info");
    }

    clearFields();
  }
});

// Function to handle edit button click
document.querySelector("#student-list").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#contactPerson").value = selectedRow.children[0].textContent;
    document.querySelector("#address").value = selectedRow.children[1].textContent;
    document.querySelector("#contactNumber").value = selectedRow.children[2].textContent;
  }
});

// Function to handle delete button click
document.querySelector("#student-list").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("CONTACT DELETED", "danger");
  }
});