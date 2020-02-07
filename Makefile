.PHONY: dev, test, prod

dev:
	docker-compose down
	docker-compose up --build

prod:
	docker-compose down
	docker-compose -f docker-compose.yml up --build

test:
	docker build -t angular-test -f ./app/docker/test.angular.Dockerfile ./app/angular
	docker run --rm angular-test npm run test:headless
	docker run --rm angular-test npm run e2e