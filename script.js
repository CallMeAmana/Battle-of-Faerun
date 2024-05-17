/*document.addEventListener("DOMContentLoaded", function() {
    var titre2 = document.getElementById("titre2");
    var titre1 = document.getElementById("titre1");
    var table = document.getElementById("myTable");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");

    titre2.addEventListener("click", function() {
      table.style.display = "table"; // Show the table
      titre1.style.display = "none"; // Hide the "click to start" heading
      titre2.style.display = "none"; // Hide the "click to start" heading
      btn1.style.display= "block";
      btn2.style.display= "block";
     
    });
  });



  function afficherImagesrouge() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  
  function afficherModal() {
    var modal = document.getElementById("myModal");
    modal.classList.add("show"); // Ajoute la classe show pour afficher le modal
  }
  


  function fermerModal() {
    var modal = document.getElementById("myModal");
    var modal1 = document.getElementById("myModal1");
    modal.style.display = "none";
    modal1.style.display = "none";
  }
  
  window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  function afficherImagesbleu() {
    var modal = document.getElementById("myModal1");
    modal.style.display = "block";
  }
  
  function afficherModal() {
    var modal = document.getElementById("myModal1");
    modal.classList.add("show"); // Ajoute la classe show pour afficher le modal
  }

  class Guerrier {
    constructor(nom, force, pv, coutEntrainement) {
        this.nom = nom;
        this.force = force;
        this.pv = pv;
        this.coutEntrainement = coutEntrainement;
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

class Nain extends Guerrier {
    constructor() {
        super("Nain", 10, 100, 1);
    }

    subirDegats(degats) {
        super.subirDegats(degats / 2);
    }
}

class ChefNain extends Guerrier {
    constructor() {
        super("Chef Nain", 20, 200, 3);
    }

    subirDegats(degats) {
        super.subirDegats(degats / 2);
    }
}

class Elfe extends Guerrier {
    constructor() {
        super("Elfe", 8, 80, 2);
    }
}

class ChefElfe extends Guerrier {
    constructor() {
        super("Chef Elfe", 18, 180, 4);
    }
}

// Fonction pour entraîner un guerrier
function trainWarrior(guerrier) {
    var resourceCountElement = document.getElementById("resourceCount");
    var resourceCount = parseInt(resourceCountElement.textContent);

    if (resourceCount >= guerrier.coutEntrainement) {
        resourceCount -= guerrier.coutEntrainement;
        resourceCountElement.textContent = resourceCount;
        console.log("Guerrier " + guerrier.nom + " entraîné avec succès!");
        // Ajoutez ici le code pour déplacer l'image du guerrier à côté du tableau ou toute autre logique nécessaire
    } else {
        console.log("Pas assez de ressources pour entraîner le " + guerrier.nom);
    }
}
*/
document.addEventListener("DOMContentLoaded", function() {
    var titre2 = document.getElementById("titre2");
    var titre1 = document.getElementById("titre1");
    var table = document.getElementById("myTable");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");

    titre2.addEventListener("click", function() {
        table.style.display = "table";
        titre1.style.display = "none";
        titre2.style.display = "none";
        btn1.style.display = "block";
        btn2.style.display = "block";
    });
});

class Guerrier {
    constructor(nom, force, pv, coutEntrainement, image) {
        this.nom = nom;
        this.force = force;
        this.pv = pv;
        this.coutEntrainement = coutEntrainement;
        this.image = image;
        this.ready = false;
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
        super("Chef Nain", 20, 200, 3, 'images/red.png');
    }

    subirDegats(degats) {
        super.subirDegats(degats / 2);
    }
}

class Elfe extends Guerrier {
    constructor() {
        super("Elfe", 8, 80, 2, 'images/6.png');
    }
}

class ChefElfe extends Guerrier {
    constructor() {
        super("Chef Elfe", 18, 180, 4, 'images/8.png');
    }
}

const warriors = {
    Rouge: [],
    Bleu: []
};

const teamPositions = {
    Rouge: 0,
    Bleu: 4
    };
    
    const resources = {
    Rouge: 3,
    Bleu: 3
    };
    
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
    warriors[team].push(warrior);

    fermerModal(team === 'Rouge' ? 'myModal' : 'myModal1');
    displayWarriors();
} else {
    alert(`Pas assez de ressources pour entraîner le ${warrior.nom}`);
}
}

function displayWarriors() {
    for (const [team, teamWarriors] of Object.entries(warriors)) {
        const position = teamPositions[team];
        const square = document.getElementById(`square-${position}`);
        square.innerHTML = '';
        
        if ((team === 'Rouge' && position < 3) || (team === 'Bleu' && position >= 3)) {
            // Ne générer les images que sur le côté correspondant à l'équipe
            teamWarriors.forEach(warrior => {
                if (warrior.ready) {
                    const img = document.createElement('img');
                    // Utilisez les bonnes images en fonction de l'équipe et du nom du guerrier
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
                            img.src = ''; // Si le nom du guerrier n'est pas reconnu, ne pas afficher d'image
                    }
                    img.alt = warrior.nom; // Assurez-vous d'ajouter un texte alternatif approprié
                    img.classList.add('icon');
                    square.appendChild(img);
                }
            });
        }
    }
}



document.addEventListener("DOMContentLoaded", function() {
var titre2 = document.getElementById("titre2");
var titre1 = document.getElementById("titre1");
var table = document.getElementById("myTable");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
titre2.addEventListener("click", function() {
    table.style.display = "table";
    titre1.style.display = "none";
    titre2.style.display = "none";
    btn1.style.display = "block";
    btn2.style.display = "block";
});
});

window.onclick = function(event) {
var modal = document.getElementById("myModal");
var modal1 = document.getElementById("myModal1");
if (event.target == modal) {
modal.style.display = "none";
} else if (event.target == modal1) {
modal1.style.display = "none";
}
}