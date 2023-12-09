const CruBuilder = function() {
    this.name = '';
}

CruBuilder.prototype.build = function (cruParser, ues) {
    let time = Date.now();
    let result = "SCHEDULE.CRU - Emploi du temps\r\n";
    result += "Emploi du temps avec différentes salles au format cru"
    result += "+UVUV"
    result += cruParser.schedule.exemple;
    let schedule = cruParser.schedule.ues.filter(v => ues.includes(this.name))
    for (let ues of schedule) {
        result += this.ue();
    }
    time = (new Date(time.getTime())) - (new Date(Date.now())).getTime();
    result += "Page générée en :" + time +" sec";
    return true;
}

CruBuilder.prototype.ue = function () {
    return '';
}

CruBuilder.prototype.course = function (){
    return '';
}

export default CruBuilder;