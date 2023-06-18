export default class Endpoint {
    static get baseUrl(): string {
        
        return 'https://doannam.azurewebsites.net/api'
    }


    //user
    static get authentication(): string { return Endpoint.baseUrl + Endpoint._authentication }
    static get register(): string { return Endpoint.baseUrl + Endpoint._register }
    static get get_user_paging(): string { return Endpoint.baseUrl + Endpoint._get_user_paging }
    static get get_user_by_Id(): string { return Endpoint.baseUrl + Endpoint._get_user_by_Id }
    static get update_user(): string { return Endpoint.baseUrl + Endpoint._update_user }
    static get delete_user(): string { return Endpoint.baseUrl + Endpoint._delete_user }
    static get assign_role(): string { return Endpoint.baseUrl + Endpoint._assign_role }

    //menu
    static get get_menu(): string { return Endpoint.baseUrl + Endpoint._get_menu }
    static get get_menu_by_id(): string { return Endpoint.baseUrl + Endpoint._get_menu_by_id }

    //action
    static get get_action(): string { return Endpoint.baseUrl + Endpoint._get_action }
    static get get_action_by_menuId(): string { return Endpoint.baseUrl + Endpoint._get_action_by_menuId }

    //permission
    static get create_permission(): string { return Endpoint.baseUrl + Endpoint._create_permission }
    static get update_permission(): string { return Endpoint.baseUrl + Endpoint._update_permission }
    static get delete_permission(): string { return Endpoint.baseUrl + Endpoint._delete_permission }
    static get get_permission(): string { return Endpoint.baseUrl + Endpoint._get_permission }
    static get get_permission_by_roleId(): string { return Endpoint.baseUrl + Endpoint._get_permission_by_roleId }
    static get get_permission_by_Id(): string { return Endpoint.baseUrl + Endpoint._get_permission_by_Id }

    //permission-action
    static get create_permission_action(): string { return Endpoint.baseUrl + Endpoint._create_permission_action }
     static get update_permission_action(): string { return Endpoint.baseUrl + Endpoint._update_permission_action }
    static get delete_permission_action(): string { return Endpoint.baseUrl + Endpoint._delete_permission_action }

    //role
    static get get_role_detail(): string { return Endpoint.baseUrl + Endpoint._get_role_detail }
    static get get_role_all(): string { return Endpoint.baseUrl + Endpoint._get_role_all }
    static get get_role_paging(): string { return Endpoint.baseUrl + Endpoint._get_role_paging }
    static get create_role(): string { return Endpoint.baseUrl + Endpoint._create_role }
    static get update_role(): string { return Endpoint.baseUrl + Endpoint._update_role }
    static get delete_role(): string { return Endpoint.baseUrl + Endpoint._delete_role }
    static get delete_list_role(): string { return Endpoint.baseUrl + Endpoint._delete_list_role }










    //menu
    private static _get_menu = "/Menu/rpc/Portal/menu/get"
    private static _get_menu_by_id = "/Menu/rpc/Portal/menu/get-menu-by-id"

    //action
    private static _get_action = "/Action/rpc/Portal/action/get"
    private static _get_action_by_menuId = "/Action/rpc/Portal/action/get-all-action-by-menuId"

    //permission
    private static _create_permission = "/Permission/rpc/Portal/permission/create"
    private static _update_permission = "/Permission/rpc/Portal/permission/update"
    private static _delete_permission = "/Permission/rpc/Portal/permission/delete"
    private static _get_permission = "/Permission/rpc/Portal/permission/get-all-permission-paging"
    private static _get_permission_by_roleId = "/Permission/rpc/Portal/permission/get-permission-by-roleId"
    private static _get_permission_by_Id = "/Permission/rpc/Portal/permission/get-permission-by-Id"

    //permission-action
    private static _create_permission_action = "/PermissionAction/rpc/Portal/permissionaction/create"
    private static _update_permission_action = "/PermissionAction/rpc/Portal/permissionaction/update"
    private static _delete_permission_action = "/PermissionAction/rpc/Portal/permissionaction/delete"

    //role
    private static _get_role_detail = "/Role/Portal/detail"
    private static _get_role_all = "/Role/rpc/Portal/role/get"
    private static _get_role_paging = "/Role/rpc/Portal/role/get-paging"
    private static _create_role = "/Role/rpc/Portal/role/create"
    private static _update_role = "/Role/rpc/Portal/role/update"
    private static _delete_role = "/Role/rpc/Portal/role/delete"
    private static _delete_list_role = "/Role/rpc/Portal/role/delete-list-role"

    //user
    private static _authentication = "/User/rpc/Portal/user/authentication"
    private static _register = "/User/rpc/Portal/user/register"
    private static _get_user_paging = "/User/rpc/Portal/user/get-user-paging"
    private static _get_user_by_Id = "/User/rpc/Portal/user/get-user-by-id"
    private static _update_user = "/User/rpc/Portal/user/update"
    private static _delete_user = "/User/rpc/Portal/user/delete"
    private static _assign_role = "/Role/rpc/Portal/role/assign-roles-to-user"
}