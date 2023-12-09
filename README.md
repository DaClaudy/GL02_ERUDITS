# GL02_ERUDITS
Projet GL02

## Comment lancer le projet ?
1. Cloner le projet dans un dossier avec GIT.

```shell
    
    $> git clone git@github.com:DaClaudy/GL02_ERUDITS.git <directoryname>
    $> cd <directoryname>

```

2. Avoir node d'installé sur sa machine.
3. Installer les dépendences.

```shell

    $> npm install

```

4. Vérifier qu'un jeu de données CRU dans un dossier est disponible sur la machine, le nom du dossier est "SujetA_data".
Vous devrez changer la constante DATA_DIR_NAME dans le fichier homescreen, si vous voulez changer le dossier source pour le
parsing de données CRU.
5. Tester le jeu de données avec la commande :

```shell

    $> node homescreen.js test SujetA_Data 

```

6. Plusieurs objets s'affiche à l'écran, sauf si vos données contiennent des erreurs,
dans ce cas, des messages d'erreur vous montre où se trouve le problème dans votre fichier.
De plus, un fichier au format ics est crée
7. Pour lancer l'outils pour utiliser un jeu de données en mode intéractif il faut exécuter la commande :

```shell

    $> npm start
    $> node ./homescreen start //fonctionne aussi 
    
```

**INFORMATIONS**
- L'action pour voir l'emploi du temps avec le choix des matières, a aussi une fonction pour exporter dans l'agenda 
l'emploi du temps créer, ce qui n'était pas demander
- l'export n'ayant pas de demande clair a été fait au plus simple 
- Les tests sont juste fait au niveau du parsing de fichier qui annonce une erreur dans la console, 
ce qui peut arrêter le processus entier ou partiel du parsing des données pour la demande non fonctionnelle
    



