up-infra:
	docker-compose up -d

down-infra:
	docker-compose down

start:
	node ./src/app.js
