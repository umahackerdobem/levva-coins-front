import { createStore } from "effector";

import { loadLogin, loadloginDone, loadLoginFail } from "./LoginEvents";
import { LoginState} from "./LoginState";

const initialState: LoginState = {
    isLoading: false,
    hasError: false,
    errorMessage: "",
};

export const LoginStore = createStore<LoginState>(initialState)
.on(loadLogin, (state) => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: ""
}))
.on(loadloginDone, (state) => ({
    ...state,
    isLoading: false,
    errorMessage: ""
}))
.on(loadLoginFail, (_, data) => ({
    isLoading: false,
    hasError: data.hasError,
    errorMessage: data.message,
}))