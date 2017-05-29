/**
 * Created by sukumar on 29-05-2017.
 */
publicLib.view.createBook = {
    setupUserInterface: function () {
        var saveButton = document.forms['Book'].commit;
// load all book objects
        Book.loadAll();
// Set an event handler for the save/submit button
        saveButton.addEventListener("click",
            publicLib.view.createBook.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function () {
            Book.saveAll();
        });
    },
// save user input data
    handleSaveButtonClickEvent: function () {
        var formEl = document.forms['Book'];
        var book = {
            isbn: formEl.isbn.value,
            title: formEl.title.value,
            year: formEl.year.value
        };
        Book.add(book);
        formEl.reset();
    }
}
