import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AuthLayout } from "../../layouts/AuthLayout";
import { Form, FormButton, FormError, FormInput, FormLink } from "../../styles/global";
import LoginUseCase from "../../useCases/LoginUseCase/LoginUseCase";
import { useStore } from "effector-react";
import { LoginStore } from "../../stores/LoginStore/LoginStore";

interface FormProps {
  email: string;
  password: string;
}

const formSchema = yup
  .object({
    email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("O campo do e-mail é obrigatório"),
    password: yup.string().required("O campo da senha é obrigatório"),
  })
  .required();

export function Login() {
  const { isLoading, hasError, errorMessage} = useStore(LoginStore)
  
  const { register, handleSubmit, formState: { errors } 
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema)
  });

  function handleLogin({ email, password }: FormProps) {
    LoginUseCase.execute({ email, password });
  }

  return (
    <AuthLayout
      title="Login"
      subtitle="Gerenciar suas entradas e saídas nunca foi tão simples."
    >
      <Form onSubmit={handleSubmit(handleLogin)}>
        <FormInput {...register("email")} placeholder="E-mail" />
        {errors.email && <FormError>{errors.email.message}</FormError>}
        <FormInput 
        {...register("password")}
        type="password"
        placeholder="Senha"
        />
        {errors.password && <FormError>{errors.password.message}</FormError>}

        {hasError && <FormError>{errorMessage}</FormError>}
        
        <FormLink to="/new-account">Não tem conta? Crie agora</FormLink>
        
        <FormButton type="submit">{isLoading ? "Carregando..." : "Entrar"}</FormButton>
      </Form>
    </AuthLayout>
  );
}
