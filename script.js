const myLibrary = [];

function Book(title, author, year, pages, isRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, year, pages, isRead) {
  let newBook = new Book(title, author, year, pages, isRead);
  myLibrary.push(newBook);
}

function deleteBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index > -1) {
    myLibrary.splice(index, 1);
  }
}

function toggleReadStatus(id) {
  const book = myLibrary.find((b) => b.id === id);
  if (book) {
    book.isRead = !book.isRead;
  }
}

//*******************display******************
function displayLibrary() {
  const container = document.getElementById('libraryDisplay');
  container.innerHTML = '';

  // ***********sort books by year*************
  const sortedBooks = [...myLibrary].sort((a, b) => {
    return parseInt(a.year) - parseInt(b.year);
  });

  // Create table
  const table = document.createElement('table');
  table.classList.add('book-table');

  // Create header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Title', 'Author', 'Year', 'Pages', 'Read', 'Actions'];

  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create body
  const tbody = document.createElement('tbody');

  for (const book of sortedBooks) {
    const row = document.createElement('tr');

    // Title
    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    // Author
    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    // Year
    const yearCell = document.createElement('td');
    yearCell.textContent = book.year;
    row.appendChild(yearCell);

    // Pages
    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages;
    row.appendChild(pagesCell);

    // Read Status
    const readCell = document.createElement('td');
    readCell.classList.add('read-status');
    readCell.textContent = book.isRead ? 'Yes' : 'No';
    row.appendChild(readCell);

    // Actions
    const actionsCell = document.createElement('td');
    actionsCell.classList.add('actions-cell');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteBook(book.id);
      displayLibrary();
    });

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Read';
    toggleBtn.classList.add('toggle-btn');
    toggleBtn.addEventListener('click', () => {
      toggleReadStatus(book.id);
      displayLibrary();
    });

    actionsCell.appendChild(toggleBtn);
    actionsCell.appendChild(deleteBtn);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}
//*********************form open and close********************
const newBookBtn = document.getElementById('newBookBtn');
const bookDialog = document.getElementById('bookDialog');
const closeDialog = document.getElementById('closeDialog');

newBookBtn.addEventListener('click', () => {
  bookDialog.showModal();
});

closeDialog.addEventListener('click', () => {
  bookDialog.close();
});

//**********************submission******************************
const bookForm = document.getElementById('bookForm');

bookForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevents the page from reloading

  const title = document.getElementById('titleInput').value;
  const author = document.getElementById('authorInput').value;
  const year = document.getElementById('yearInput').value;
  const pages = document.getElementById('pagesInput').value;
  const isRead = document.getElementById('readInput').checked;

  addBookToLibrary(title, author, year, pages, isRead);

  displayLibrary();

  bookDialog.close();

  bookForm.reset();
});
