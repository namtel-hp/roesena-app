# RoesenaApp

## prerequisites

- docker and docker-compose has to be installed
- internet connection

## run it

- run `docker-compose up --build` in root directory of the repository for development build
- run `docker-compose up -f docker-compose.yml up --build` for production build
- update a container service with `docker-compose up -d --no-deps --build 'service_name'`

MATCH (appo:Appointment {title: 'Test number five'}), (p:Person {name: 'Stefan Gerold'})
MERGE (appo)-[el:includes]->(p)
ON CREATE SET el.count = ''
ON MATCH SET el.cout = '5'