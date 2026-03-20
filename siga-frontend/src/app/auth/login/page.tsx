import { Login } from "@/features/auth/components/login";

export default function Page() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-center h-dvh flex-col">
        <Login />
      </div>
    </div>
  );
}
