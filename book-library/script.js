const btnNewBook = document.querySelector(".button__new__book");
const form = document.querySelector(".formado");
const closeForm = document.querySelector("svg");

class updateDom {
  showForm(element, selector) {
    element.classList.add(selector);
  }
  hiddenForm(element, selector) {
    element.classList.remove(selector);
  }
}
const DOM = new updateDom();
btnNewBook.addEventListener("click", function () {
  DOM.showForm(form, "show");
});
closeForm.addEventListener("click", function () {
  DOM.hiddenForm(form, "show");
});
