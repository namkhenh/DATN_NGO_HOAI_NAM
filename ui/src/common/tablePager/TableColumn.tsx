import { TableType } from "../../model/enum/tableTypeEnum";
import { HeadCell } from "./TablePager";

const patientListStaticColumn: () => HeadCell[] = () => [
    {
        id: 'appointmentId',
        numeric: true,
        disablePadding: false,
        label: 'Mã đặt lịch',
    },
    {
        id: 'appointmentStatus',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái',
    },
    {
        id: 'dateAppointment',
        numeric: true,
        disablePadding: false,
        label: 'Ngày đặt khám',
    },
    {
        id: 'timeAppointment',
        numeric: true,
        disablePadding: false,
        label: 'Khung giờ đặt khám',
    },
    {
        id: 'patientId',
        numeric: true,
        disablePadding: false,
        label: 'Mã bệnh nhân',
    },
    {
        id: 'patientName',
        numeric: true,
        disablePadding: false,
        label: 'Tên bệnh nhân',
    },
    {
        id: 'patientDateOfBirth',
        numeric: true,
        disablePadding: false,
        label: 'Ngày sinh',
    },
    {
        id: 'patientSex',
        numeric: true,
        disablePadding: false,
        label: 'Giới tính',
    },
    // {
    //     id: 'patientPhoneNumber',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Số điện thoại',
    // },
    // {
    //     id: 'patientIdentityNumber',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'CCCD/ CMND',
    // },
    // {
    //     id: 'patientAddress',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Địa chỉ',
    // },
]

const accountManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'userName',
        numeric: true,
        disablePadding: false,
        label: 'User Name',
    },
    {
        id: 'role',
        numeric: true,
        disablePadding: false,
        label: 'Role',
    },
    {
        id: 'fullName',
        numeric: true,
        disablePadding: false,
        label: 'Họ và tên',
    },
    {
        id: 'phoneNumber',
        numeric: true,
        disablePadding: false,
        label: 'Số điện thoại',
    },
    {
        id: 'insuranceNumber',
        numeric: true,
        disablePadding: false,
        label: 'CMND',
    }
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
        default: {
            basicColumns = []
        }
    }
    return basicColumns
}
    
