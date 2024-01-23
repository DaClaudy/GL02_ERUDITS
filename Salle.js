class Cour {
    constructor(uv, creneaux = []) {
        this.uv = uv;
        this.creneaux = creneaux;
    }

    addCreneau(creneau) {
        this.creneaux.push(creneau);
    }
}

module.exports = Cour;
