import fs from "fs";

const CruBuilder = function() {
    this.name = '';
}

CruBuilder.prototype.build = function (cruParser, ues) {
    let time = Date.now();
    let result = "SCHEDULE.CRU - Emploi du temps\r\n";
    result += "Emploi du temps avec différentes salles au format cru\r\n"
    result += "+UVUV\r\n";
    result += cruParser.schedule.exemple;
    let schedule = cruParser.schedule.ues.filter(v => ues.includes(this.name))
    for (let ue of schedule) {
        result += this.ue(ue);
    }
    time = (new Date(time.getTime())) - (new Date(Date.now())).getTime();
    result += "Page générée en :" + time +" sec";
    fs.writeFileSync('schedule.cru', result);
    return true;
}

CruBuilder.prototype.ue = function (ue) {
    let result = "+"+ ue.name +"\r\n";
    return '';
}

CruBuilder.prototype.course = function (){
    return '';
}

export default CruBuilder;