import {UserInfoDefaultView} from "../model/apimodel/userInfo";
import {AccountPermissionEnum} from "../model/enum/accPermissionEnum";

export const initialState = {
  userInfo: UserInfoDefaultView,
  accountPermission: AccountPermissionEnum,
  messageBar: {text: "", isOpen: false, status: undefined},
};