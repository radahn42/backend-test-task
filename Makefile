up-infra:
	docker-compose up -d

down-infra:
	docker-compose down

down-infra-delete:
	docker-compose down --volumes

start:
	node ./src/app.js

migrate-make:
	npx knex migrate:latest

migrate-rollback:
	npx knex migrate:rollback

seed-run:
	npx knex seed:run