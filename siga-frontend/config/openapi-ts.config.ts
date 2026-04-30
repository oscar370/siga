import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://127.0.0.1:5062/openapi/v1.json",
  output: {
    path: "lib/client",
    postProcess: ["prettier"],
  },
  plugins: [
    "zod",
    "@tanstack/react-query",
    {
      name: "@hey-api/client-next",
      runtimeConfigPath: "../api-client",
    },
    {
      name: "@hey-api/sdk",
      validator: {
        request: "zod",
      },
    },
  ],
});
