
// Books information
// const info = {
//   books: [
//   {
//     id: 1,
//     title: 'How to programming for Dummies', 
//     author: 'Wallace Wang'
//   },
//   {
//     id: 2,
//     title: 'The Stalker and the Programmer Vampire', 
//     author: 'Ere Reyes Moonlight'
//   }
// ]  
// }

const info = {
  books: [
  {
    id: 0,
    title: '', 
    author: ''
  }
]  
}

//Books
const theBooks = info.books;
const queryBookListing = document.getElementById ('listing');


function createBookListing() {  
  if (theBooks[0].id === 0) {
    queryBookListing.style.display="none";
    return;}

  theBooks.forEach( (data) => {  
    queryBookListing.innerHTML += `<div id="Book ${data.id}">
    <p id="book-title-${data.id}">${data.title}</p>
    <p id="book-author-${data.id}">${data.author}</p>
    <button onclick="removeBook" >Remove1</button>
    <hr>
  </div>

  `;
 }
 )
}

window.onload = function() {
  createBookListing();
};


// document.querySelector('form').addEventListener('submit',readForm);

function formSubmit(){
  const formData = new FormData(e.target);
  // Now you can use formData.get('foo'), for example.
  // Don't forget e.preventDefault() if you want to stop normal form .submission
};
