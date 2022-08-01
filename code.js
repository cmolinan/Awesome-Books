let library = {
  nextId: 0, // return to 0;
  books: [],
  add: (title, author) => {
    const newBook = {
      id: library.nextId,
      title,
      author,
    };

    library.books.push(newBook);

    library.nextId += 1;
    return newBook;
  },
  remove: (id) => {
    library.books = library.books.filter((book) => book.id !== id);
  },
};

// Book local storage

/* Check for storage Availability copy form documentation */
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && (storage && storage.length !== 0);
  }
}

function getStoreFormData(key = 'Library-books-data') {
  return JSON.parse(localStorage.getItem(key));
}

function updateStoreFormData(formObj, key = 'Library-books-data') {
  localStorage.setItem(
    key,
    JSON.stringify(formObj),
  );
}

function initBookStorage() {
  if (!storageAvailable('localStorage')) return;
  library = Object.assign(library, getStoreFormData());
}

// BOOK ELEMENT

const listOfBooksElement = document.querySelector('#list-books .list-of-books');

function deleteBookElement(parentContainer, id) {
  parentContainer.remove();
  library.remove(id);
  updateStoreFormData(library);
}

function CreateBookItemHTML(id, title, author) {
  const divContainer = document.createElement('div');
  const bookTitleElement = document.createElement('p');
  const bookAuthorElement = document.createElement('p');
  const deleteBookBtn = document.createElement('button');

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
  AddBookToContainerElement(library.add(bookTitleInput.value, bookAuthorInput.value));
  updateStoreFormData(library);
  return false;
}

function addBookButtonLIstener() {
  addBookForm.addEventListener('submit', addBook);
}

// INITS

function init() {
  initBookStorage();
  if (library) createBookListing();
  addBookButtonLIstener();
}

window.addEventListener('load', init);
