library = []

const dialog = document.getElementById('dialog')
const addBtn = document.getElementById('add-new-book')
const submitBtn = document.getElementById('submit')
const cardSection = document.getElementById('card-section')

let i = 0

function Books(title, author, pages, readStatus=false){
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus

    this.toggleReadStatus = function() {
        if (this.readStatus === true){
            return 'Read'
        }
        else {
            return 'Not Read'
        }
    }
}

function addBooks(title, author, pages, readStatus){
    const book = new Books(title, author, pages, readStatus)
    library.push(book)
}

function renderBooks(){
    if (!cardSection.classList.contains('card-section')){
        cardSection.classList.add('card-section')
    }
    
    cardSection.innerHTML = ''

    let i = 0

    library.forEach((object, index) => {
        const bookContainer = document.createElement('div')
        bookContainer.setAttribute('id', 'book-container')

        const bookTitle = document.createElement('h2')
        bookTitle.textContent = `Title: ${object.title}`

        const bookAuthor = document.createElement('p')
        bookAuthor.innerHTML = `<b>Author:</b> ${object.author}`

        const bookPages = document.createElement('p')
        bookPages.innerHTML = `<b>Pages:</b> ${object.pages}`

        const readBtn = document.createElement('button')
        readBtn.classList.add('read-button')
        readBtn.textContent = object.toggleReadStatus()
        readBtn.addEventListener("click", () => {
            if (readBtn.textContent === 'Read'){
                readBtn.textContent = 'Not Read'
            }
            else {
                readBtn.textContent = 'Read'
            }
        })

        const deleteBtn = document.createElement('button')
        // deleteBtn.setAttribute('id', 'delete-button')
        deleteBtn.classList.add('delete-button')
        deleteBtn.textContent = 'Delete'

        deleteBtn.addEventListener("click", () => {
            library.splice(index, 1)
            renderBooks()
            
        
        })

        bookContainer.append(bookTitle, bookAuthor, bookPages, readBtn, deleteBtn)

        
        cardSection.append(bookContainer)

        

    })
    
}

addBtn.addEventListener('click', () => {
    dialog.showModal()
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const readCheckBox = document.getElementById('read-status').checked
    addBooks(title, author, pages, readCheckBox)


    renderBooks()
    dialog.close()
})
