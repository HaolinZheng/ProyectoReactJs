import { useForm } from "react-hook-form";
import Header from "../components/Header";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: "onChange",
  });

  const { errors } = formState;

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <>
      <Header />
      <div className="absolute inset-x-0 mt-16 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="my-5 text-2xl font-bold">Log in</h2>
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
                    value: 10,
                    message: "Máximo 10 caracteres",
                  },
                })}
                className="input"
                type="text"
                placeholder="Nombre..."
              />
              {errors.name && (
                <span className="absolute text-red-600 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="relative mb-8">
              <input
                {...register("email", {
                  required: "Email requerido",
                  minLength: {
                    value: 3,
                    message: "Mínimo 3 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email no válido",
                  },
                })}
                className="input"
                type="email"
                placeholder="Email..."
              />
              {errors.email && (
                <span className="absolute text-red-600 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative mb-8">
              <input
                {...register("password", {
                  required: "Password requerido",
                  minLength: {
                    value: 3,
                    message: "Mínimo 3 caracteres",
                  },
                  maxLength: {
                    value: 16,
                    message: "Máximo 16 caracteres",
                  },
                })}
                className="input"
                type="password"
                placeholder="Contraseña..."
              />
              {errors.password && (
                <span className="absolute text-red-600 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              className="ml-1 "
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}