const btnNewBook = document.querySelector(".button__new__book");
const form = document.querySelector(".formado");
const closeForm = document.querySelector("svg");
const btnSubmitData = document.querySelector(".submit");
const title = document.querySelector(".text__div");
const parentofBooks = document.querySelector(".ul__list");

class updateDom {
  showForm(element, selector) {
    element.classList.add(selector);
  }
  hiddenForm(element, selector) {
    element.classList.remove(selector);
  }
  moveHeaderup(element, selector) {
    element.classList.add(selector);
  }
  // books
  showBook(books) {
    const ulList = document.querySelector(".ul__list");
    ulList.innerHTML = "";

    books.forEach((book) => {
      const bookElement = document.createElement("li");
      bookElement.classList.add("book");
      bookElement.dataset.id = book.id;
      bookElement.innerHTML = `
      <div>
        <p class='title'>Title: <br/><b>${book.title}</b></p>
        <p class='author'>Author: <br/><b>${book.author}</b></p>
        <p class='numOfPages'>Numbers of pages: <br/><b>${book.numPages}</b></p>
        <div class='btns'>
        <button class="toggleRead">${book.read ? "Read" : "Not Read"}</button>
        <button class='delete'>Delete</button>
        <button>Change</button>
        </div>
        </div>
      `;
      ulList.appendChild(bookElement);
    });
  }
}

class Book {
  id = crypto.randomUUID();
  constructor(title, author, nPagesInput, read) {
    this.title = title;
    this.author = author;
    this.nPagesInput = nPagesInput;
    this.read = read;
  }
  editReadStatus() {
    this.read = !this.read;
    console.log(this.read);
  }
}

class dataForm {
  constructor() {
    this.books = [];
  }

  // addBook
  getData(data) {
    this.books.push(data);
  }

  resetForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("nPages").value = "";
    document.getElementById("checkRead").checked = false;
  }
  deleteBook(id) {
    console.log("Prije brisanja:", this.books);
    this.books = this.books.filter((book) => book.id !== id);
    console.log("Posle brisanja:", this.books);
  }
}

const DOM = new updateDom();
const data = new dataForm();
const book = new Book();

btnNewBook.addEventListener("click", function () {
  DOM.showForm(form, "show");
});

closeForm.addEventListener("click", function () {
  DOM.hiddenForm(form, "show");
});

btnSubmitData.addEventListener("click", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("title").value;
  const authorInput = document.getElementById("author").value;
  const nPagesInput = document.getElementById("nPages").value;
  const checkReadInput = document.getElementById("checkRead").checked;

  const book = new Book(titleInput, authorInput, nPagesInput, checkReadInput);
  console.log(book);
  data.getData(book);

  data.resetForm();

  DOM.hiddenForm(form, "show");
  DOM.moveHeaderup(title, "up");
  DOM.showBook(data.books);
  //  attacheddeleteListener
  console.log(data.books);
});

parentofBooks.addEventListener("click", function (event) {
  const deleteButton = event.target.closest(".delete");
  const toggleRead = event.target.closest(".toggleRead");
  console.log(toggleRead);
  console.log(deleteButton);
  if (deleteButton) {
    const currentBook = deleteButton.closest(".book");
    console.log(currentBook);
    const id = currentBook.dataset.id;

    data.deleteBook(id);

    currentBook.remove();

    DOM.showBook(data.books);
  }
  if (toggleRead) {
    const currentBook = toggleRead.closest(".book");
    const id = currentBook.dataset.id;

    const bookToUpdate = data.books.find((book) => book.id === id);

    if (bookToUpdate) {
      bookToUpdate.editReadStatus();
    }
  }
});
