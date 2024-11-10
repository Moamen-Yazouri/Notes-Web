const notesContainer = document.querySelector(".notes-container");
const addBtn = document.querySelector(".add");
let counter = 0;
if(localStorage.length > 0) {
    for(let i = 0; i < localStorage.length; i++) {
        let note = document.createElement("p");
        let noteId = localStorage.key(i);
        let textContent = localStorage.getItem(noteId);
        note.className = "input-box";
        note.setAttribute("data-count", noteId.match(/\d+/)[0]);
        note.setAttribute("contenteditable", "true");
        note.textContent = textContent;
        let img = document.createElement("img");
        img.src = "images/delete.png";
        note.appendChild(img);
        notesContainer.appendChild(note);
    }
}
addBtn.addEventListener("click", () => {
    let note = document.createElement("p");
    note.className = "input-box";
    note.setAttribute("data-count", ++counter);
    note.setAttribute("contenteditable", "true");
    let img = document.createElement("img");
    img.src = "images/delete.png";
    note.appendChild(img);
    notesContainer.appendChild(note);

    window.localStorage.setItem(`note${counter}`, note.textContent);
    note.addEventListener("blur", () => {
        const noteId = note.getAttribute("data-count");
        window.localStorage.setItem(`note${noteId}`, note.textContent);

    })
});
notesContainer.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG") {
        const note = e.target.parentElement;
        const noteId = note.getAttribute("data-count");
        note.remove();
        localStorage.removeItem(`note${noteId}`)
    }
})
