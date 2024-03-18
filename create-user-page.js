import './style.css';
import { fetchData } from './fetch.js';

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt luodaan käyttäjä');

  const form = document.querySelector('.create_user_form');
  const username = form.querySelector('input[name=username]').value;
  const password = form.querySelector('input[name=password]').value;
  const email = form.querySelector('input[name=email]').value;

  // Tarkistetaan, ovatko kaikki kentät täytettyjä
  if (!username || !password || !email) {
    alert('Täytä kaikki kentät ennen käyttäjän luomista.');
    return;
  }

  const url = 'https://hyteyksiloprojekti.northeurope.cloudapp.azure.com/api/users';

  const data = {
    username: username,
    password: form.querySelector('input[name=password]').value,
    email: form.querySelector('input[name=email]').value,
  };

  const options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };

  try {
    const responseData = await fetchData(url, options);
    console.log(responseData);
    alert('Uusi käyttäjä on luotu onnistuneesti! Nyt voi kirjautua sisään etusivulla');
  } catch (error) {
    console.error(error);
  }
});


