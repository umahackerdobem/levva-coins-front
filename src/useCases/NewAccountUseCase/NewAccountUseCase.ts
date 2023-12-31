import { loadNewAccount, loadNewAccountDone, loadNewAccountFail,
} from "../../stores/NewAccountStore/NewAccountEvents";

import { router } from "../../Router";
import { NewAccountParams } from "../../domain/newAccount";
import { RequestError } from "../../domain/request";
import { NewAccountService } from "../../services/NewAccountService/NewAccountService";

const execute = async ({
    name,
    email,
    password,
    confirmPassword,
}: NewAccountParams): Promise<void> => {
    loadNewAccount();

    return NewAccountService.createUser({
        name,
        email,
        password,
        confirmPassword,
    })

    .then(() => {
        loadNewAccountDone();

        router.navigate("/login");
    })
    .catch(({ hasError, message }: RequestError) => {
        loadNewAccountFail({ hasError, message });
    });
};

const NewAccountUseCase = {
    execute,
}; 

export default NewAccountUseCase;
