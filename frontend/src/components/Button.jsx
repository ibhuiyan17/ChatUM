import axios from 'axios';

function Button() {

  let buttonClicked = async () => {
    console.log('button clicked');
    let url = 'http://localhost:5001/webapp-17d6b/us-central1/api/accounts/create-user';
    
    try {
      await axios.post(url, {
        'username': 'ibhuiyanss',
        'password': 'password123'
      });
      console.log('success');
    } catch (err) {
      console.log(err);
    }
    

  };

  return (
    <button onClick={buttonClicked}>hello</button>
  );
}

export default Button;
