import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { BarChart3, Box, ShieldCheck } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-12 items-center border-b px-6">
        <div className="flex items-center justify-center gap-2 text-xl font-bold">
          <Box className="h-6 w-6" />
          <span>Siga</span>
        </div>
        <nav className="ml-auto flex">
          <Link href="https://github.com/oscar370/siga">Github</Link>
          <Link href="/auth/login">Iniciar Sesión</Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="flex w-full justify-center border-b py-24">
          <div className="container flex flex-col items-center space-y-6 px-4 text-center md:px-6">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                Gestión de Inventario
              </h1>
              <p className="mx-auto max-w-175 text-muted-foreground md:text-xl">
                Control estricto de operaciones, flujo de caja y
                reabastecimiento. Arquitectura cerrada y segura diseñada para
                operaciones internas.
              </p>
            </div>
          </div>
        </section>

        <section className="flex w-full justify-center bg-muted/50 py-20">
          <div className="container px-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <BarChart3 />
                  <CardTitle>Dashboard Financiero</CardTitle>
                  <CardDescription>
                    Consolidación de flujo de caja en tiempo real.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Cálculo de Ingresos Brutos, Costo de Bienes Vendidos y
                  Beneficio Bruto mediante operaciones de I/O optimizadas.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <ShieldCheck />
                  <CardTitle>Auditoría y Seguridad</CardTitle>
                  <CardDescription>
                    RBAC y sesiones persistentes encriptadas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Entorno cerrado con aprovisionamiento manual de cuentas y
                  roles de solo lectura para auditores.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
