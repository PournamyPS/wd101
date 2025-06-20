const form = document.getElementById("userForm");
const tableBody = document.querySelector("#userTable tbody");

// Load users from localStorage and display
function loadUsers() {
  tableBody.innerHTML = "";
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptTerms}</td>
        `;
    tableBody.appendChild(row);
  });
}

// Form validation and submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  // Example validation: Age between 18 and 55
  const dobDate = new Date(dob);
  const age = new Date().getFullYear() - dobDate.getFullYear();
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  // Store user
  const user = { name, email, password, dob, acceptTerms };
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // Update table
  loadUsers();

  // Reset form
  form.reset();
});

// Initial load
loadUsers();
