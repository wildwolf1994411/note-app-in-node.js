const fs = require('fs');

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString)
        return notes
    } catch(e) {
        return []
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title == title);

    if (duplicateNotes.length == 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var note = notes.filter((note) => note.title == title);
    return note[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var len = notes.length;
    notes = notes.filter((note) => note.title != title);
    var newLen = notes.length;
    saveNotes(notes);
    return len != newLen;
};

var logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
