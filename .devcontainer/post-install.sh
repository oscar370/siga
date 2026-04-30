#!/bin/bash
set -e

chmod +x ./.devcontainer/mssql/postCreateCommand.sh
./.devcontainer/mssql/postCreateCommand.sh 'P@ssw0rd' './bin/Debug/' './.devcontainer/mssql/'

sudo chown -R $(whoami) /pnpm-store
pnpm config set store-dir /pnpm-store

(cd siga-frontend && pnpm install)

if ! dotnet tool list -g | grep -q "dotnet-ef"; then
  dotnet tool install --global dotnet-ef
fi

(cd SigaBackend && dotnet restore && dotnet ef database update)