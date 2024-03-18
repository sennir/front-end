import "./style.css";
import { fetchData } from "./fetch.js";

// Funktio päiväkirjamerkintöjen hakemiseen ja näyttämiseen
async function fetchAndDisplayDiaryEntries() {
    try {
        // pyyntö palvelimelle päiväkirjamerkintöjen hakemiseksi
        const response = await fetch('https://hyteyksiloprojekti.northeurope.cloudapp.azure.com/api/diary/history', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Lisää tarvittavat kirjautumistiedot
            }
        });

        if (response.ok) {
            const entries = await response.json();

            // Käsittele päiväkirjamerkinnät ja näytä ne sivulla
            const entriesContainer = document.getElementById('entriesContainer');
            entriesContainer.innerHTML = ''; 
            entries.forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.textContent = `${entry.date}: ${entry.content}`;
                entriesContainer.appendChild(entryElement);
            });
        } else {
            console.error('Error fetching diary entries:', response.status);
            alert('Error fetching diary entries. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
}

// Lisää tapahtumankäsittelijä nappiin, jolla päiväkirjamerkinnät haetaan ja näytetään
document.getElementById('fetchOldEntriesButton').addEventListener('click', function() {
    fetchAndDisplayDiaryEntries();
});
