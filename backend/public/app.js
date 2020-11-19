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
console.log(postCollection);

document.addEventListener("DOMContentLoaded", event => {
    
});

const db = firebase.firestore();

function createPost(in_member, in_class, in_content, in_title, state){
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
    comments.setAttribute(onclick, "window.location = 'create_account.html'")

    div.appendChild(class_id);
    div.appendChild(title);
    div.appendChild(member);
    div.appendChild(post_content);
    div.appendChild(comments);

    postCollection.appendChild(div);
}

// Get posts
function getPosts(){
    db.collection("posts").get().then(snapshot => {
        snapshot.docs.forEach(docs => {
            console.log(docs.data());
            createPost(docs.data().Member, docs.data().CourseID, docs.data().Content, docs.data().Title);
        });
    });
}

getPosts();