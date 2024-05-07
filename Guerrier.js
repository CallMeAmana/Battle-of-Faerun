class Guerrier {

    constructor() {
     
        this.force = 10;
        this.nb_pv = 100;
        this.affiche= function() {
            console.log("la force "+force+"le nombre de point de vie est" +nb_pv);
    

    this.attaquer=function(guerrierCible) {
        const degats = this.calculerDegats();
        guerrierCible.subirDegats(degats);
    }

    // Fonction pour attaquer un autre guerrier et calculer les dégâts
    this.calculerDegats=function() {
        let degats = 0;
        for (let i = 0; i < this.force; i++) {
            // Générer un nombre aléatoire entre 1 et 3 inclus
            const de = Math.floor(Math.random() * 3) + 1;
            degats += de;
        }
        return degats;
    }

    // Méthode pour faire subir des dégâts au guerrier
    this.subirDegats=function(degats) {
        this.nb_pv -= degats;
        if (this.nb_pv = 0) {
            console.log(`Le guerrier est mort.`);
        }
    }
}

// Exemple d'utilisation de la classe Guerrier
const guerrier1 = new Guerrier();
const guerrier2 = new Guerrier();

console.log("PV du guerrier 2 avant attaque:", guerrier2.nb_pv);
guerrier1.attaquer(guerrier2);
console.log("PV du guerrier 2 après attaque:", guerrier2.nb_pv);

}
}
