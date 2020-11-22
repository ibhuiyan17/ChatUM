// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBxOKU3TP0BfcOG1BSZle_wiZrkmnOpEGw",
    authDomain: "webapp-17d6b.firebaseapp.com",
    databaseURL: "https://webapp-17d6b.firebaseio.com",
    projectId: "webapp-17d6b",
    storageBucket: "webapp-17d6b.appspot.com",
    messagingSenderId: "881406599130",
    appId: "1:881406599130:web:8895533e0a5430a00baae3",
    measurementId: "G-V4P88SJ1KS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

let postCollection = document.querySelector("#posts-collection");
let sideBar = document.querySelector("#sidebar");
console.log(postCollection);

document.addEventListener("DOMContentLoaded", event => {

});

const db = firebase.firestore();



function createPost(in_member, in_class, in_content, in_title, key){
    let div = document.createElement("div");
    div.setAttribute("class", "post");
    //div.style.border = "thick solid #000000";
    //div.style.width = 50;

    let title = document.createElement("h2");
    let post_content = document.createElement("p");
    let member = document.createElement("p");
    let class_id = document.createElement("h1");
    let comments = document.createElement("button");


    member.textContent = "Member: " + in_member;
    post_content.textContent = in_content;
    title.textContent = "Title: " + in_title;
    class_id.textContent = "Class: " + in_class;
    comments.textContent = "Comments";
    comments.setAttribute("onclick", "sessionStorage.setItem('post_id', this.id); window.location = 'comments.html'");
    //comments.setAttribute("onClick", "");
    comments.setAttribute("id", key)
    console.log(sessionStorage.getItem("post_id"));

    div.appendChild(class_id);
    div.appendChild(title);
    div.appendChild(member);
    div.appendChild(post_content);
    div.appendChild(comments);

    postCollection.appendChild(div);
}

// parameters are class_id and class name
function createSidebar(class_id_in, class_name){
    let div = document.createElement("div");
    div.setAttribute("class", "list-group-item list-group-item-action");
    div.addEventListener("click", () => {
        sessionStorage.setItem('class_id', class_id_in)
        window.location.reload();
    })
    div.innerText = class_name;
    sideBar.appendChild(div);
    console.log(sessionStorage.getItem('class_id'));
}

console.log("name of current user is: " + sessionStorage.getItem('name'));
console.log("name of current class is: " + sessionStorage.getItem('class_id'));

// Get posts
function getPosts(){
    db.collection(sessionStorage.getItem('class_id')).get().then(snapshot => {
    //db.collection("posts").querySelector
    // db.collection()
    //db.collection("posts").CourseID("EECS 376").get().then(snapshot => {
        snapshot.docs.forEach(docs => {
            console.log(docs.data());
            createPost(docs.data().Member, docs.data().CourseID, docs.data().Content, docs.data().Title, docs.id);
        });
    });
}

getPosts();