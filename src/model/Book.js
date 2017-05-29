/**
 * Created by sukumar on 29-05-2017.
 */
function Book(slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
}
Book.instances = {};
Book.add = function (book) {
    var newBook = new Book(book);
    Book.instances[book.isbn] = book;
    console.log("book created : " + book.isbn);
}
Book.update = function (book) {
    var sbook = Book.instances[book.isbn];
    var year = parseInt(book.year, 10);
    if (sbook.title != book.title) {
        sbook.title = book.title
    }
    if (sbook.year != year) {
        sbook.year = year;
    }
}
Book.destroy = function (isBn) {
    if (Book.instances[isBn]) {
        console.log("book found");
        delete  Book.instances[isBn];
    } else {
        console.log("no book found");
    }
}
Book.convertRowObj = function (book) {
    return new Book(book);
}
Book.loadAll = function () {
    var bookString = '';
    var books = {};
    try {
        if (localStorage["books"]) {
            bookString = localStorage["books"];
        }
    } catch (e) {
        alert("error when reading from locastorage" + e);
    }
    if (bookString) {
        books = JSON.parse(bookString);
        keys = Object.keys(books);
        console.log(keys.length + " books loaded.");
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            Book.instances[key] = Book.convertRowObj(books[key]);
        }
    }
}
Book.saveAll = function () {
    var booksString = "";
    var error = false;
    var nBooks = Object.keys(Book.instances).length;
    try {
        booksString = JSON.stringify(Book.instances);
        localStorage["books"] = booksString;
    } catch (e) {
        alert("error when writing to localStorage\n" + e);
        error = true;
    }
    if (!error) {
        console.log(nBooks + " saved");
    }
}
Book.clearData = function () {
    if (confirm("Do you really want to delete all book data?")) {
        localStorage["books"] = "{}";
    }
};
Book.createTestData = function () {
    Book.instances["006251587X"] = new Book(
        {isbn: "006251587X", title: "Weaving the Web", year: 2000});
    Book.instances["0465026567"] = new Book(
        {isbn: "0465026567", title: "Gödel, Escher, Bach", year: 1999});
    Book.instances["0465030793"] = new Book(
        {isbn: "0465030793", title: "I Am A Strange Loop", year: 2008});
    Book.saveAll();
};
