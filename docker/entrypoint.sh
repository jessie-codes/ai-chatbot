#!/bin/sh
set -e

# Install/sync dependencies into the venv (handles volume mount case)
uv sync --frozen --no-dev

exec "$@"
