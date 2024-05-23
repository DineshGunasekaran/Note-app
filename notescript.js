// Note app scripts

const addBtn = document.querySelector("#addBtn");
const circles = document.querySelector("#circles");
const contentArea = document.querySelector(".contentArea");
const textAreaElements = document.querySelectorAll(".textAreaEle");
const editIcon = document.querySelectorAll(".editIcons");

// window.onload = loadWindow;

function loadWindow() {
  let length = localStorage.length;
  console.log(length);
  const notesArray = [];
  for(let i = 0; i < length; i++) {
    var key = localStorage.key(i);
    console.log(localStorage.getItem(key));
  }
}

// adding blur effect class to the DOM body when text area got focus
// textAreaElements.forEach((textArea) => {
//   textArea.addEventListener('focus', () => {
//     document.body.classList.add('blur-effect')
//   });
// });





/* Edit Icon Actions - 
1. TextArea shoud be editable
2. Show the save tick mark
3. Blur all other divs */

editIcon.forEach((edit) => {
  edit.addEventListener("click", (e) => {
    enableEditing(e);
    showSaveTick(e);
  });
});

function enableEditing(element) {
  let textArea = element.target.parentElement.parentElement.childNodes[3];
  textArea.disabled = false;
  textArea.focus();
  // console.log(textArea);
}

function showSaveTick(element) {
  const tickElem =
    element.target.parentElement.parentElement.childNodes[1].childNodes[3];
  // console.dir(tickElem);
  tickElem.style.display = "block";
}

// Function when the savetick mark clicked
function saveNote(element) {
  // Check for title
  console.dir(event);
  console.dir(event.target);
  let titleEle = event.target.previousElementSibling;
  console.log(titleEle);
  if (titleEle.value.trim() !== "") {
    // console.dir(title);
    let textArea = event.target.parentElement.nextElementSibling;
    textArea.disabled = true;
    textArea.blur();
    event.target.style.display = "none";
    
    // Title diable
    titleEle.disabled = true;
    // console.dir(titleEle);
    updatenote(textArea.value, titleEle.value);
  }
  else {
    alert('Enter the Title');
  }
  
}

// Updating note into the localstorage by using objects
function updatenote(newNote, idValue) {
  if (newNote.trim() !== "") {
    // Create object to store into localstorage
    const note = { 
      id: idValue, 
      text:newNote
    };

    localStorage.setItem(idValue, JSON.stringify(newNote));
    console.log(localStorage.getItem(idValue));
    // // Pulling existing localstorage values and setting that as an arrya to add the new object 
    // const oldNotes =JSON.parse(localStorage.getItem("newNote")) || [];
    // console.log('Old Notes: ' , oldNotes);
    // oldNotes.push(note);
    // console.log(oldNotes);
    

    // Setting note object into localstorage
    
  }
}

function btnAction() {
  
  // create new Note element
  // Create the note div
  var noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

  // Create the tickDiv div
  var tickDiv = document.createElement('div');
  tickDiv.id = 'tickDiv';
  noteDiv.appendChild(tickDiv);

  // Create the input element
  var inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.placeholder = 'Enter title';
  tickDiv.appendChild(inputElement);

  // Create the tickMark icon
  var tickMarkIcon = document.createElement('i');
  tickMarkIcon.id = 'tickMark';
  tickMarkIcon.classList.add('fa-solid', 'fa-check');
  tickMarkIcon.onclick = () => {
      saveNote(Event);
  };
  tickDiv.appendChild(tickMarkIcon);

  // Create the textarea element
  var textareaElement = document.createElement('textarea');
  textareaElement.classList.add('textAreaEle');
  textareaElement.cols = '30';
  textareaElement.rows = '12';
  noteDiv.appendChild(textareaElement);

  // Create the controlIcons div
  var controlIconsDiv = document.createElement('div');
  controlIconsDiv.classList.add('controlIcons');
  noteDiv.appendChild(controlIconsDiv);

  // Create the star icon
  var starIcon = document.createElement('i');
  starIcon.classList.add('fa-solid', 'fa-star');
  starIcon.onclick = () => {
      updateStar(this);
  };
  controlIconsDiv.appendChild(starIcon);

  // Create the delete icon
  var deleteIcon = document.createElement('i');
  deleteIcon.id = 'delIcon';
  deleteIcon.classList.add('fa-solid', 'fa-trash');
  deleteIcon.onclick = () => {
      deleteNote(this);
  };
  controlIconsDiv.appendChild(deleteIcon);

  // Create the edit icon
  var editIcon = document.createElement('i');
  editIcon.classList.add('fa-solid', 'fa-file-pen', 'editIcons');
  controlIconsDiv.appendChild(editIcon);

  // Append the noteDiv into the contentArea div
  contentArea.appendChild(noteDiv);
}

// Note delete function
function deleteNote(ele) {
  console.log(ele.parentElement.parentElement.remove());
  localStorage.setItem("notes", contentArea.innerHTML);
}

// update star
function updateStar(ele) {
  let starElement = event.target;
  if (starElement.style.color == "" || starElement.style.color == "white") {
    starElement.style.color = "gold";
    starElement.style.background = "white";
  } else if (starElement.style.color == "gold") {
    starElement.style.color = "white";
    starElement.style.background = "black";
  }
}
