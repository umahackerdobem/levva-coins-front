import { useForm } from "react-hook-form";
import { ReactNode } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  HeaderContainer,
  HeaderContent,
  NewCategoryButton,
  NewTransactionButton,
  SignOutButton,
  UserAvatar,
} from "./style";
import levvaCoinsLogo from "../../assets/logo.svg";
import { Modal } from "../Modal";
import {
  Form,
  FormButton,
  FormInput,
  TransactionTypeButton,
  TransactionTypeContainer,
} from "../../styles/global";
import { ArrowCircleUp, ArrowCircleDown } from "phosphor-react";
import { router } from "../../Router";
import { CategoryModal } from "./CategoryModal";
import { TransactionModal } from "./TransactionModal";

interface FormProps {
  name: string;
  email:string;
}
const formSchema = yup
  .object({
    name: yup.string().required("O nome da categoria é obrigatório."),
    email: yup.string()
  })
  .required();

export function Header() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      email: 'myrea.narayana@levva.io',
      name: 'Myrea Narayana',
    },
    resolver: yupResolver(formSchema),
  });

  const newTransactionButton: ReactNode = ( <NewTransactionButton>Nova transação</NewTransactionButton> );
  const userAvatar: ReactNode = ( <UserAvatar src="https://github.com/umahackerdobem.png" alt="Myrea Narayana" /> );


  function handleSignOut() {
    window.localStorage.removeItem("user");
   router.navigate("/login");
  }
  function handleProfileUpdate(data:FormProps) {
    console.log(data)
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={levvaCoinsLogo} alt="levva Coins" />
        <div>
          
          <CategoryModal />

          <TransactionModal />

        </div>
        <Modal title="Meu perfil" trigger={userAvatar}>
          <Form onSubmit={handleSubmit(handleProfileUpdate)}>
            <UserAvatar src="https://github.com/umahackerdobem.png" alt="Myrea Narayana" variant="large" />
             <FormInput {...register("name")} type="text"  placeholder="Nome"/>
            <FormInput {...register("email")} type="email"  disabled />
            <FormButton type="submit">Atualizar</FormButton>

            <SignOutButton type="button" onClick={handleSignOut}>Sair</SignOutButton>
          </Form>
        </Modal>
      </HeaderContent>
    </HeaderContainer>
  );
}