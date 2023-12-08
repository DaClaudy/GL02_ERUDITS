#!/usr/bin/env node

import User from "./User.js"
import pkg from "@caporal/core"
const { program } = pkg;
import inquirer from "inquirer";
import CruParser from "./CruParser.js";
import fs from "fs";

let user = new User("bubulle");
const NB_OPTIONS = [1, 2];

function checkNoUpdate() {
    return false;
}

if (user.isConnected() && user.hasPermission()){
    program
        .command('start', 'Start the programme')
        .action(startProgram)
        .command('test', "Test votre jeu de données au format CRU")
        .argument('<directoryName>', "Nom du dossier à tester")
        .action(({args }) => {
            let parser = new CruParser();
            if (fs.existsSync('schedule.json') && fs.existsSync('syncDate') && checkNoUpdate()){

            }
            parser.parseDirectory(args.directoryName)
            //logger.info("--------------------------CLASSROOMS : -----------------------------");
            //logger.info(JSON.stringify(Array.from(parser.classrooms).sort(), null, 2));
            //logger.info("----------------------------- UES : --------------------------------");
            //logger.info(JSON.stringify(parser.ues.map(value => value.name), null, 2));
            //logger.info(JSON.stringify(parser.schedule.ues, null, 2));
            //logger.info(JSON.stringify(parser.schedule.getSchedule(), null, 2))
            parser.schedule.createVisualisation()
        })


    program.run();
}
