let espUrlInput = document.getElementById("espUrl");
let statusEl = document.getElementById("status");

function saveEspUrl() {
    localStorage.setItem("espUrl", espUrlInput.value);
    statusEl.innerText = "Adresă ESP salvată.";
}

function loadEspUrl() {
    const saved = localStorage.getItem("espUrl");
    if (saved) {
        espUrlInput.value = saved;
    }
}

async function fetchData() {
    const url = espUrlInput.value;
    statusEl.innerText = "Se încarcă datele...";

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Răspuns invalid");

        const data = await res.json();

        document.getElementById("pm25").innerText = data.pm25 ?? "--";
        document.getElementById("temp").innerText = data.temp ?? "--";
        document.getElementById("hum").innerText = data.hum ?? "--";
        document.getElementById("press").innerText = data.press ?? "--";

        statusEl.innerText = "Ultima actualizare: " + new Date().toLocaleTimeString();
    } catch (e) {
        statusEl.innerText = "Eroare la preluarea datelor de la ESP.";
        console.error(e);
    }
}

loadEspUrl();
fetchData();
setInterval(fetchData, 5000);
