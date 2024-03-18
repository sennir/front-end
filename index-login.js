import './style.css';
import { fetchData } from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginUser = document.querySelector('.loginuser');
  const usernameInput = document.querySelector('input[name=username]');
  const passwordInput = document.querySelector('input[name=password]');

  usernameInput.addEventListener('input', toggleButton);
  passwordInput.addEventListener('input', toggleButton);

  function toggleButton() {
    // Tarkista, ovatko molemmat kentät täytettyjä
    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Jos kentät on täytetty, ota nappi käyttöön; muuten poista se käytöstä
    if (usernameValue !== '' && passwordValue !== '') {
      loginUser.disabled = false;
    } else {
      loginUser.disabled = true;
    }
  }

  loginUser.addEventListener('click', async (evt) => {
    evt.preventDefault();
    console.log('Nyt logataan sisään');

    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Tarkista, ovatko kentät tyhjiä
    if (usernameValue === '' || passwordValue === '') {
      alert('Täytä kaikki kentät ennen kirjautumista.');
      return; 
    }

    const url = 'https://hyteyksiloprojekti.northeurope.cloudapp.azure.com//api/auth/login';
    const form = document.querySelector('.login_form');

    const data = {
      username: usernameValue,
      password: passwordValue,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    console.log(data);

    try {
      const responseData = await fetchData(url, options);
      console.log('Responsedata:', responseData);
      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        alert('Sisään kirjautuminen onnistui. Siirryt eteenpäin kun painat ok.');
        setTimeout(function () {
          window.location.href = 'main-page.html'; // Ohjataan uudelle sivulle
        }, 500);
      } else {
        alert('Väärä käyttäjänimi tai salasana!');
      }
    } catch (error) {
      console.error(error);
      alert('Error. Yritä myöhemmin uudestaan.');
    }
  });
});
