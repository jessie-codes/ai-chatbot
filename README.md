# AI Chatbot

An AI-powered chatbot application with a React frontend and Django backend. Uses AWS Bedrock and Strands Agents for conversational AI, with RAG (Retrieval-Augmented Generation) for context-aware responses.

## Tech Stack

| Layer          | Technology                                  |
| -------------- | ------------------------------------------- |
| Frontend       | React, TypeScript                           |
| Backend        | Python 3.12+, Django, Django REST Framework |
| AI/ML          | AWS Bedrock, Strands Agents, RAG            |
| Task Queue     | Celery, Redis                               |
| Data Pipelines | Dagster                                     |
| Database       | PostgreSQL                                  |
| Cache/Broker   | Redis                                       |
| Infrastructure | Terraform, Docker, AWS                      |
| Observability  | OpenTelemetry, Sentry                       |

## Project Structure

```
ai-chatbot/
├── apps/
│   ├── frontend/          # React application
│   └── backend/           # Django application
│       ├── config/        # Django settings (base, dev, prod)
│       ├── apps/          # Django apps (chat, agents, rag, users)
│       ├── tasks/         # Celery task definitions
│       ├── pipelines/     # Dagster pipeline definitions
│       └── pyproject.toml # Dependencies (managed by uv)
├── infra/                 # Terraform infrastructure as code
├── docker/                # Docker Compose and container configs
├── Makefile               # Dev workflow shortcuts
└── .env.example           # Environment variable template
```

## Prerequisites

- [Python 3.12+](https://www.python.org/downloads/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/) — Python package manager
- [Node.js 20+](https://nodejs.org/) and npm
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Terraform](https://developer.hashicorp.com/terraform/install) (for infrastructure)
- AWS account with Bedrock access

## Getting Started

### 1. Clone and configure environment

```bash
git clone <repo-url>
cd ai-chatbot
cp .env.example .env
```

Edit `.env` with your actual values (database credentials, AWS region, Django secret key).

### 2. Install backend dependencies

```bash
cd apps/backend
uv sync
```

### 3. Run with Docker Compose

```bash
make up       # Start all services (Postgres, Redis, backend, frontend)
make migrate  # Apply database migrations
```

### 4. Run backend locally (without Docker)

```bash
cd apps/backend
uv run python manage.py migrate
uv run python manage.py runserver
```

## Makefile Commands

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `make up`      | Start all services in the background |
| `make down`    | Stop all services                    |
| `make logs`    | Tail logs from all containers        |
| `make migrate` | Run Django migrations                |
| `make shell`   | Open a Django shell in the backend   |

## Environment Variables

All required variables are documented in `.env.example`:

| Variable            | Description                   |
| ------------------- | ----------------------------- |
| `POSTGRES_DB`       | PostgreSQL database name      |
| `POSTGRES_USER`     | PostgreSQL username           |
| `POSTGRES_PASSWORD` | PostgreSQL password           |
| `POSTGRES_HOST`     | PostgreSQL host               |
| `POSTGRES_PORT`     | PostgreSQL port               |
| `REDIS_URL`         | Redis connection URL          |
| `DJANGO_SECRET_KEY` | Django secret key             |
| `AWS_REGION`        | AWS region for Bedrock access |

## Development

- **Package management:** Use `uv add <package>` to add dependencies, `uv sync` to install
- **Linting:** `uv run ruff check .` and `uv run ruff format .`
- **Tests:** `uv run pytest`
- **Migrations:** `uv run python manage.py makemigrations` / `uv run python manage.py migrate`

## Architecture

The backend exposes a REST API via Django REST Framework. Chat requests are processed through Strands Agents, which orchestrate calls to AWS Bedrock foundation models. RAG pipelines retrieve relevant context from the knowledge base before generating responses.

Celery handles async tasks (long-running agent operations, background processing), with Redis as the message broker. Dagster manages data pipelines for ingestion and indexing.

## License

Private — all rights reserved.
