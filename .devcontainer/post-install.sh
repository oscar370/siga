#!/bin/bash
set -e

sudo chown -R $(whoami) /pnpm-store
pnpm config set store-dir /pnpm-store

(cd siga-frontend && pnpm install)

if ! dotnet tool list -g | grep -q "dotnet-ef"; then
  dotnet tool install --global dotnet-ef
fi

(cd SigaBackend && dotnet restore && dotnet ef database update)