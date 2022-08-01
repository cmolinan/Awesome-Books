const library = {
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
};

const listOfBooksElement = document.querySelector('#list-books .list-of-books');

function deleteBookElement(parentContainer, id) {
  parentContainer.remove();
  library.books = library.books.filter((book) => book.id !== id);
  console.table(library.books);
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

function createBookListing() {
  library.books.forEach((book) => {
    listOfBooksElement.appendChild(CreateBookItemHTML(book.id, book.title, book.author));
  });
}
function init() {
  createBookListing();
}

window.addEventListener('load', init);
