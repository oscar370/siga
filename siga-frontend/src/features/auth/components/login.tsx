"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { login } from "@/services/auth/login";
import { loginSchema, TLogin } from "@/types/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function Login() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@correo.com",
      password: "Admin123*!",
    },
  });

  function onSubmit(data: TLogin) {
    startTransition(async () => {
      const response = await login(data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("Sesión iniciada");
      router.replace("/dashboard");
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.FieldSet
        title="Inicio de sesión"
        description="Inicia con la cuenta proporcionada por tu administrador"
      >
        <Form.Input
          name="email"
          control={control}
          label="Correo"
          type="email"
        />
        <Form.Input
          name="password"
          control={control}
          label="Contraseña"
          type="password"
        />
      </Form.FieldSet>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner /> : "Iniciar sesión"}
      </Button>
    </Form>
  );
}
