.PHONY: up down logs migrate shell

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

migrate:
	docker compose exec backend python manage.py migrate

shell:
	docker compose exec backend python manage.py shell
