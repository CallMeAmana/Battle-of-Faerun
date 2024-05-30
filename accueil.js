

// Récupérer le bouton de démarrage
const redirectButton = document.getElementById("titre2");

// Ajouter un écouteur d'événement pour le clic sur le bouton
redirectButton.addEventListener("click", function() {
    
        // Rediriger vers la page "home.html"
        window.location.href = "home.html?playMusic=true";
   
});


const urlParams = new URLSearchParams(window.location.search);
const playMusic = urlParams.get('playMusic');

// Vérifier si le paramètre playMusic est défini et vrai
if (playMusic === 'true') {
    // Récupérer l'élément audio
    const audio = document.getElementById("myAudio");
    // Lire l'audio
    audio.play();
}
