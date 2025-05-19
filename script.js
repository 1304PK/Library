const addBtn = document.getElementById('add-new-book')
const dialog = document.getElementById('dialog')
const submitBtn = document.getElementById('submit')

addBtn.addEventListener("click", () => {
    dialog.showModal()
})

submitBtn.addEventListener("click", () => {
    dialog.close()
})