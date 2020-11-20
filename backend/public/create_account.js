

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
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('class_id', class_id);
        
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