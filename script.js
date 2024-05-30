const audio = document.getElementById("myAudio");


class Guerrier {
    constructor(nom, force, pv, coutEntrainement, image) {
        this.nom = nom;
        this.force = force;
        this.pv = pv;
        this.coutEntrainement = coutEntrainement;
        this.image = image;
        this.ready = false;
        this.position = null;
    }

    attaquer(adversaire) {
        let degats = 0;
        for (let i = 0; i < this.force; i++) {
            degats += Math.floor(Math.random() * 3) + 1;
        }
        adversaire.subirDegats(degats);
    }

    subirDegats(degats) {
        this.pv -= degats;
        if (this.pv <= 0) {
            console.log(`${this.nom} est mort !`);
        } else {
            console.log(`${this.nom} subit ${degats} de dégâts et a maintenant ${this.pv} points de vie.`);
        }
    }
}

// Subclasses
class Nain extends Guerrier {
    constructor() {
        super("Nain", 10, 100, 1, 'images/4.png');
    }

    subirDegats(degats) {
        super.subirDegats(degats / 2);
    }
}

class ChefNain extends Guerrier {
    constructor() {
        super("Chef Nain", 10, 100, 3, 'images/red.png');
    }

    subirDegats(degats) {
        super.subirDegats(degats / 2);
    }
}

class Elfe extends Guerrier {
    constructor() {
        super("Elfe", 10, 100, 2, 'images/6.png');
    }
}

class ChefElfe extends Guerrier {
    constructor() {
        super("Chef Elfe", 10, 100, 4, 'images/8.png');
    }
}

// Initialisation des guerriers et des positions
const warriors = {
    Rouge: [],
    Bleu: []
};

const resources = {
    Rouge: 3,
    Bleu: 3
};

document.addEventListener("DOMContentLoaded", function () {
    var titre2 = document.getElementById("titre2");
    var titre1 = document.getElementById("titre1");
    var table = document.getElementById("myTable");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btnJeux = document.getElementById("btn-jeux");

    titre2.addEventListener("click", function () {
        table.style.display = "table";
        titre1.style.display = "none";
        titre2.style.display = "none";
        btn1.style.display = "block";
        btn2.style.display = "block";
        btnJeux.style.display = "block";
    });

    btnJeux.addEventListener("click", () => setInterval(playTurn, 1000)); // Ajout de setInterval pour exécuter playTurn à chaque seconde
});

function afficherImagesrouge() {
    openModal('myModal');
}

