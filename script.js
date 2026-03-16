// LOGIN SYSTEM

function login(){

let user=document.getElementById("username").value;
let pass=document.getElementById("password").value;

if(user==="admin" && pass==="1234"){
window.location="dashboard.html";
}
else{
document.getElementById("loginMsg").innerHTML="Invalid Login";
}

}



// BOOK STORAGE

let books=JSON.parse(localStorage.getItem("books")) || [];
let history=JSON.parse(localStorage.getItem("history")) || [];



function addBook(){

let book=document.getElementById("bookName").value;
let author=document.getElementById("authorName").value;

let newBook={
book:book,
author:author,
status:"Available",
student:""
};

books.push(newBook);

localStorage.setItem("books",JSON.stringify(books));

displayBooks();

}



function displayBooks(){

let table=document.getElementById("bookList");

if(!table) return;

table.innerHTML="";

books.forEach((b,index)=>{

let row=`
<tr>
<td>${b.book}</td>
<td>${b.author}</td>
<td>${b.status}</td>
<td>${b.student}</td>
<td>
<button onclick="issueBook(${index})">Issue</button>
<button onclick="returnBook(${index})">Return</button>
<button onclick="deleteBook(${index})">Delete</button>
</td>
</tr>
`;

table.innerHTML+=row;

});

displayHistory();

}



function issueBook(i){

let student=prompt("Enter Student Name");

if(student){

books[i].status="Issued";
books[i].student=student;

history.push(student+" issued "+books[i].book);

saveData();

}

}



function returnBook(i){

history.push(books[i].student+" returned "+books[i].book);

books[i].status="Available";
books[i].student="";

saveData();

}



function deleteBook(i){

books.splice(i,1);

saveData();

}



function searchBook(){

let search=document.getElementById("searchBook").value.toLowerCase();

let rows=document.querySelectorAll("#bookList tr");

rows.forEach(row=>{
let text=row.innerText.toLowerCase();

row.style.display=text.includes(search)?"":"none";
});

}



function displayHistory(){

let list=document.getElementById("historyList");

if(!list) return;

list.innerHTML="";

history.forEach(h=>{
list.innerHTML+="<li>"+h+"</li>";
});

}



function saveData(){

localStorage.setItem("books",JSON.stringify(books));
localStorage.setItem("history",JSON.stringify(history));

displayBooks();

}



displayBooks();