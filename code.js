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
  const bookTitleAndAuthorElement = document.createElement('p');
  const deleteBookBtn = document.createElement('button');

  divContainer.id = `Book-${id}`;
  divContainer.classList.add('books-details');

  bookTitleAndAuthorElement.innerText = `"${title}" by ${author}`;
  bookTitleAndAuthorElement.classList.add('book-title');
  bookTitleAndAuthorElement.classList.add('book-author');

  deleteBookBtn.innerText = 'Remove';

  deleteBookBtn.addEventListener('click', () => {
    deleteBookElement(divContainer, id);
  });

  divContainer.appendChild(bookTitleAndAuthorElement);
  divContainer.appendChild(deleteBookBtn);

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

function refreshTime() {
  const timeDisplay = document.getElementById('date-time');
  const dateString = new Date().toLocaleString('en-us');
  const formattedString = dateString.replace(', ', ', ');
  timeDisplay.textContent = formattedString;
}

function initTime() {
  refreshTime();
  setInterval(refreshTime, 1000);
}

const queryListBooks = document.getElementById('list-books');
const queryAddBook = document.getElementById('add-book');
const queryContact = document.getElementById('contact-section');

const queryMenuList = document.getElementById('menuList');
const queryMenuAdd = document.getElementById('menuAdd');
const queryMenuContact = document.getElementById('menuContact');

function clickOnList(e) {
  console.log(e.target);
  e.preventDefault();
  queryListBooks.style.display = 'block';
  queryAddBook.style.display = 'none';
  queryContact.style.display = 'none';
}

function clickOnAdd(e) {
  console.log(e.target);
  e.preventDefault();
  queryListBooks.style.display = 'none';
  queryAddBook.style.display = 'block';
  queryContact.style.display = 'none';
}

function clickOnContact(e) {
  console.log(e.target);
  e.preventDefault();
  queryListBooks.style.display = 'none';
  queryAddBook.style.display = 'none';
  queryContact.style.display = 'block';
}

function addMenusListeners() {
  queryMenuList.addEventListener('click', clickOnList);
  queryMenuAdd.addEventListener('click', clickOnAdd);
  queryMenuContact.addEventListener('click', clickOnContact);
}

// const getOrdinalNum = (number) => {
//   let selector;
//   if (number <= 0) {
//     selector = 4;
//   } else if ((number > 3 && number < 21) || number % 10 > 3) {
//     selector = 0;
//   } else {
//     selector = number % 10;
//   }
//   return number + ['th', 'st', 'nd', 'rd', ''][selector];
// };

// INITS

function init() {
  library.initBookStorage();
  createBookListing();
  addBookButtonLIstener();
  addMenusListeners();
  initTime();
}

window.addEventListener('load', init);
