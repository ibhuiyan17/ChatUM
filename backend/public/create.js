document.querySelector("#submitBtn").addEventListener('click',
  function() {
      let member = document.querySelector("#member").value;
      let title = document.querySelector("#postTitle").value;
      let content = document.querySelector("#postContent").value;
      let class_id = document.querySelector("#class").value;
      //.doc(class_id).collection("class_posts")
      console.log("ding a ling");

      if (
          member === "" ||
          title === "" ||
          content === "" ||
          class_id === ""
        ) {
          alert("Fields Empty");
        } else {
          db.collection(class_id).doc().set({
              Member: member,
              Title: title,
              Content: content,
              CourseID: class_id,
            }).then(() => {
            setTimeout(1000);
            window.location = 'index.html';
            });
          
        }
        
  }
)