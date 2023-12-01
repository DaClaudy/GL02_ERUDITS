#!/usr/bin/env node

import User from "./User.js"
import pkg from "@caporal/core"
const { program } = pkg;
import inquirer from "inquirer";
import CruParser from "./CruParser.js";

let user = new User("bubulle");
const NB_OPTIONS = 2;

if (user.isConnected() && user.hasPermission()){
    program
        .command('start', 'Start the programme')
        .action(({logger}) => {
            logger.info("ORUS - OrgaRoomUniSealand");
            logger.info("Bonjour, que voulez vous faire aujourd'hui ?\n" +
                "1) Voir votre emploi du temps\n" +
                "2) Voir la liste des salles\n")
            inquirer
                .prompt([{name: "action", type: "number", message: "Entrez le chiffre de l'action choisie : "}])
                .then((answers) => {
                    if (Number.isInteger(answers[0]) && [...Array(NB_OPTIONS).keys()].indexOf(answers[0] - 1) !== -1){
                        logger.info("Vous avez choisi l'option : "+answers[0])
                    }
                })
                .catch((error) => {
                    logger.error(error.message)
                });

        })
        .command('test', "Test votre jeu de données au format CRU")
        .argument('<directoryName>', "Nom du dossier à tester")
        .action(({args }) => {
            let parser = new CruParser();
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
