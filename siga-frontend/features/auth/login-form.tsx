"use client";

import { Button } from "@/components/ui/button";
import { Form, FormInput } from "@/components/ui/form";
import { postApiAuthLoginMutation } from "@/lib/client/@tanstack/react-query.gen";
import { zLoginRequest } from "@/lib/client/zod.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zLoginRequest),
    defaultValues: {
      email: "auditor@correo.com",
      password: "XAFj1C%M2w4^NF",
    },
  });

  const { mutate } = useMutation({
    ...postApiAuthLoginMutation({
      query: { useCookies: true },
    }),
    onSuccess: () => router.replace("/dashboard"),
  });

  return (
    <Form onSubmit={handleSubmit((data) => mutate({ body: data }))}>
      <FormInput control={control} name="email" label="Email" isRequired />

      <FormInput
        control={control}
        name="password"
        label="Contraseña"
        isRequired
      />

      <Button className="w-full" type="submit">
        Iniciar sesión
      </Button>
    </Form>
  );
}
