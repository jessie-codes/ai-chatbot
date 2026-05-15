# AI Chatbot Project Steering

## Project Overview

This is an AI chatbot application using a React frontend and Python/Django backend, with AI capabilities powered by AWS Bedrock and Strands Agents. The system uses RAG (Retrieval-Augmented Generation) for context-aware responses, with infrastructure managed via Terraform and deployed on AWS.

## Tech Stack

### Frontend

- **React** (with TypeScript)
- Functional components with hooks
- Component-based architecture

### Backend

- **Python 3.12+**
- **Django** — web framework and REST API
- **Celery** — async task processing
- **Dagster** — data pipeline orchestration

### AI/ML

- **AWS Bedrock** — foundation model access
- **Strands Agents** — agent orchestration
- **RAG** — retrieval-augmented generation for grounded responses
- **AWS Agentcore** — agent deployment and management

### Data

- **PostgreSQL** — primary relational database
- **Redis** — caching, Celery broker, session store

### Infrastructure

- **Terraform** — infrastructure as code
- **Docker** — containerization
- **AWS** — cloud provider

### Observability

- **OpenTelemetry** — distributed tracing and metrics
- **Sentry** — error tracking and performance monitoring

## Project Structure

```
ai-chatbot/
├── apps/
│   ├── frontend/              # React application
│   │   ├── src/
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── pages/         # Route-level components
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   ├── services/      # API client and external services
│   │   │   ├── store/         # State management
│   │   │   ├── types/         # TypeScript type definitions
│   │   │   └── utils/         # Utility functions
│   │   ├── public/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── backend/               # Django application
│       ├── config/            # Django settings and configuration
│       ├── apps/
│       │   ├── chat/          # Chat functionality
│       │   ├── agents/        # AI agent logic
│       │   ├── rag/           # RAG pipeline
│       │   └── users/         # User management
│       ├── tasks/             # Celery task definitions
│       ├── pipelines/         # Dagster pipeline definitions
│       ├── Dockerfile
│       └── requirements/
│           ├── base.txt
│           ├── dev.txt
│           └── prod.txt
├── infra/                     # Terraform infrastructure
│   ├── modules/
│   ├── environments/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── prod/
│   └── main.tf
├── docker/                    # Docker configurations and compose files
│   └── docker-compose.yml
├── Makefile                   # Development workflow targets (up, down, logs, migrate, shell)
├── .env.example               # Environment variable template
└── README.md
```

## Coding Standards

### React Best Practices

- Use TypeScript for all frontend code
- Prefer functional components with hooks over class components
- Use React.memo, useMemo, and useCallback for performance-critical paths
- Keep components small and focused on a single responsibility
- Co-locate tests with components (ComponentName.test.tsx)
- Use CSS modules or styled-components for scoped styling
- Implement error boundaries for graceful failure handling
- Use React Query or SWR for server state management
- Validate props with TypeScript interfaces, not PropTypes
- Use lazy loading and code splitting for route-level components

### Python Best Practices

- Follow PEP 8 style guide
- Use type hints on all function signatures
- Use dataclasses or Pydantic models for structured data
- Write docstrings for all public modules, classes, and functions
- Keep functions short and focused (max ~20 lines)
- Use virtual environments (venv or poetry)
- Organize imports: stdlib, third-party, local (enforced by isort)
- Use logging module instead of print statements
- Handle exceptions explicitly — avoid bare `except:`
- Use `pathlib.Path` over `os.path`

### Django Best Practices

- Use Django REST Framework for API endpoints
- Keep views thin — business logic belongs in services or domain layer
- Use Django's ORM efficiently: select_related, prefetch_related, avoid N+1
- Define custom managers for complex querysets
- Use Django signals sparingly — prefer explicit calls
- Store settings per environment (base, dev, prod)
- Use Django migrations for all schema changes
- Implement proper permission classes on all API views
- Use serializers for input validation and output formatting

### Docker Best Practices

- Use multi-stage builds to minimize image size
- Pin base image versions (e.g., `python:3.12-slim`, not `python:latest`)
- Run containers as non-root user
- Use .dockerignore to exclude unnecessary files
- Order Dockerfile instructions for optimal layer caching (dependencies before code)
- Use health checks in docker-compose and production
- Keep images minimal — install only what's needed
- Use environment variables for configuration, never bake secrets into images

### AWS Best Practices

- Follow least-privilege IAM policies
- Use AWS Secrets Manager for sensitive configuration
- Enable encryption at rest and in transit
- Use VPC with private subnets for backend services
- Tag all resources consistently for cost tracking
- Use CloudWatch alarms for critical metrics
- Enable access logging on all public-facing services
- Use managed services where possible (RDS, ElastiCache, ECS/EKS)
- Implement auto-scaling based on load patterns

## Terraform Standards

- Use modules for reusable infrastructure components
- Separate state files per environment
- Use remote state with S3 backend and DynamoDB locking
- Name resources with consistent prefix: `{project}-{env}-{resource}`
- Use variables and locals — avoid hardcoded values
- Run `terraform fmt` and `terraform validate` before commits
- Use data sources to reference existing resources
- Implement proper tagging strategy on all resources

## Observability Standards

### OpenTelemetry

- Instrument all HTTP handlers and outbound calls
- Use semantic conventions for span and metric names
- Propagate trace context across service boundaries
- Export traces to AWS X-Ray or a compatible backend
- Add custom attributes for business-relevant context (user_id, conversation_id)

### Sentry

- Configure Sentry SDK in both frontend and backend
- Set appropriate sample rates for performance monitoring
- Add breadcrumbs for debugging context
- Use Sentry environments to separate dev/staging/prod
- Tag errors with relevant context (user, conversation, agent)

## Security Guidelines

- Never commit secrets or credentials to version control
- Use environment variables or AWS Secrets Manager for all secrets
- Validate and sanitize all user input on the backend
- Implement rate limiting on public API endpoints
- Use CORS with explicit allowed origins
- Enable CSRF protection for session-based auth
- Use parameterized queries (Django ORM handles this by default)
- Keep dependencies updated — run security audits regularly
- Implement proper authentication and authorization on all endpoints

## Development Workflow

- Use feature branches with pull requests
- Run linters and tests in CI before merge
- Use pre-commit hooks for formatting (black, isort, prettier, eslint)
- Write tests for new features and bug fixes
- Use docker-compose for local development to match production topology
- Document API changes and breaking changes in PR descriptions
- Use the root Makefile for common dev tasks (up, down, logs, migrate, shell)
- Tag releases with semantic versioning (e.g., v0.1-scaffold, v0.2-auth)

## Environment Variables

- All environment variables are documented in `.env.example` at the project root
- Required variables: POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, REDIS_URL, DJANGO_SECRET_KEY, AWS_REGION
- Never commit `.env` files — only `.env.example` with placeholder values
- Use docker-compose env_file or AWS Secrets Manager for runtime injection
