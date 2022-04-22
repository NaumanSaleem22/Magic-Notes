console.log("magic notes");
showNotes();

let addbtn = document.getElementById("addbtn");

addbtn.addEventListener("click", function (e) {
  let addtxt = document.getElementById("addtxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myNotes = {
    title: addTitle.value,
    text: addtxt.value,
  };
  notesObj.push(myNotes);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addtxt.value = "";
  addTitle.value = "";
  console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += ` 
      <div class="noteCard card my-2 mx-2"  style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Notes ${element.title} </h5>
            <p class="card-text"> ${element.text}</p>
          <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary" id="addbtn">Delete Notes</button>
        </div>
      </div>

      `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = "Nothing to show, Add notes please";
  }
}

function deleteNode(index) {
  console.log("deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
