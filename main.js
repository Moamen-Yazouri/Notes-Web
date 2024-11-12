const notesContainer = document.querySelector(".notes-container");
const addBtn = document.querySelector(".add");
let counter = 0;

if (localStorage.length > 0) {
    counter = localStorage.length;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const noteId = key.match(/\d+/)[0];
        const inputBox = createNoteElement(noteId, localStorage.getItem(key));
        notesContainer.appendChild(inputBox);
    }
}

function createNoteElement(noteId, content = "") {
    const inputBox = document.createElement("div");
    inputBox.className = "input-box";
    inputBox.setAttribute("data-count", noteId);

    const note = document.createElement("textarea");
    note.className = "note";
    note.textContent = content;
    note.placeholder = "Press Edit to Write";
    inputBox.appendChild(note);

    const img = document.createElement("img");
    img.src = "images/delete.png";
    inputBox.appendChild(img);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    inputBox.appendChild(editBtn);

    // Add event listeners for note interactions
    note.addEventListener("blur", () => {
        localStorage.setItem(`note${noteId}`, note.value);
    });

    editBtn.addEventListener("click", () => {
        const isEditable = note.getAttribute("contenteditable") === "true";
        note.focus();
    });

    img.addEventListener("click", () => {
        localStorage.removeItem(`note${noteId}`);
        inputBox.remove();
    });

    return inputBox;
}


addBtn.addEventListener("click", () => {
    const noteId = ++counter;
    const inputBox = createNoteElement(noteId);
    notesContainer.appendChild(inputBox);
    localStorage.setItem(`note${noteId}`, "");
});