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

function startProgram({logger}) {
    logger.info("ORUS - OrgaRoomUniSealand");
    logger.info("Bonjour, que voulez vous faire aujourd'hui ?\n" +
        "1) Voir votre emploi du temps\n" +
        "2) Voir la liste des salles\n")
    inquirer
        .prompt([{name: "action", type: "number", message: "Entrez le chiffre de l'action choisie : "}])
        .then((answers) => switchActions(logger, answers))
        .catch((error) => {
            logger.error(error.message)
        });
}

function switchActions(logger, answers) {
    if (Number.isInteger(answers.action) && NB_OPTIONS.find(v => answers.action === v)){
        logger.info("Vous avez choisi l'option : "+answers.action)
    }
    switch (answers.action) {
        case 1:
            visualiseSchedule();
            break;
        case 2:
            break;
    }
}


function visualiseSchedule() {
    inquirer
        .prompt({message: "Entrez vos matières séparer par une virgule : ", type: "string", name: "courses"}, () => {})
        .then((answers) => {
            let tokenUes = answers.courses.split(/ , |, | ,|,|/);
            console.log(tokenUes);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAH");
        })

}


