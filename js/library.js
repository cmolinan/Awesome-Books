import storageAvailable from './localStorageTools.js';
import Book from './book.js';

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
    if (obj) {
      this.books = obj?.books;
      this.nextId = obj?.nextId;
    }
  }

  updateStoreFormData() {
    if (!storageAvailable()) return;
    localStorage.setItem(
      'Library-books-data',
      JSON.stringify(this),
    );
  }

  initBookStorage() {
    if (storageAvailable()) this.getStoreFormData();
  }
}

export default Library;
