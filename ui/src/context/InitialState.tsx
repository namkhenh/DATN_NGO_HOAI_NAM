import {UserInfoDefaultView} from "../model/apimodel/userInfo";
import {AccountRoleEnum} from "../model/enum/accPermissionEnum";

export const initialState = {
  userInfo: UserInfoDefaultView,
  accountPermission: AccountRoleEnum,
  messageBar: {text: "", isOpen: false, status: undefined},
};