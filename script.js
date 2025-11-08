const lock = document.getElementById("lock");
const input = document.getElementById("username");
const lockedScreen = document.getElementById("lockedScreen");
const fallText = document.getElementById("fallText");
const numberLock = document.getElementById("numberLock");
const overlay = document.getElementById("overlay");
const overlayContent = document.getElementById("overlayContent");
const closeOverlay = document.getElementById("closeOverlay");

// Benutzernamenliste
let usernames = [];
let lastClick = 0;

// Schloss-Doppelclick
lock.addEventListener("click", () => {
  const username = input.value.trim();
  if(!username){
    alert("Bitte zuerst einen Benutzernamen eingeben!");
    return;
  }

  // Doppelklick innerhalb 3 Sekunden
  const now = Date.now();
  if(now - lastClick < 3000){
    triggerLockedScreen(username);
  }
  lastClick = now;
});

// Locked-Screen
function triggerLockedScreen(username){
  // Benutzernamen speichern
  if(!usernames.includes(username)) usernames.push(username);

  // Locked-Screen anzeigen
  lockedScreen.classList.add("active");
  fallText.classList.remove("active");
  void fallText.offsetWidth;
  fallText.classList.add("active");

  // Zahlenschloss sichtbar
  numberLock.style.display = "flex";

  // Startseite ausblenden
  document.querySelector(".startpage").style.display = "none";
}

// Interaktive Buchstaben
fallText.querySelectorAll("span").forEach(span=>{
  span.addEventListener("click",()=>{
    overlayContent.innerHTML = `<h2>Buchstabe ${span.textContent}</h2>
      <p>Hier kann ein interaktiver Inhalt zum Thema Verschlüsselung erscheinen.</p>`;
    overlay.classList.add("active");
  });
});

// Overlay schließen
closeOverlay.addEventListener("click",()=>overlay.classList.remove("active"));

// Zahlenschloss mit Klick drehen
document.querySelectorAll(".number-dial").forEach(dial=>{
  dial.addEventListener("click",()=>{
    let val = parseInt(dial.dataset.value);
    val = (val+1)%10;
    dial.dataset.value = val;
    dial.textContent = val;
  });
});
