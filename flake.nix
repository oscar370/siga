{
  description = "Entorno de desarrollo para SigaBackend (.NET + PostgreSQL)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            dotnet-sdk_10
            postgresql
            nodejs
            pnpm
          ];

          shellHook = ''
            export DOTNET_CLI_TELEMETRY_OPTOUT=1

            # Local directory for PostgreSQL data
            export PGDATA="$PWD/.pgdata"
            export PGDATABASE="sigadb"
            export PGPORT="5432"

            if [ ! -d "$PGDATA" ]; then
              echo "Starting a local PostgreSQL cluster..."
              initdb --auth=trust --no-locale --encoding=UTF8
              
              pg_ctl start -l "$PGDATA/pg.log" -o "-h 127.0.0.1 -p $PGPORT"
              sleep 2
              createuser postgres -s || true
              createdb $PGDATABASE -O postgres || true
              pg_ctl stop -m fast
            fi

            echo "Starting the PostgreSQL service on port $PGPORT..."
            pg_ctl start -l "$PGDATA/pg.log" -o "-h 127.0.0.1 -p $PGPORT"

            trap 'echo "Stopping PostgreSQL..."; pg_ctl stop -m fast' EXIT
          '';
        };
      }
    );
}
