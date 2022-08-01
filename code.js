const library = {
  nextId: 2, // return to 0;
  books: [
    {
      id: 0,
      title: 'How to programming for Dummies',
      author: 'Wallace Wang',
    },
    {
      id: 1,
      title: 'The Stalker and the Programmer Vampire',
      author: 'Ere Reyes Moonlight',
    },
  ],
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
  console.table(library.books);
  return false;
}

function addBookButtonLIstener() {
  addBookForm.addEventListener('submit', addBook);
}

function init() {
  createBookListing();
  addBookButtonLIstener();
}

window.addEventListener('load', init);
