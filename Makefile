install:
	docker-compose -f docker-compose.builder.yml run --rm install
start:
	docker-compose up
npm-run:
	docker-compose run dev npm run $(COMMAND)
shell-run:
	docker-compose run -e NODE_ENV=$(ENV) dev $(COMMAND) 