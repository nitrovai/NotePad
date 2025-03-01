// Local Storage Integration
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Initialize App
function init() {
    renderNotes(notes);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
}

// Create New Note
function createNewNote() {
    const newNote = {
        id: Date.now(),
        text: '',
        color: 'default',
        timestamp: new Date().toISOString()
    };
    notes.push(newNote);
    saveAndRender();
}

// Update Note
function updateNote(id, newText) {
    const note = notes.find(note => note.id === id);
    if(note) {
        note.text = newText;
        note.timestamp = new Date().toISOString();
        saveToLocalStorage();
    }
}

// Delete Note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveAndRender();
}

// Change Color
function changeColor(id, color) {
    const note = notes.find(note => note.id === id);
    if(note) {
        note.color = color;
        saveAndRender();
    }
}

// Save and Render
function saveAndRender() {
    saveToLocalStorage();
    renderNotes(notes);
}

// Save to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Render Notes
function renderNotes(notesArray) {
    const container = document.getElementById('notesContainer');
    container.innerHTML = notesArray.map(note => `
        <div class="note-card ${note.color}">
            <textarea 
                class="note-text" 
                oninput="updateNote(${note.id}, this.value)"
                placeholder="Start typing..."
            >${note.text}</textarea>
            <div class="note-footer">
                <div class="color-picker">
                    ${['default', 'pink', 'yellow', 'green', 'blue', 'purple'].map(color => `
                        <div 
                            class="color-option ${color} ${note.color === color ? 'selected' : ''}" 
                            onclick="changeColor(${note.id}, '${color}')"
                        ></div>
                    `).join('')}
                </div>
                <span class="material-icons delete-btn" onclick="deleteNote(${note.id})">delete</span>
            </div>
        </div>
    `).join('');
}

// Search Functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(searchTerm)
    );
    renderNotes(filteredNotes);
}

// Initialize on Load
init();
