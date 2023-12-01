import CruBuilder from "./CruBuilder.js";
import {Day} from "./Course.js";
import ICalendarBuilder from "./ICalendarBuilder.js";

const Schedule = function() {
    this.ues = [];
    this.title = '';
    this.description = '';
    this.filename = '';
    this.exemple = '';
    this.format = '';
    this.classrooms = new Set;
    this.courses = [];
}

Schedule.prototype.addUE = function (ue) {
    this.ues.push(ue);
}

Schedule.prototype.removeUE = function (name) {
    this.ues = this.ues.filter(ue => ue.name !== name)
}

Schedule.prototype.export = function() {
    const unparser = new CruBuilder();
    unparser.unparse(this);
}

Schedule.prototype.getScheduleByDay = function (day) {
    return this.ues
        .map(value => value.courses)
        .reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue)
        }, [])
        .filter(value => value.day === Day[day]);
}

Schedule.prototype.getSchedule = function () {
    let scheduleWeek = {};
    for (const key of Object.keys(Day)) {
        scheduleWeek[key] = this.getScheduleByDay(key)
    }
    return scheduleWeek;
}

Schedule.prototype.createVisualisation = function () {
    let icalendar = new ICalendarBuilder();
    icalendar.buildCalendarFromSchedule(this.getSchedule());
}

export default Schedule;