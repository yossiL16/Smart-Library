class Book {
    static counter = 1
    constructor(title, category, copies, minCopies,expiresAt) {
        this.id = `Book-${Book.counter++}`
        this.title = title;
        this.category = category;
        this.copies = copies;
        this.minCopies = minCopies;
        this.expiresAt = expiresAt;
    }
}

class Library {
    constructor() {
        this.books = []
    }

    static validateBook(book) {
        const validBook = { valid: true, msg: {} }
        if (typeof book.title !== "string") { validBook['valid'] = false, validBook.msg['title'] = "Wrong type" }
        if (!book.title || book.title == "") { validBook['valid'] = false, validBook.msg['title'] = "There is no title" }
        if (typeof book.category !== "string") { validBook['valid'] = false, validBook.msg['category'] = "Wrong type" }
        if (!book.category || book.category == "") { validBook['valid'] = false, validBook.msg['category'] = "There is no category" }
        if (typeof book.copies !== "number") { validBook['valid'] = false, validBook.msg['copies'] = "Wrong type" }
        if (!book.copies || book.copies == "") { validBook['valid'] = false, validBook.msg['copies'] = "There is no title" }
        if (book.copies < 0) { validBook['valid'] = false, validBook.msg['copies'] = 'Cannot be below 0' }
        if (typeof book.minCopies !== "number") { validBook['valid'] = false, validBook.msg['minCopies'] = "Wrong type" }
        if (!book.minCopies || book.minCopies == "") { validBook['valid'] = false, validBook.msg['minCopies'] = "There is no title" }
        if (book.minCopies < 0) { validBook['valid'] = false, validBook.msg['minCopies'] = 'Cannot be below 0' }
        return validBook
    }

    static addBook(library, book) {
        const found = library.books.find((obj) => obj.id === book.id);
        if (found) { throw new Error("The book already exists") }

        const valid = Library.validateBook(book)
        if (valid.valid === false) { return console.log(valid) }

        const newBook = { ...book }
        library.books.push(newBook)
        return console.log("The addition was successful.");

    }

    static removeBook(library, bookId) {
        const found = library.books.find((obj) => obj.id === bookId);
        if (!found) { return console.log("The ID was not found"); }
        const index = library.books.findIndex((obj) => obj.id === bookId);
        library.books.splice(index, 1)
        return console.log("The deletion was successful");
    }


    static updateCopies(library, bookId, delta) {
        const found = library.books.findIndex((obj) => obj.id === bookId);
        if (found === -1) { return console.log("The ID was not found"); }
        if (delta + library.books[found] < 0) {return console.log("Cannot be less than 0")}
        library.books[found] += delta;
        return "copice update"
    }

    
    static getLowCopyBooks(library){
        const filterNoZero = library.books.filter((obj) => obj.copies !== 0);
        const filter = filterNoZero.filter((obj) => obj.copies < obj.minCopies);
        const result = filter.sort((a,b) => (a.copies / a.minCopies) - (b.copies/ b.minCopies))
        return result
    }


    static getExpiringBooks(library, daysAhead, today) {
        const result = new Date(today);
        result.setDate(result.getDate() + daysAhead);
        const listDays = library.books.filter((obj) => new Date(obj.expiresAt) < result);
        return listDays
    }


    

    }


// console.log(typeof addDays('2015-08-04', 3))









const l = new Library()
const b = new Book("a", "vvmvmv", 1, 3, "2015-08-04")
const b1 = new Book("a", "b", 3, 6, "2015-09-12")
Library.addBook(l, b)
// console.log(l.books);
const b2 = new Book("a", "b", 2, 4, "2015-08-05")
Library.addBook(l, b1)
// console.log(l.books);
// // Library.removeBook(l, "Book-2")
// console.log(l.books);
const b3 = new Book("cc", "b", 3, 2, "2015-09-01")
const b5 = new Book("vvv", "b", 10, 20, "2015-08-06") 
const b4 = new Book("nnn", "b", 4, 2, "2015-11-04")
Library.addBook(l, b2)
Library.addBook(l, b3)
Library.addBook(l, b4)
Library.addBook(l, b5)
// // console.log(l.books);

// console.log(Library.getLowCopyBooks(l))
// console.log(Library.getExpiringBooks(l,5,"2015-08-28"));


// let d = new Date("2015-08-04")

// console.log(d.setDate(d.getDate() + 3));














