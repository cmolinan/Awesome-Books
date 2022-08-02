import Book from './book.js';

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

class Library {
  constructor(books = [], nextId = 0) {
    this.books = books;
    this.nextId = nextId;
  }

  add(book) {
    if (book instanceof Book) {
      book.id = this.nextId;
      this.books.push(book);
      this.nextId += 1;
      this.updateStoreFormData();
      return book;
    }
    throw Error(`${book} is not instance of Book`);
  }

  createBookAndAdd(title, author) {
    const newBook = new Book(title, author);
    this.add(newBook);
    return newBook;
  }

  remove(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.updateStoreFormData();
  }

  getStoreFormData() {
    const obj = JSON.parse(localStorage.getItem('Library-books-data'));
    this.books = obj.books;
    this.nextId = obj.nextId;
  }

  updateStoreFormData() {
    localStorage.setItem(
      'Library-books-data',
      JSON.stringify(this),
    );
  }

  initBookStorage() {
    if (!storageAvailable('localStorage')) return;
    this.getStoreFormData();
  }
}

export default Library;
