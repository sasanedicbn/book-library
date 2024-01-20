const btnNewBook = document.querySelector(".button__new__book");
const form = document.querySelector(".formado");
const closeForm = document.querySelector("svg");
const btnSubmitData = document.querySelector(".submit");
const title = document.querySelector(".text__div");

class updateDom {
  constructor(id) {
    this.id = Math.floor(Math.random() * 100000);
  }
  showForm(element, selector) {
    element.classList.add(selector);
  }
  hiddenForm(element, selector) {
    element.classList.remove(selector);
  }
  moveHeaderup(element, selector) {
    element.classList.add(selector);
  }
  showBook(books) {
    const ulList = document.querySelector(".ul__list");
    ulList.innerHTML = "";

    books.forEach((data) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.innerHTML = `
      <li data-id="${this.id}">
        <p class='title'>Title: <br/><b>${data.title}</b></p>
        <p class='author'>Author: <br/><b>${data.author}</b></p>
        <p class='numOfPages'>Numbers of pages: <br/><b>${data.numPages}</b></p>
        <div class='btns'>
        <button>${data.read ? "Read" : "Not Read"}</button>
        <button>Delete</button>
        <button>Change</button>
        </div>
        </li>
      `;
      ulList.appendChild(bookElement);
    });
  }
}

class dataForm {
  constructor() {
    this.books = [];
  }

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
    this.books = this.books.filter((book) => book.id !== id);
  }
}

const DOM = new updateDom();
const data = new dataForm();

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

  const formData = {
    title: titleInput,
    author: authorInput,
    numPages: nPagesInput,
    read: checkReadInput,
  };

  data.getData(formData);

  data.resetForm();

  DOM.hiddenForm(form, "show");
  DOM.moveHeaderup(title, "up");
  DOM.showBook(data.books);

  console.log(data.books);
});
