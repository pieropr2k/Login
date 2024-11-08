import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/protected-dashboard");
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-3xl font-bold">Registrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Apellidos Completos:</Label>
          <Input
            type="text"
            name="last_names"
            placeholder="Escribe tus apellidos"
            {...register("last_names")}
            autoFocus
          />
          {errors.last_names?.message && (
            <p className="text-red-500">{errors.last_names?.message}</p>
          )}

          <Label htmlFor="first_names">Nombres:</Label>
          <Input
            type="text"
            name="first_names"
            placeholder="Escribe tus nombres"
            {...register("first_names")}
            autoFocus
          />
          {errors.first_names?.message && (
            <p className="text-red-500">{errors.first_names?.message}</p>
          )}

          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="role">Rol:</Label>
          <select
            name="role"
            {...register("role")}
            className="w-full mt-1 p-2 border border-gray-400 rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
>
            <option value="S01">Supervisor</option>
            <option value="A01">Auditor</option>
            <option value="C02">Ciudadano</option>
          </select>
          {errors.role?.message && (
            <p className="text-red-500">{errors.role?.message}</p>
          )}

          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}

          <div className="mt-3 mb-2 flex">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { required: "Debes aceptar los términos y condiciones" })}
              className="mr-2"
            />
            <Label htmlFor="terms">
              Acepto los{" "}
              <Link to="/terms" className="text-sky-500 underline">
                términos y condiciones
              </Link>
            </Label>
            {errors.terms?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.terms?.message}</p>
            )}
          </div>

          <Button>Registrar</Button>
        </form>
        <p>
          Tienes una cuenta?
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
