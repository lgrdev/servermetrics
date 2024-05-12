# ServerMetrics
[![Node.js CI](https://github.com/lgrdev/servermetrics/actions/workflows/node.js.yml/badge.svg)](https://github.com/lgrdev/servermetrics/actions/workflows/node.js.yml)
[![Mocha tests - Ok](https://img.shields.io/static/v1?label=Mocha+tests&message=Ok&color=2ea44f)](https://)
[![Made with PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue?logo=postgresql&logoColor=white)](https://www.postgresql.org/ "Go to PostgresSQL homepage")
[![dependency - prisma](https://img.shields.io/badge/dependency-prisma-blue)](https://www.npmjs.com/package/prisma)
[![dependency - express](https://img.shields.io/badge/dependency-express-blue)](https://www.npmjs.com/package/express)

ce projet mets en oeuvre NodeJs, Prisma comme ORM et Postgresql pour stocker les métrics

- cpu
- memoire
- disque
- status des containers docker

Les métrics sont enregistrés toutes les 5 secondes via node-schedule


## Projet Metrics

![Projet Metrics](./images/nodejs-metrics.png "Projet Metrics")

Le projet metric est un projet experimental permettant de mettre en oeuvre différentes techniques

- Nodejs et prisma pour le serveur d'api
- Vuejs 3 en typescript pour le viewer
- Traefik et docker pour l'hebergement des sites et base de données

