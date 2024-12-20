const form = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");
const newBookBtn = document.querySelector("#new-book");
const dialog = document.getElementById("form-dialog");
const addBookBtn = document.getElementById("add-book");
const closeBtn = document.getElementById("close");
const wrapper = document.querySelector(".wrapper");

// Initialize our library array to store all books
const myLibrary = [];

// the constructor...
function Book(title, author, pages, year, isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.year = year;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, year, isRead) {
  const newBook = new Book(title, author, pages, year, isRead);
  myLibrary.push(newBook);
  renderLibrary();
}

function renderLibrary() {
  const bookTableBody = document.getElementById("bookTableBody");
  bookTableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.year}</td>
      <td>${book.isRead ? "Read" : "Not Read Yet"}</td>
      <td><button data-index="${index}" class="toggleStatus">Toggle Status</button> 
      <button data-index="${index}" class="remove-book">Remove</button</td>`;

    bookTableBody.appendChild(row);
  });
  document.querySelectorAll(".remove-book").forEach((button) =>
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      removeBook(index);
    })
  );
  document.querySelectorAll(".toggleStatus").forEach((button) =>
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      myLibrary[index].toggleStatus();
      renderLibrary();
    })
  );
}

// Function to remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
  renderLibrary();
}

Book.prototype.toggleStatus = function () {
  this.isRead = !this.isRead;
};

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (!wrapper.contains(event.target)) dialog.close();
});

// Form submission handler
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const year = parseInt(document.getElementById("year").value);
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, year, isRead);

  form.reset();
  dialog.close();
});

function populateYearDropdown() {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  const startYear = 1900;

  for (let year = currentYear; year >= startYear; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

// Call the function when the page loads
populateYearDropdown();
