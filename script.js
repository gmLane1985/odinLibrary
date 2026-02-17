const myLibrary = [];

function Book(title, author, year, pages, isRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary() {
  let newBook = new Book(title, author, year, pages, isRead);
  myLibrary.push(newBook);
}
