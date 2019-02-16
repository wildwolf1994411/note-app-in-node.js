const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {titleOptions, bodyOptions})
    .command('list', 'List all note')
    .command('read', 'Read a note', {titleOptions})
    .command('remove', 'Remove a note given title', {titleOptions})
    .help()
    .argv;
var command = argv._[0];


if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('note created')
        notes.logNote(note)
    } else {
        console.log('note title taken')
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Node found');
        notes.logNote(note);
    } else {
        console.log('Note not found')
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found'
    console.log(message)
} else {
    console.log('Command not recognized');
}
