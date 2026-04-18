bash .devcontainer/mssql/postCreateCommand.sh 'P@ssw0rd' './bin/Debug/' './.devcontainer/mssql/' 

sudo chown vscode /pnpm-store && pnpm config set store-dir /pnpm-store

(cd siga-frontend && pnpm i)

dotnet tool install --global dotnet-ef

(cd SigaBackend && dotnet restore)