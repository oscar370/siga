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
            export PGDATA="$PWD/.pgdata"
            export PGDATABASE="sigadb"
            export PGPORT="5432"

            alias db-start='pg_ctl start -l "$PGDATA/pg.log" -o "-c unix_socket_directories=$PGDATA -h 127.0.0.1 -p $PGPORT"'
            alias db-stop='pg_ctl stop -m fast'
            alias db-status='pg_ctl status'

            if [ ! -d "$PGDATA" ]; then
             
              initdb --auth=trust --no-locale --encoding=UTF8
              
              db-start
              sleep 2

              createuser postgres -s -h 127.0.0.1 -p $PGPORT || true
              createdb $PGDATABASE -O postgres -h 127.0.0.1 -p $PGPORT || true
              
              db-stop
            fi
          '';
        };
      }
    );
}
