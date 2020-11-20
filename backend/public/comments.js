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
let commentCollection = document.querySelector("#comments-collection");
console.log(postCollection);

document.addEventListener("DOMContentLoaded", event => {
    
});

const db = firebase.firestore();



function createPost(in_member, in_class, in_content, in_title){
    let div = document.createElement("div");
    div.setAttribute("class", "post");

    let title = document.createElement("h2");
    let post_content = document.createElement("p");
    let member = document.createElement("p");
    let class_id = document.createElement("h1");



    member.textContent = "Member: " + in_member;
    post_content.textContent = in_content;
    title.textContent = "Title: " + in_title;
    class_id.textContent = "Class: " + in_class;

    div.appendChild(class_id);
    div.appendChild(title);
    div.appendChild(member);
    div.appendChild(post_content);

    postCollection.appendChild(div);
}

function createComment(in_comment){
    let div = document.createElement("div");
    div.setAttribute("class", "post");

    let comment = document.createElement("p");

    comment.textContent = in_comment;

    div.appendChild(comment);


    commentCollection.appendChild(div);
}

console.log("name of current user is: " + sessionStorage.getItem('name'));
console.log("name of current class is: " + sessionStorage.getItem('class_id'));

// Get posts
function getPosts(){
    console.log("post: " +sessionStorage.getItem('post_id'));
    db.collection(sessionStorage.getItem('class_id')).doc(sessionStorage.getItem('post_id')).get().then(snapshot => {
        createPost(snapshot.data().Member, snapshot.data().CourseID, snapshot.data().Content, snapshot.data().Title);
        snapshot.data().Comments.forEach(comment => createComment(comment));
        console.log(snapshot.data());
    });


    /*db.collection(sessionStorage.getItem('class_id')).get().then(snapshot => {
        snapshot.docs.forEach(docs => {
            console.log(docs.data());
            createPost(docs.data().Member, docs.data().CourseID, docs.data().Content, docs.data().Title, docs.id);
        });
    });*/
}

getPosts();