function afficherImagesbleu() {
    openModal('myModal1');
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function fermerModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function trainWarrior(warrior, team) {
    const resourceCountElement = document.getElementById(team === 'Rouge' ? 'resourceCountRed' : 'resourceCountBlue');
    let resourceCount = parseInt(resourceCountElement.textContent);

    if (resourceCount >= warrior.coutEntrainement) {
        resourceCount -= warrior.coutEntrainement;
        resourceCountElement.textContent = resourceCount;

        warrior.ready = true;
        warrior.position = team === 'Rouge' ? 0 : 4;
        warriors[team].push(warrior);

        fermerModal(team === 'Rouge' ? 'myModal' : 'myModal1');
        displayWarriors();
    } else {
        alert(`Pas assez de ressources pour entraîner le ${warrior.nom}`);
    }
}

function displayWarriors() {
    for (let i = 0; i < 5; i++) {
        document.getElementById(`square-${i}`).innerHTML = '';
    }

    for (const [team, teamWarriors] of Object.entries(warriors)) {
        teamWarriors.forEach(warrior => {
            if (warrior.ready) {
                const square = document.getElementById(`square-${warrior.position}`);
                const img = document.createElement('img');

                switch (warrior.nom) {
                    case 'Chef Nain':
                        img.src = (team === 'Rouge') ? 'images/red.png' : 'images/3.png';
                        break;
                    case 'Nain':
                        img.src = (team === 'Rouge') ? 'images/4.png' : 'images/5.png';
                        break;
                    case 'Chef Elfe':
                        img.src = (team === 'Rouge') ? 'images/8.png' : 'images/9.png';
                        break;
                    case 'Elfe':
                        img.src = (team === 'Rouge') ? 'images/6.png' : 'images/7.png';
                        break;
                    default:
                        img.src = '';
                }
                img.alt = warrior.nom;
                img.classList.add('icon', 'warrior-image'); // Ajoutez une classe spécifique pour les images des guerriers
                square.appendChild(img);
            }
        });
    }
}


// Ajoutez une variable pour garder une trace de l'état du jeu

let gameStarted = false;
function playTurn() {
    const bluesReady = warriors['Bleu'].some(warrior => warrior.ready);
    const redsReady = warriors['Rouge'].some(warrior => warrior.ready);

    if (!gameStarted) {
        if (!bluesReady && !redsReady) {
            Toastify({
                text: "Les guerriers des deux châteaux ne sont pas prêts à battre !",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center"
            }).showToast();
            return;
        }

        if (!bluesReady) {
            Toastify({
                text: "Les guerriers du château Bleu ne sont pas prêts à battre !",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center"
            }).showToast();
            return;
        }

        if (!redsReady) {
            Toastify({
                text: "Les guerriers du château Rouge ne sont pas prêts à battre !",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center"
            }).showToast();
            return;
        }

        gameStarted = true;
    }

    moveWarriors();
    battle();

    const winningTeam = determineWinningTeam();
    if (winningTeam) {
        Toastify({
            text: `Les guerriers du château ${winningTeam} ont gagné !`,
            duration: 5000,
            close: true,
            gravity: "top",
            position: "center"
        }).showToast();
        clearInterval(playTurn);

        // Hide Train and Play Turn buttons
        document.getElementById("btn1").style.display = "none";
        document.getElementById("btn2").style.display = "none";
        document.getElementById("btn-jeux").style.display = "none";
    } else {
        const redsOnLastSquare = warriors['Rouge'].some(warrior => warrior.position === 4);
        const bluesOnLastSquare = warriors['Bleu'].some(warrior => warrior.position === 0);

        if (redsOnLastSquare && bluesOnLastSquare) {
            // Both teams reached the last square without encountering opponents
            Toastify({
                text: "Match nul ! Aucun guerrier n'a rencontré d'adversaire.",
                duration: 5000,
                close: true,
                gravity: "top",
                position: "center"
            }).showToast();
            clearInterval(playTurn);
        } else if (redsOnLastSquare) {
            // Red team reached the last square without encountering opponents
            Toastify({
                text: "Les guerriers du château Rouge ont gagné !",
                duration: 5000,
                close: true,
                gravity: "top",
                position: "center"
            }).showToast();
            clearInterval(playTurn);

            // Hide Train and Play Turn buttons
            document.getElementById("btn1").style.display = "none";
            document.getElementById("btn2").style.display = "none";
            document.getElementById("btn-jeux").style.display = "none";
        } else if (bluesOnLastSquare) {
            // Blue team reached the last square without encountering opponents
            Toastify({
                text: "Les guerriers du château Bleu ont gagné !",
                duration: 5000,
                close: true,
                gravity: "top",
                position: "center"
            }).showToast();
            clearInterval(playTurn);

            // Hide Train and Play Turn buttons
            document.getElementById("btn1").style.display = "none";
            document.getElementById("btn2").style.display = "none";
            document.getElementById("btn-jeux").style.display = "none";
        }
    }
}










function moveWarriors() {
    for (const warrior of warriors['Rouge']) {
        const enemiesAtPosition = warriors['Bleu'].filter(w => w.position === warrior.position);
        if (enemiesAtPosition.length === 0) {
            warrior.position++;
        }
    }

    for (const warrior of warriors['Bleu']) {
        const enemiesAtPosition = warriors['Rouge'].filter(w => w.position === warrior.position);
        if (enemiesAtPosition.length === 0) {
            warrior.position--;
        }
    }

    displayWarriors();
}

function battle() {
    const positionBattles = {};

    for (const team of ['Rouge', 'Bleu']) {
        warriors[team].forEach(warrior => {
            if (!positionBattles[warrior.position]) {
                positionBattles[warrior.position] = { Rouge: [], Bleu: [] };
            }
            positionBattles[warrior.position][team].push(warrior);
        });
    }

    for (const position in positionBattles) {
        const blues = positionBattles[position]['Bleu'].filter(w => w.pv > 0);
        const reds = positionBattles[position]['Rouge'].filter(w => w.pv > 0);

        if (blues.length > 0 && reds.length > 0) {
            let i = 0;
            while (i < blues.length && reds.length > 0) {
                blues[i].attaquer(reds[0]);
                if (reds[0].pv <= 0) {
                    reds.shift();
                } else {
                    i++;
                }
            }

            i = 0;
            while (i < reds.length && blues.length > 0) {
                reds[i].attaquer(blues[0]);
                if (blues[0].pv <= 0) {
                    blues.shift();
                } else {
                    i++;
                }
            }
        }
    }

    warriors['Bleu'] = warriors['Bleu'].filter(w => w.pv > 0);
    warriors['Rouge'] = warriors['Rouge'].filter(w => w.pv > 0);
    displayWarriors();
}

function determineWinningTeam() {
    const lastSquareRed = 4; // Dernier carreau du camp Rouge
    const lastSquareBlue = 0; // Dernier carreau du camp Bleu

    const redsAlive = warriors['Rouge'].some(warrior => warrior.position === lastSquareBlue);
    const bluesAlive = warriors['Bleu'].some(warrior => warrior.position === lastSquareRed);

    if (redsAlive && !bluesAlive) {
        return 'Rouge';
    } else if (!redsAlive && bluesAlive) {
        return 'Bleu';
    }

    return null;
}






function trainWarriors() {

}

function trainWarriors(warrior, team) {
    const resourceCountElement = document.getElementById(team === 'Rouge' ? 'resourceCountRed' : 'resourceCountBlue');
    let resourceCount = parseInt(resourceCountElement.textContent);

    if (resourceCount >= warrior.coutEntrainement) {
        resourceCount -= warrior.coutEntrainement;
        resourceCountElement.textContent = resourceCount;

        warrior.ready = true;
        warriors[team].push(warrior);

        fermerModal(team === 'Rouge' ? 'myModal' : 'myModal1');
        displayWarriors();
    } else {
        alert(`Pas assez de ressources pour entraîner le ${warrior.nom}`);
    }
}

document.getElementById('mute').addEventListener('click', function () {
    var audio = document.getElementById('myAudio');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0; // Réinitialise l'audio au début
    }
});