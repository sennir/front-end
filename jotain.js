// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');

  // # Login
  // POST http://localhost:3000/api/auth/login
  // content-type: application/json

  // {
  //   "username": "user",
  //   "password": "secret"
  // }

  const url = 'http://localhost:3000/api/auth/login';

  const form = document.querySelector('.login_form');

  const data = {
    username: form.querySelector('input[name=username]').value,
    password: form.querySelector('input[name=password]').value,
  };

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  // 1. Käy Ulla läpi tämä auth sivu ja sync/await rakenne vaihtoehto
  // Tähän redirect
  // samoin voi laittaa userID:n talteen..

  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
    console.log(data.token);
    localStorage.setItem('token', data.token);
    logResponse('loginResponse', `localStorage set with token value: ${data.token}`);
    if (data.token == undefined) {
      alert('Unauthorized: username or password incorrect!');
    } else {
      alert('Authorized: you will now be redirected in 3 seconds');
      setTimeout(function () {
        //window.location.href = 'start-api-harjoituspohja.html';
      }, 3000);
    }
  });
});

// Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', async () => {
  console.log('Testataan TOKENIA ja haetaan käyttäjän tiedot');

  // # Get user info by token (requires token)
  // GET http://localhost:3000/api/auth/me
  // Authorization: Bearer (put-user-token-here)

  const url = 'http://localhost:3000/api/auth/me';
  const muntokeni = localStorage.getItem('token');
  console.log('Tämä on haettu LocalStoragesta', muntokeni);

  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: 'Bearer: ' + muntokeni,
    },
  };

  console.log(options);

  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
    logResponse('meResponse', `Authorized user info: ${JSON.stringify(data)}`);
  });
});

// Haetaan nappi josta tyhjennetään localStorage
const clear = document.querySelector('#clearButton');
clear.addEventListener('click', clearLocalStorage);

// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}

// Apufunktio, Tyhjennä local storage
function clearLocalStorage() {
  localStorage.removeItem('token');
  logResponse('clearResponse', 'localStorage cleared!');
}

// Haetaan tallenna-nappi päiväkirjan tiedoille
const saveEntryButton = document.querySelector('#saveEntryButton');

// Lisätään tapahtumankäsittelijä tallenna-napille
saveEntryButton.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Päiväkirjamerkintä tallennetaan');

  const url = 'http://localhost:3000/api/diary';

  // Kerätään päiväkirjan tiedot lomakkeelta
  const form = document.querySelector('#diaryForm');
  const formData = new FormData(form);

  // Muodostetaan päiväkirjan tiedot objektiksi
  const diaryData = {
    date: formData.get('date'),
    mood: formData.get('mood'),
    weight: formData.get('weight'),
    sleep: formData.get('sleep'),
    content: formData.get('content'),
    exercise: form.querySelector('input[name=exercise]').checked,
    exerciseDuration: formData.get('exerciseDuration'),
    exerciseIntensity: formData.get('exerciseIntensity')
  };

  // Asetetaan POST-pyynnön vaihtoehdot
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(diaryData)
  };

  // Yritetään lähettää POST-pyyntö ja käsitellään vastaus
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      alert('Päiväkirjamerkintä tallennettu onnistuneesti!');
      // Voit tässä vaiheessa ohjata käyttäjän halutulle sivulle tai tehdä jotain muuta tarpeen mukaan
    } else {
      alert('Virhe tallennettaessa päiväkirjamerkintää.');
    }
  } catch (error) {
    console.error('Virhe:', error);
    alert('Jotain meni pieleen. Yritä uudelleen myöhemmin.');
  }
});































//main-page
const bt1 = document.querySelector(".get_entry");
bt1.addEventListener("click", async () => {
  console.log("Klikki toimii");
  const url = "http://localhost:3000/api/entries/1";

  fetchData(url).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
  });

  // # Get entries by id
  // # GET http://localhost:3000/api/entries/:id
});

const button3 = document.querySelector(".get_users");
button3.addEventListener("click", getUsers);


async function getUsers() {
  console.log("haetaan kaikki käyttäjät");
  const url = "http://localhost:3000/api/users";
  let token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer: " + token,
    },
  };

  fetchData(url, options).then((data) => {
    createTable(data);
  });
}

function createTable(data) {
  console.log(data);

  const tbody = document.querySelector(".tbody");

  data.forEach((rivi) => {
    console.log(rivi.username, rivi.user_id, rivi.user_level);

    const tr = document.createElement('tr');

    const td1 = document.createElement('td')
    td1.innerText = rivi.username;

    const td2 = document.createElement('td')
    td2.innerText = rivi.username;

    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  });
}

function deleteUser(evt) {

    const url = `http://127.0.0.1:3000/api/users/${id}`;
    let token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer: ' + token,
        },
    };

    const answer = confirm(`Oletko varma, että haluat poistaa käyttäjän nimeltä: ${id}`);
    if (answer) {
        fetchData(url, options).then((data) => {
            console.log(data);
            getUsers();
        });
    }
}


async function showUserName() {
  console.log("Hei täällä ollaan! Nyt pitäisi hakea käyttäjän tiedot");

  // hae käyttäjän omat tiedot
  // 1. joko lokal storagesta jos on tallessa
  //let name = localStorage.getItem('name');

  // hae elementti johon printtaat tiedot
  //console.log('Nimesi on:', name);
  //document.getElementById('name').innerHTML = name;

  // 2. hae uudestaan /api/auth/me endpointin kautta

  const url = "http://localhost:3000/api/auth/me";
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
    // muita hakuja ja tietoja sivulle, kuten email ym. mitä halutaan näyttää
  });
}


// 1. testataan ensin YKSI endpoint joka ei vaadi tokenia
// 2. uudelleen strukturoidaan koodi jotta se on modulaarisempi

// tämä toimi ennen autentikaatiota, nyt tarvitsee tokenin, siistitään pian!
// sivuille on nyt myös lisätty navigaatio html sivuun, sekä siihen sopiva CSS koodi, hae siis uusi HTML ja UUSI CSS ennen kun aloitat

async function getAllUsers() {
  console.log("toimii!");

  try {
    const response = await fetch("http://127.0.0.1:3000/api/users");
    console.log(response);
    const data = await response.json();
    console.log(data);

    data.forEach((element) => {
      console.log(element.username);
    });

    // tänne tiedot
    const tbody = document.querySelector(".tbody");
    tbody.innerHTML = "";

    data.forEach((element) => {
      console.log(element.username);

      // Create table row element
      var tr = document.createElement("tr");

      // td1 Username
      var td1 = document.createElement("td");
      td1.innerText = element.username;

      // td2
      var td2 = document.createElement("td");
      td2.innerText = element.user_level;

      // td3
      var td3 = document.createElement("td");
      var button1 = document.createElement("button");
      button1.className = "check";
      button1.setAttribute("data-id", "1");
      button1.innerText = "Info";
      td3.appendChild(button1);

      // td4
      var td4 = document.createElement("td");
      var button2 = document.createElement("button");
      button2.className = "del";
      button2.setAttribute("data-id", "1");
      button2.innerText = "Delete";
      td4.appendChild(button2);

      // td5
      var td5 = document.createElement("td");
      td5.innerText = element.user_id;

      // Append table data elements to the table row element
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      // Append the table row element to the table (assuming you have a table with the id 'myTable')
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error);
  }
}
