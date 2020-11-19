document.querySelector("#submitBtn").addEventListener('click',
function() {
    let member = document.querySelector("#member").value;
    let title = document.querySelector("#postTitle").value;
    let content = document.querySelector("#postContent").value;
    let class_id = document.querySelector("#class").value;

    if (
        member === "" ||
        title === "" ||
        content === "" ||
        class_id === ""
      ) {
        alert("Fields Empty");
      } else {
        db.collection("posts")
          .doc()
          .set({
            Member: member,
            Title: title,
            Content: content,
            CourseID: class_id,
          }).then(() => {
          setTimeout(1000);
          window.location = 'index.html';
          });
        
      }
      
})