import { TableType } from "../../model/enum/tableTypeEnum";
import { HeadCell } from "./TablePager";

const patientListStaticColumn: () => HeadCell[] = () => [
    {
        id: 'appointmentId',
        label: 'Mã đặt lịch',
    },
    {
        id: 'appointmentStatus',
        label: 'Trạng thái',
    },
    {
        id: 'dateAppointment',
        label: 'Ngày đặt khám',
    },
    {
        id: 'timeAppointment',
        label: 'Khung giờ đặt khám',
    },
    {
        id: 'patientId',
        label: 'Mã bệnh nhân',
    },
    {
        id: 'patientName',
        label: 'Tên bệnh nhân',
    },
    {
        id: 'patientDateOfBirth',
        label: 'Ngày sinh',
    },
    {
        id: 'patientSex',
        label: 'Giới tính',
    },
    // {
    //     id: 'patientPhoneNumber',
    //     label: 'Số điện thoại',
    // },
    // {
    //     id: 'patientIdentityNumber',
    //     label: 'CCCD/ CMND',
    // },
    // {
    //     id: 'patientAddress',
    //     label: 'Địa chỉ',
    // },
]

const accountManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'userName',
        label: 'Tên đăng nhập',
    },
    {
        id: 'role',
        label: 'Vai trò',
    },
    {
        id: 'fullName',
        label: 'Họ và tên',
    },
    {
        id: 'phoneNumber',
        label: 'Số điện thoại',
    },
    {
        id: 'insuranceNumber',
        label: 'CMND',
    },
    {
        id: 'gender',
        label: 'Giới tính',
    },
    {
        id: 'status',
        label: 'Trạng thái',
    }
]

const roleManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'roleId',
        label: 'Mã vai trò',
    },
    {
        id: 'roleName',
        label: 'Tên vai trò',
    },
    {
        id: 'roleStatus',
        label: 'Trạng thái',
    },
]

const permissionManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'permissionId',
        label: 'Mã quyền',
    },
    {
        id: 'permissionName',
        label: 'Tên quyền',
    },
    {
        id: 'menuName',
        label: 'Menu' 
    },
    {
        id: 'permissionStatus',
        label: 'Trạng thái',
    },
]

export const getColumnWithType: (tableType: TableType) => HeadCell[] = (tableType) => {
    let basicColumns: HeadCell[];
    switch (tableType) {
        case TableType.PatientListTable: {
            basicColumns = patientListStaticColumn()
            break;
        }
        case TableType.AccountManagerTable: {
            basicColumns = accountManagerStaticColumn()
            break;
        }
        case TableType.RoleManagerTable: {
            basicColumns = roleManagerStaticColumn()
            break;
        }
        case TableType.PermissionTable: {
            basicColumns = permissionManagerStaticColumn()
            break;
        }
        default: {
            basicColumns = []
        }
    }
    return basicColumns
}
    
