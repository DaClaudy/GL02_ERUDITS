import CruUnparser from "./CruUnparser.js";

const Schedule = function() {
    this.ues = [];
    this.title = '';
    this.description = '';
    this.filename = '';
    this.exemple = '';
    this.format = '';
}

Schedule.prototype.addUE = function (ue) {
    this.ues.push(ue);
}

Schedule.prototype.removeUE = function (name) {
    this.ues = this.ues.filter(ue => ue.name !== name)
}

Schedule.prototype.export = function() {
    const unparser = new CruUnparser();
    unparser.unparse(this);
}


export default Schedule;