#!/usr/bin/env node

import User from "./User.js"
import pkg from "@caporal/core"
const { program } = pkg;
import inquirer from "inquirer";
import CruParser from "./CruParser.js";
import fs from "fs";

let user = new User("bubulle");
const NB_OPTIONS = [1, 2];
let cruParser = new CruParser();
const DATA_DIR_NAME = 'SujetA_data';

if (user.isConnected() && user.hasPermission()){
    program
        .version('1.0.0')
        .help("1) Changer le contenu du dossier SujetA_data, par votre propre jeu de données" +
            "2) Lancer la commande npm ./homescreen start " +
            "3) Choisissez les actions que vous voulez exécuter")
        .command('start', 'Start the programme')
        .action(startProgram)
        .command('test', "Test votre jeu de données au format CRU")
        .argument('<directoryName>', "Nom du dossier à tester")
        .action(({args }) => {
            parseDataDir(args.directoryName);
            //logger.info("--------------------------CLASSROOMS : -----------------------------");
            //logger.info(JSON.stringify(Array.from(parser.classrooms).sort(), null, 2));
            //logger.info("----------------------------- UES : --------------------------------");
            //logger.info(JSON.stringify(parser.ues.map(value => value.name), null, 2));
            //logger.info(JSON.stringify(parser.schedule.ues, null, 2));
            //logger.info(JSON.stringify(parser.schedule.getSchedule(), null, 2))
            cruParser.schedule.createVisualisation()
        })


    program.run();
}

function startProgram({logger}) {
    parseDataDir(DATA_DIR_NAME);
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


function parseDataDir(dir) {
   /* if (checkParseDir(dir)){
        cruParser = JSON.parse(fs.readFileSync(dir+'/data.json', 'utf8'));
    } else {*/
        cruParser.parseDirectory(dir);
        fs.writeFileSync(dir+'/data.json', JSON.stringify(cruParser, null, 2));
    //}
}

function checkParseDir(dir){
    return fs.existsSync(dir+'/data.json');
}

function switchActions(logger, answers) {
    if (Number.isInteger(answers.action) && NB_OPTIONS.find(v => answers.action === v)){
        logger.info("Vous avez choisi l'option : "+answers.action)
    }
    switch (answers.action) {
        case 1:
            visualiseSchedule(logger);
            break;
        case 2:
            break;
    }
}


function visualiseSchedule(logger) {
    const type = [1, 2]
    inquirer
        .prompt([
            {message: "Entrez vos matières séparer par une virgule : ", type: "string", name: "courses"},
            {message: "Voir les informations en brute ou en format ics ? (1 ou 2) : ", type: "number", name: "type"}
        ], () => {})
        .then((answers) => {
            let tokenUes = answers.courses.split(/ , |, | ,|,/);
            if (type.includes(answers.type)){
                switch (answers.type) {
                    case 1:
                        cruParser.schedule.displayConsole(logger, tokenUes)
                        break;
                    case 2:
                        cruParser.schedule.createVisualisation(tokenUes);
                        logger.info("Un fichier .ics a été créé à la racine de l'application contenant votre emploi du temps.")
                        break;
                }


            }
        })

}


