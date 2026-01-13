class Book {
    #title;
    #numOfChapters;
    #author;
    #numOfPages;
    #publisher;
    #numOfCopies;

    constructor(title, numOfChapters, author, numOfPages, publisher, numOfCopies) {
        if (typeof title !== 'string' || title.trim() === '' ||
            typeof author !== 'string' || author.trim() === '' ||
            typeof publisher !== 'string' || publisher.trim() === '' ||
            isNaN(numOfChapters) || numOfChapters <= 0 ||
            isNaN(numOfPages) || numOfPages <= 0 ||
            isNaN(numOfCopies) || numOfCopies <= 0
        ) {
            throw new Error("Not valid book info, Enter a full valid info for the book!!")
        }

        this.#title = title.trim();
        this.#numOfChapters = +numOfChapters;
        this.#author = author.trim();
        this.#numOfPages = +numOfPages;
        this.#publisher = publisher.trim();
        this.#numOfCopies = +numOfCopies;
    }

    get title() { return this.#title; }
    get author() { return this.#author; }
    get numOfCopies() { return this.#numOfCopies; }

    toString() {
        return `Title: ${this.#title}, Author: ${this.#author}, Pages: ${this.#numOfPages}, Chapters: ${this.#numOfChapters}, Publisher: ${this.#publisher}, Copies: ${this.#numOfCopies}`;
    }
}

class Box {
    #height;
    #width;
    #length;
    #material;
    #content;
    #numOfBooks;

    constructor(height, width, length, material) {
        if (isNaN(height) || isNaN(width) || isNaN(length)
         || height <= 0 || width <= 0 || length <= 0
         || typeof material !== 'string' || material.trim() === ''
        ) {
            throw new Error("Not Valid Box, Enter a full valid info for the box.");
        }

        this.#height = +height;
        this.#width = +width;
        this.#length = +length;
        this.#material = material.trim();
        this.#content = [];
        this.#numOfBooks = 0;
    }


    get height() { return this.#height; }
    get width() { return this.#width; }
    get length() { return this.#length; }
    get material() { return this.#material; }
    get volume() { return this.#height * this.#width * this.#length; }
    get numOfBooks() { return this.#numOfBooks; }

    addBook(book) {
        if (!(book instanceof Book)) throw new Error("Only Book instances can be added");
        this.#numOfBooks += book.numOfCopies;
        this.#content.push(book);
    }

    deleteBookByTitle(title) {
        this.#content = this.#content.filter(book => {
            if (book.title === title) {
                this.#numOfBooks -= book.numOfCopies;
                return false;
            }
            return true;
        });
    }

    toString() {
        return `
Box Dimensions: ${this.#height} x ${this.#width} x ${this.#length}
Material: ${this.#material}
Volume: ${this.volume}
Number of Books: ${this.#numOfBooks}
Books:\n${this.#content.map((book, index) => ` ${index+1}) ` + book.toString()).join("\n")}
        `;
    }

    valueOf() {
        return this.#numOfBooks;
    }
}


const book1 = new Book("JS", 8, "JSJS", 300, "pup", 90);
const book2 = new Book("HTML", 3, "HTCS", 120, "pup", 20);
const book3 = new Book("CSS", 4, "HTCS", 150, "pup", 35);

// console.log("Show book 1 info:")
// console.log(book1.toString());


const box1 = new Box(10, 5, 4, "Wood");
box1.addBook(book1);
box1.addBook(book2);
box1.addBook(book3);
// console.log("Show Box 1 Info: ");
// console.log(box1.toString());

// console.log("\nTotal books in box1:", box1.numOfBooks);  // 90 + 20 + 35
const box2 = box1;
// console.log("\nTotal books in box1+box2:", box1+box2);  

box1.deleteBookByTitle("CSS");
// console.log("Total books in box1 after deleing book 3: ", box1.numOfBooks); // 90 + 20

