
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
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#rollNo").value = "";
}

// Function to handle form submission
document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const rollNo = document.querySelector("#rollNo").value;

  // Validate form fields
  if (firstName === "" || lastName === "" || rollNo === "") {
    showAlert("PLEASE FILL ALL FIELDS", "danger");
  } else {
    if (selectedRow === null) {
      // Add a new row to the student list
      const list = document.querySelector("#student-list");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${rollNo}</td>
        <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </td>
      `;

      list.appendChild(row);
      showAlert("CONTACT ADDED SUCCESSFULLY", "success");
    } else {
      // Edit the selected row
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = rollNo;
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
    document.querySelector("#firstName").value = selectedRow.children[0].textContent;
    document.querySelector("#lastName").value = selectedRow.children[1].textContent;
    document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
  }
});

// Function to handle delete button click
document.querySelector("#student-list").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Student data deleted", "danger");
  }
});