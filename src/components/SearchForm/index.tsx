import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useState } from "react";
import { SearchTransactionsUseCase } from "../../useCases/SearchTransactionsUseCase/SearchTransactionsUseCase";

interface formData{
  search: string
}
const formSchema = yup.object({

  search: yup.string()

})

export function SearchForm({ onSearch }: any) {

  const { register, handleSubmit } = useForm<formData>({

    resolver: yupResolver(formSchema)

})

const handleSearch = ({ search }: formData) => {

    SearchTransactionsUseCase.execute(search ? search.trim() : null);

}

  // const [inputItem, setInputItem] = useState("");
  
  // const onChangeInput = (value:string)  => {
  //   setInputItem(value);
  // } 

  // const onSearchItem = () => {
  //   onSearch(inputItem);
  // }

  // const onSubmit = (event:any) => {
  //   event.preventDefault();
  //   onSearchItem();
  // }

  return (

    <SearchFormContainer onSubmit={handleSubmit(handleSearch)}>
      <input 
      {...register("search")}
      type="text"
      placeholder="Busque por transações" 
      />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>


    // <SearchFormContainer onSubmit={onSubmit}>
    //   <input 
    //   type="text"
    //   placeholder="Busque por transações" 
    //   value={inputItem}
    //   onChange={ (event) => onChangeInput(event.target.value) }
    //   />
    //   <button>
    //     <MagnifyingGlass size={20} />
    //     Buscar
    //   </button>
    // </SearchFormContainer>
  );
}