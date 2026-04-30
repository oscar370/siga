import { defineConfig } from "@hey-api/openapi-ts";
import { config } from "dotenv";

config({ path: ".env.local" });

const API_SCHEMA_URL = process.env.API_SCHEMA_URL ?? "";

export default defineConfig({
  input: API_SCHEMA_URL,
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
