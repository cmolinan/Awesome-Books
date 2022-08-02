import Library from './js/library.js';

const library = new Library();

// Book local storage

// BOOK ELEMENT

const listOfBooksElement = document.querySelector('#list-books .list-of-books');

function deleteBookElement(parentContainer, id) {
  parentContainer.remove();
  library.remove(id);
}

function CreateBookItemHTML(id, title, author) {
  const divContainer = document.createElement('div');
  const bookTitleElement = document.createElement('p');
  const bookAuthorElement = document.createElement('p');
  const deleteBookBtn = document.createElement('button');
  const hrElement = document.createElement('hr');

  divContainer.id = `Book-${id}`;

  bookTitleElement.innerText = title;
  bookTitleElement.classList.add('book-title');
  bookAuthorElement.innerText = author;
  bookTitleElement.classList.add('book-author');

  deleteBookBtn.innerText = 'Remove';

  deleteBookBtn.addEventListener('click', () => {
    deleteBookElement(divContainer, id);
  });

  divContainer.appendChild(bookTitleElement);
  divContainer.appendChild(bookAuthorElement);
  divContainer.appendChild(deleteBookBtn);
  divContainer.appendChild(hrElement);

  return divContainer;
}

function AddBookToContainerElement(book) {
  listOfBooksElement.appendChild(CreateBookItemHTML(book.id, book.title, book.author));
}

function createBookListing() {
  library.books.forEach((book) => {
    AddBookToContainerElement(book);
  });
}

// ADD book from

const addBookForm = document.querySelector('#add-book-form');
const bookTitleInput = addBookForm.querySelector('#title-input');
const bookAuthorInput = addBookForm.querySelector('#author-input');

function addBook(e) {
  e.preventDefault();
  AddBookToContainerElement(library.createBookAndAdd(bookTitleInput.value, bookAuthorInput.value));
  return false;
}

function addBookButtonLIstener() {
  addBookForm.addEventListener('submit', addBook);
}

// INITS

function init() {
  library.initBookStorage();
  createBookListing();
  addBookButtonLIstener();
}

window.addEventListener('load', init);
