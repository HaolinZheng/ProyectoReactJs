import { useForm } from "react-hook-form";
import { signin } from "../service/axios";
import { UserForm } from "../config/types";

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm<UserForm>({
    mode: "onChange",
  });

  const { errors } = formState;

  function onSubmit(data: UserForm) {
    signin(data);
  }

  return (
    <>
      <div className="absolute inset-x-0 mt-16 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="my-5 text-2xl font-bold">Sign in</h2>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-8">
              <input
                {...register("name", {
                  required: "Nombre requerido",
                  minLength: {
                    value: 3,
                    message: "Mínimo 3 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Máximo 20 caracteres",
                  },
                })}
                className="input p-1"
                type="text"
                placeholder="Nombre..."
              />
              {errors.name && (
                <span className="absolute text-red-600 text-sm ml-4">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="relative mb-8">
              <input
                {...register("email", {
                  required: "Email requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email no válido",
                  },
                })}
                className="input p-1"
                type="email"
                placeholder="Email..."
              />
              {errors.email && (
                <span className="absolute text-red-600 text-sm ml-4">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative mb-8">
              <input
                {...register("password", {
                  required: "Password requerido",
                  minLength: {
                    value: 8,
                    message: "Mínimo 8 caracteres",
                  },
                  maxLength: {
                    value: 16,
                    message: "Máximo 16 caracteres",
                  },
                })}
                className="input p-1"
                type="password"
                placeholder="Contraseña..."
              />
              {errors.password && (
                <span className="absolute text-red-600 text-sm ml-4">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button className="ml-1">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}