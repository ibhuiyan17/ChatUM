import axios from 'axios';

function Button() {

  let buttonClicked = async () => {
    console.log('button clicked');
    let url = process.env.REACT_APP_BASE_URL + '/api/accounts/create-user';
    
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
