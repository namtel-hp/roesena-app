.PHONY: dev, unit-tests, integration-tests, prod

dev:
	docker-compose down --remove-orphans
	docker-compose up --build

prod:
	docker-compose down --remove-orphans
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build

unit-tests:
	docker build -t angular-test -f ./app/docker/test.angular.Dockerfile ./app/angular
	docker run --rm -v $(pwd)/coverage:/app/coverage angular-test npm run test:headless

integration-tests:
	docker build -t angular-test -f ./app/docker/test.angular.Dockerfile ./app/angular
	docker run --rm angular-test npm run e2e