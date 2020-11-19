document.querySelector("#accountSubmit").addEventListener('click',
function() {
    let name = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;
    let class_id = document.querySelector("#class").value;

    if (
        name === "" ||
        password === "" ||
        class_id === ""
      ) {
        alert("Fields Empty");
      } else {
        db.collection("users")
          .doc()
          .set({
            username: name,
            password: password,
            courses: [class_id],
          }).then(() => {
          setTimeout(1000);
          window.location = 'index.html';
          });
        
      }
      
})