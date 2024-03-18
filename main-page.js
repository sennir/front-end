import "./style.css";
import { fetchData } from "./fetch.js";

function logout() {
  // Poista tallennetut käyttäjätunnistetiedot
  localStorage.removeItem('token');
  window.location.href = '/index.html'; 
}

// Määrittele tapahtumankäsittelijä lomakkeen lähetykselle
document.getElementById("diaryForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    // Kerää lomakkeen tiedot FormData-objektiin
    const formData = new FormData(this);
    
    // Luo objekti, joka sisältää päiväkirjamerkinnän tiedot
    const diaryData = {
      date: formData.get('date'),
      mood: formData.get('mood'),
      weight: formData.get('weight'),
      sleep: formData.get('sleep'),
      exerciseDuration: formData.get('exerciseDuration'),
      exerciseIntensity: formData.get('exerciseIntensity'),
      content: formData.get('content')
    };
  
    try {
      // Lähetä POST-pyyntö tietokantaan
      const response = await fetch('https://hyteyksiloprojekti.northeurope.cloudapp.azure.com/api/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') 
        },
        body: JSON.stringify(diaryData)
      });
  
      // Tarkista vastauksen tila
      if (response.ok) {
        alert('Päiväkirjamerkintä tallennettu onnistuneesti!');
      } else {
        alert('Virhe tallennettaessa päiväkirjamerkintää.');
      }
    } catch (error) {
      console.error('Virhe:', error);
      alert('Jotain meni pieleen. Yritä uudelleen myöhemmin.');
    }
  });

  // tapahtumankäsittelijä uloskirjautumisnapille
  document.getElementById('logoutButton').addEventListener('click', function(event) {
  event.preventDefault();
  logout(); 
});

  async function showUserName() {
    console.log("Hei täällä ollaan! Nyt pitäisi hakea käyttäjän tiedot");
  
    const url = "https://hyteyksiloprojekti.northeurope.cloudapp.azure.com/api/auth/me";
    let token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer: " + token,
      },
    };
    fetchData(url, options).then((data) => {
      console.log(data);
      document.getElementById("name").innerHTML = data.user.username;
    });
  }


showUserName();