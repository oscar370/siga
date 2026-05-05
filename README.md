# SIGA (Sistema Integrado de Gestión Administrativa)

Un dashboard enfocado en gestión de logística de almacenes.

Demo: https://siga-eta.vercel.app/auth/login

## Características

- Resúmenes de flujo de caja y transacciones.
- Usuarios y roles con Identity.
- PEPS (Primeras Salidas - Primeras Entradas) del producto.
- Gestión de lotes.

## Tech Stack

- NextJS
- TanStack Query
- React Hook Form
- .NET 10
- Entity Framework
- Identity
- PostgreSQL

## Desarrollo

### Entorno

El repositorio cuenta con un dev container que instalara los requisitos, adicionalmente instala Terminal Keeper en VS Code para inicializar el entorno (`dotnet watch` y `pnpm dev`).

### Variables de entorno

El back-end necesita que se coloquen las variables de entorno en el CLI.

- `dotnet user-secrets set "SeedPasswords:Admin" ""`
- `dotnet user-secrets set "SeedPasswords:Auditor" ""`

Para el front-end encontrarás un `.env.example`.

### Cliente Fetch

El back-end expone el contrato de OpenAPI en desarrollo, usa `pnpm openapi-ts` para generar los tipos, esquemas de Zod, queries y mutaciones de TanStack Query.

## Despliegue

### Variables de entorno

Para el back-end:

- `ConnectionStrings__DefaultConnection`: Cadena de conexión a PostgreSQL.
- `SeedPasswords__Admin`: Contraseña para la cuenta de administrador.
- `SeedPasswords__Auditor`: Contraseña para la cuenta de auditor.
- `Cors__AllowedOrigins__0`: Dominio autorizado para interactuar con la API.

Para el front-end:

- `BACKEND_URL`: Dominio del back-end
