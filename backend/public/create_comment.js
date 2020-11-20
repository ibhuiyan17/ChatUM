

document.querySelector("#commentSubmit").addEventListener('click',
function() {
    let name = document.querySelector("#name").value;
    let comment = document.querySelector("#comment").value;

    if (
        name === "" ||
        comment === ""
      ) {
        alert("Fields Empty");
      } else {
        const  arrayUnion = firebase.firestore.FieldValue.arrayUnion;
        db.collection(sessionStorage.getItem("class_id"))
          .doc(sessionStorage.getItem("post_id"))
          .update({
            Comments: arrayUnion(name + ": " + comment)
          }).then(() => {
          window.location = 'comments.html';
          setTimeout(1000);
          });
        
      }
      
})