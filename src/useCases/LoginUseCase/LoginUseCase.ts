import { LoginParams, LoginValues } from "../../domain/login";
import { LoginService } from "../../services/LoginService/LoginService";
import { RequestError } from "../../domain/request";
import { 
    loadLogin,
    loadloginDone, 
    loadLoginFail
 } from "../../stores/LoginStore/LoginEvents";
import { router } from "../../Router";

const execute = async ({ email, password }: LoginParams): Promise<void> => {
   loadLogin();
    
    return LoginService.authenticateUser({ email, password }).then(
        (user: LoginValues) => {
        window.localStorage.setItem("user", JSON.stringify(user));

        loadloginDone();

        router.navigate("/home");
    })
    .catch(({ hasError, message }: RequestError) => {
        loadLoginFail({ hasError, message });
    });
;} 

const LoginUseCase = {
    execute,
};

export default LoginUseCase;