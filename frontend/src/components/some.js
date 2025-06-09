import axios from 'axios';

async function testLogin() {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', {
      username: 'kminchelle',
      password: '0lelplR',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Login success:', response.data);
  } catch (error) {
    console.log('Error:', error.response?.data || error.message);
  }
}

testLogin();