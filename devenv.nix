{ pkgs, ... }: {
  languages = {
    # devenv.sh/languages/dotnet/
    dotnet = {
      enable = true;
      package = pkgs.dotnetCorePackages.sdk_10_0;
    };

    # devenv.sh/languages/javascript/
    javascript = {
      enable = true;
      pnpm.enable = true;
    };
  };

  services = {
    # devenv.sh/services/postgres/
    postgres = {
      enable = true;
      listen_addresses = "127.0.0.1";
      port = 5432;
      initialDatabases = [ { name = "sigadb"; } ];
      initialScript = ''
        CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';
        GRANT ALL PRIVILEGES ON DATABASE sigadb TO postgres;
      '';
    };
  };
}
