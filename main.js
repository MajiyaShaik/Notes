let notes = []

let noteslist = document.querySelector('.NotesList')

document.querySelector('#deleteall').addEventListener('click', () => {
      document.querySelectorAll('.note').forEach(note => {
        note.remove();
      })
      localStorage.clear();
})

function addNoteToScreen() {
     if(localStorage.getItem('notes')){
      notes = JSON.parse(localStorage.getItem('notes'));
      notes.forEach(note => {
        noteToLists(note, note.uniqueId);
      })
     }
}

document.querySelector('#create').addEventListener('click',() => {
  
  let uniqueId = 'note' + Math.floor(Math.random()*1000);

  let note = {
    title : document.querySelector('#title').value,
    content : document.querySelector('#textnote').value
  }
  addNoteToLocal(note, uniqueId);
  noteToLists(note, uniqueId);
})

function noteToLists(note, uniqueId) {
 let notediv = document.createElement('div')
 notediv.classList.add('note', uniqueId)

 let title = document.createElement('h4')
 let text = document.createElement('p')
 let btndiv = document.createElement('div')
 btndiv.className = 'btndiv';
 let btnedit = document.createElement('button')
 btnedit.className = 'edit';
 let btndel = document.createElement('button')

 title.innerText = note.title;
 text.innerText = note.content;
 btnedit.innerText = 'Edit Note';
 btndel.innerText = 'Delete Note';   


 btnedit.addEventListener('click', (e) =>{
  document.querySelector('#title').value = title.innerText;
  document.querySelector('#textnote').value = text.innerText;
  removenote(uniqueId)
 })
 
 btndel.addEventListener('click', () =>{
      removenote(uniqueId)
})

 notediv.appendChild(title);
 notediv.appendChild(text);
 btndiv.appendChild(btnedit);
 btndiv.appendChild(btndel)
 notediv.appendChild(btndiv)
 noteslist.appendChild(notediv);

 document.querySelector('#title').value = '';
 document.querySelector('#textnote').value = '';

 
}

 function addNoteToLocal(note,uniqueId) {
  note = {...note, uniqueId}

  notes.push(note)
  localStorage.setItem('notes', JSON.stringify(notes));
 
}

function removenote(Id) {
   document.querySelector('.' + Id).remove();

   notes = JSON.parse(localStorage.getItem('notes'));
   let index = notes.findIndex ( note => note.uniqueId == Id)
   notes.splice(index,1);
   localStorage.setItem('notes', JSON.stringify(notes));
}

addNoteToScreen();