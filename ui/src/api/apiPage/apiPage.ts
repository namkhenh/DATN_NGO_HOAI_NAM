import { Endpoint as api, send } from "../helpers"

export class AuthenService {
    public static login = (object: any) => {
        return send(`${api.authentication}`, 'POST', object)
    }
    public static register = (object: any) => {
        return send(`${api.register}`, 'POST', object)
    }
}

export class MenuService {
    public static getMenu = () => {
        return send(`${api.get_menu}`, 'GET')
    }
    public static getMenuById = (id: string) => {
        return send(`${api.get_menu_by_id}?Id=${id}`, 'GET')
    }
}

export class RoleService {
    public static getRoleDetail = (id: string) => {
        return send(`${api.get_role_detail}?Id=${id}`, 'GET')
    }
    public static getRoleAll = () => {
        return send(`${api.get_role_all}`, 'GET')
    }
    public static getRolePaging = (object: any) => {
        return send(`${api.get_role_paging}`, 'POST', object)
    }
    public static createRole = (object: any) => {
        return send(`${api.create_role}`, 'POST', object)
    }
    public static updateRole = (object: any) => {
        return send(`${api.update_role}`, 'POST', object)
    }
    public static deleteRole = (id: any) => {
        return send(`${api.delete_role}?Id=${id}`, 'DELETE')
    }
    public static deleteListRole = (id: any) => {
        return send(`${api.delete_list_role}`, 'POST', id)
    }
}

export class ActionService {
    public static getAction = () => {
        return send(`${api.get_action}`, 'GET')
    }
    public static getActionByMenuId = (id: string) => {
        return send(`${api.get_action_by_menuId}?Id=${id}`, 'GET')
    }
}

export class PermissionActionService {
    public static createPermissionAction = (object: any) => {
        return send(`${api.create_permission_action}`, 'POST', object)
    }
    public static updatePermissionAction = (object: any) => {
        return send(`${api.update_permission_action}`, 'POST', object)
    }
}

export class PermissionService {
    public static getPermission = (object: any) => {
        return send(`${api.get_permission}`, 'POST', object)
    }
    public static getPermissionById = (id: string) => {
        return send(`${api.get_permission_by_Id}?Id=${id}`, 'GET')
    }
    public static getPermissionByRoleId = (id: string) => {
        return send(`${api.get_permission_by_roleId}?roleId=${id}`, 'POST')
    }
    public static createPermission = (object: any) => {
        return send(`${api.create_permission}`, 'POST', object)
    }
    public static updatePermission = (object: any) => {
        return send(`${api.update_permission}`, 'POST', object)
    }
    public static deletePermission = (id: string) => {
        return send(`${api.delete_permission}?Id=${id}`, 'DELETE')
    }
}