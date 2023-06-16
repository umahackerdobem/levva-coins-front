import { createEvent } from "effector";

import { RequestError } from "../../domain/request";

export const loadLogin = createEvent("loadLogin");
export const loadloginDone = createEvent("loadLoginDone");
export const loadLoginFail = createEvent<RequestError>("loadLoginFail");