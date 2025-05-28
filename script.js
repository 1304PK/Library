const books = []

class createBook {
    constructor(name, author, pages, readStatus) {
        this.name = name
        this.author = author
        this.pages = pages
        this.readStatus = readStatus
    }

    checkReadStatus(element) {
        if (this.readStatus === true) {
            element.classList.add('read')
            element.textContent = 'Read'
        }
        else {
            element.classList.add('not-read')
            element.textContent = 'Not Read'
        }
    }
}

const addBtn = document.getElementById('add-book')
const dialog = document.getElementById('add-book-dialog')
const submitBtn = document.getElementById('submit-book')
const deleteBtn = document.querySelectorAll('delete-book')

const mainContainer = document.getElementById('books-container')

function checkReadStatus(element, item) {
    if (item.readStatus === true) {
        element.classList.add('read')
        element.innerHTML = `<i class="fa-solid fa-circle-check"></i> Read`
    }
    else {
        element.classList.add('not-read')
        element.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Not Read`
    }
}

function updateBooks() {
    const bookName = document.getElementById('i_bookname').value
    const bookAuthor = document.getElementById('i_author').value
    const bookPages = document.getElementById('i_pages').value
    const readStatusCheckbox = document.getElementById('i_readstatus').checked

    const book = new createBook(bookName, bookAuthor, bookPages, readStatusCheckbox)
    books.push(book)
    setLocalStorage()
}

function setLocalStorage() {
    localStorage.setItem('booklist', JSON.stringify(books))
}

function getLocalStorage() {
    const booklist = JSON.parse(localStorage.getItem('booklist'))
}

function init() {
    const booklist = JSON.parse(localStorage.getItem('booklist'))
    renderBooks(booklist)
    booklist.forEach(i => books.push(i))
}

function deleteBook(index, button) {
    button.addEventListener('click', () => {
        books.splice(index, 1)
        renderBooks(books)
        setLocalStorage()
    })
}

function toggleReadStatus(item, t_button) {
    t_button.addEventListener('click', () => {
        if (item.readStatus === true) {
            item.readStatus = false
            t_button.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Not Read'
            t_button.classList.remove('read')
            t_button.classList.add('not-read')
        }
        else {
            item.readStatus = true
            t_button.innerHTML = '<i class="fa-solid fa-circle-check"></i> Read'
            t_button.classList.remove('not-read')
            t_button.classList.add('read')
        }
        setLocalStorage()
    })

}

function renderBooks(array) {

    mainContainer.innerHTML = ''
    array.forEach((item, index) => {
        const book_container = document.createElement('div')
        book_container.classList.add('book')
        const book_name = document.createElement('h1')
        book_name.innerHTML = `<i class="fa-solid fa-book"></i> ${item.name}`
        const book_details = document.createElement('div')
        book_details.classList.add('book-details')
        const author_name = document.createElement('p')
        author_name.textContent = item.author
        const book_pages = document.createElement('p')
        book_pages.textContent = item.pages

        const readstatus_button = document.createElement('button')
        readstatus_button.classList.add('read-status')
        checkReadStatus(readstatus_button, item)
        toggleReadStatus(item, readstatus_button)

        const delete_button = document.createElement('button')
        delete_button.classList.add('delete-book')
        delete_button.innerHTML = `<i class="fa-solid fa-trash"></i> Delete`
        deleteBook(index, delete_button)

        book_details.append(author_name, book_pages)
        book_container.append(book_name, book_details, readstatus_button, delete_button)

        mainContainer.append(book_container)
    })
}


addBtn.addEventListener('click', () => {
    dialog.showModal()
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const bookName = document.getElementById('i_bookname').value
    const bookAuthor = document.getElementById('i_author').value
    const bookPages = document.getElementById('i_pages').value


    if (bookName && bookAuthor && bookPages) {
        dialog.close()
        updateBooks()
        renderBooks(books)

    }
    else {
        alert("Fill in the required details!")
    }

})

init()