import React, { useState } from 'react'
import './AccountManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import TablePager from '../../../common/tablePager/TablePager'
import { AccountManagerTableColumns, AccountManagerTableDatas, TableType, UserGender } from '../../../model/enum/tableTypeEnum'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import { AccountRoleEnum } from '../../../model/enum/accPermissionEnum'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import DialogView from '../../../common/dialog/Dialog'
import { TextField } from '../../../common/textField/TextField'
import { useStateValue } from '../../../context/StateProvider'
import { MessageBarStatus } from '../../../model/enum/messageBarEnum'
import { actionType } from '../../../context/Reducer'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { Dropdown } from '../../../common/dropdown/DropDown'
import { UserSexView } from '../../../model/apimodel/userInfo'
import { Label } from '@fluentui/react/lib/Label'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import AddRoleForm from '../../../components/assignRoleForm/AssignRoleForm'
import AssignRoleForm from '../../../components/assignRoleForm/AssignRoleForm'
import Switch from '@mui/material/Switch'
import { RoleStatus } from '../roleManagerPage/RoleManagerPage'

export enum AccountAction {
    Create,
    Edit,
    Delete,
    ChangePass,
    Enable,
    Able,
    Assign
}

export enum AccountStatus {
    Able,
    Enable
}

function AccountManagerPage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [accountAction, setAcountAction] = useState<AccountAction>()
    const [currentPage, setCurrentPage] = useState<number>(0);
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.AccountManagerTable}
                showAccountCreate={() => { setShowDialog(true); setAcountAction(AccountAction.Create) }}
                showAccountEdit={() => { setShowDialog(true); setAcountAction(AccountAction.Edit) }}
                showAccountDelete={() => { setShowDialog(true); setAcountAction(AccountAction.Delete) }}
                showAccountChangePass={() => { setShowDialog(true); setAcountAction(AccountAction.ChangePass) }}
                showAccountEnable={() => { setShowDialog(true); setAcountAction(AccountAction.Enable) }}
                showAccountAble={() => { setShowDialog(true); setAcountAction(AccountAction.Able) }}
                showAccountAssign={() => { setShowDialog(true); setAcountAction(AccountAction.Assign) }}
            />
        ])
    }

    function createData(
        userName: string,
        roleI: AccountRoleEnum[],
        fullName: string,
        phoneNumber: string,
        insuranceNumber: string,
        genderI: number,
        statusI: number
    ): AccountManagerTableColumns {
        // let role: JSX.Element[] = [<></>]
        // if (roleI.includes(AccountRoleEnum.Admin)) {
        //     role.push(<div className='role-element-admin'>Admin</div>)
        // }
        // if (roleI.includes(AccountRoleEnum.Doctor)) {
        //     role.push(<div className='role-element-doctor'>Bác sĩ</div>)
        // }
        // if (roleI.includes(AccountRoleEnum.Care)) {
        //     role.push(<div className='role-element-care'>CSKH</div>)
        // }
        // if (roleI.includes(AccountRoleEnum.User)) {
        //     role.push(<div className='role-element-user'>Người bệnh</div>)
        // }
        let role: JSX.Element = <div className='role-element'>
            {roleI.includes(AccountRoleEnum.Admin) && <div className='role-element-admin'>Admin</div>}
            {roleI.includes(AccountRoleEnum.Doctor) && <div className='role-element-doctor'>Bác sĩ</div>}
            {roleI.includes(AccountRoleEnum.Care) && <div className='role-element-care'>CSKH</div>}
            {roleI.includes(AccountRoleEnum.User) && <div className='role-element-user'>Người bệnh</div>}
        </div>
        let gender: string = genderI === 0 ? 'Nam' : 'Nữ'
        let status: JSX.Element = statusI === AccountStatus.Able ? <div className='status-element'><CheckCircleOutlineOutlinedIcon sx={{ color: '#2da55b86' }} />Hoạt động</div> : <div className='status-element'><NotInterestedOutlinedIcon sx={{ color: '#ff4646b4' }} />Vô hiệu hóa</div>
        return {
            userName,
            role,
            fullName,
            phoneNumber,
            insuranceNumber,
            gender,
            status
        };
    }

    const rows: AccountManagerTableColumns[] = [
        createData('ngo_hoai_nam1', [AccountRoleEnum.Admin, AccountRoleEnum.Doctor], 'Ngô Hoài Nam', '0123456788', '012345678', 0, AccountStatus.Able),
        createData('ngo_hoai_nam2', [AccountRoleEnum.Care, AccountRoleEnum.User], 'Ngô Hoài Nam', '0123456788', '012345678', 1, AccountStatus.Enable),
    ];

    const datas: AccountManagerTableDatas[] = [
        {
            id: 'alksdjaskjd232sd',
            userName: 'ngo_hoai_nam1',
            appUserRoleMappings: [{
                appUserId: 'alksdjaskjd232sd',
                roleId: 'qafafasfasfa2123',
                role: {
                    id: 'qafafasfasfa2123',
                    name: 'Admin',
                    code: 'Admin',
                    status: RoleStatus.Able
                }
            }],
            fullName: 'Ngô Hoài Nam',
            phone: '0123456788',
            insurance: '012345678',
            gender: UserGender.Male,
            status: AccountStatus.Able,
            used: false
        },
        {
            id: 'gdgdsgsd3423hhjj',
            userName: 'ngo_hoai_nam1',
            appUserRoleMappings: [{
                appUserId: 'gdgdsgsd3423hhjj',
                roleId: 'dgsgsdg342sdfsdf',
                role: {
                    id: 'dgsgsdg342sdfsdf',
                    name: 'Admin',
                    code: 'Admin',
                    status: RoleStatus.Able
                }
            }],
            fullName: 'Ngô Hoài Nam',
            phone: '0123456788',
            insurance: '012345678',
            gender: UserGender.Male,
            status: AccountStatus.Able,
            used: false
        },
    ];

    const renderTitleForm = () => {
        switch (accountAction) {
            case AccountAction.Create:
                return 'Tạo tài khoản'
            case AccountAction.Edit:
                return 'Chỉnh sửa tài khoản'
            case AccountAction.ChangePass:
                return 'Đổi mật khẩu'
            case AccountAction.Delete:
                return 'Xóa tài khoản'
            case AccountAction.Enable:
                return 'Khóa tài khoản'
            case AccountAction.Able:
                return 'Mở khóa tài khoản'
            case AccountAction.Assign:
                return 'Thêm vai trò cho tài khoản'
            default:
                return ''
        }
    }

    const renderBodyForm = () => {
        switch (accountAction) {
            case AccountAction.Create:
            case AccountAction.Edit:
                return renderBodyCreateForm()
            case AccountAction.ChangePass:
                return renderBodyChangePassForm()
            case AccountAction.Delete:
            case AccountAction.Enable:
            case AccountAction.Able:
                return renderBodyDeleteForm()
            case AccountAction.Assign:
                return <AssignRoleForm/>
            default:
                break;
        }
    }

    const renderBodyCreateForm = () => {
        return (
            <div className="account-create-form">
                <div className="account-create-field">
                    <TextField
                        label='Tên đăng nhập'
                        placeholder='--'
                        required={true}
                    // value={currentPatientProfile.patientName}
                    // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientName, value) }}
                    // errorMessage={errorMessageFormString.patientName}
                    />
                </div>
                <div className="account-create-field">
                    <TextField
                        label='Họ và tên'
                        placeholder='--'
                        required={true}
                    // value={currentPatientProfile.patientName}
                    // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientName, value) }}
                    // errorMessage={errorMessageFormString.patientName}
                    />
                </div>
                <div className="account-create-field">
                    <TextField
                        label='CMND'
                        placeholder='--'
                        required={true}
                    // value={currentPatientProfile.patientName}
                    // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientName, value) }}
                    // errorMessage={errorMessageFormString.patientName}
                    />
                </div>
                <div className="account-create-field">
                    <TextField
                        label='Số điện thoại'
                        placeholder='--'
                        required={true}
                    // value={currentPatientProfile.patientName}
                    // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientName, value) }}
                    // errorMessage={errorMessageFormString.patientName}
                    />
                </div>
                <div className="account-create-field">
                    <DatePicker
                        placeholder="Chọn một giá trị"
                        ariaLabel="Chọn một giá trị"
                        label='Ngày sinh'
                        isRequired={true}
                        // strings={defaultDatePickerStrings}
                        onSelectDate={(date) => { }}
                        value={new Date()}
                        // parseDateFromString={()}'
                        maxDate={new Date()}
                    />
                </div>
                <div className="account-create-field">
                    <Label required>Giới tính</Label>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Nam" />
                        <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                    </RadioGroup>
                </div>
                <div className="account-create-field display-flex">
                    <Label required>Trạng thái</Label>
                    <Switch
                        checked
                        onChange={() => {}}
                    />
                </div>
                {/* <div className="account-create-field">
                    <Label required>Phân quyền</Label>
                    <FormGroup row>
                        <FormControlLabel value={'admin'} control={<Checkbox />} label="Admin" />
                        <FormControlLabel value={'doctor'} control={<Checkbox />} label="Bác sĩ" /><FormControlLabel value={'care'} control={<Checkbox />} label="CSKH" /><FormControlLabel value={'user'} control={<Checkbox />} label="Người bệnh" />
                    </FormGroup>
                </div> */}
            </div>
        )
    }

    const renderBodyChangePassForm = () => {
        return (
            <div className="account-create-form">
                <div className="account-create-field">
                    <TextField
                        label='Mật khẩu mới'
                        placeholder='--'
                        required={true}
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"

                    // value={currentPatientProfile.patientName}
                    // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientName, value) }}
                    // errorMessage={errorMessageFormString.patientName}
                    />
                </div>
                <div className="account-create-field">
                    <TextField
                        label='Nhập lại mật khẩu'
                        placeholder='--'
                        required={true}
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                    // value={currentPatientProfile.patientName}
                    // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientName, value) }}
                    // errorMessage={errorMessageFormString.patientName}
                    />
                </div>
            </div>
        )
    }

    const renderBodyDeleteForm = () => {
        return (
            <div className="account-create-form">
                {accountAction === AccountAction.Enable ? <div className=''>Bạn có chắc chắn muốn khóa tài khoản <strong>ngo_hoai_nam1</strong></div> : (accountAction === AccountAction.Able ? <div className=''>Bạn có chắc chắn muốn mở khóa tài khoản <strong>ngo_hoai_nam1</strong></div> : <div className=''>Bạn có chắc chắn muốn xóa tài khoản <strong>ngo_hoai_nam1</strong><br />Thao tác này không thể khôi phục!</div>)}
            </div>
        )
    }

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        let requestBody = {

        }
        const result = new Promise((resolve) => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                showMessageBar("Cập nhật thông tin thành công", true, MessageBarStatus.Success)
                resolve('success')
            }, 4000);
        }).then(() => {/*  */

        })

        return result
    }

    return (
        <div className="accountmanager-page">
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: "Quản lý tài khoản", href: "/quan-ly-tai-khoan" },
                ]}
            />
            <div className="accountmanager-page-title">Danh sách tài khoản</div>
            <div className="accountmanager-page-search">
                <SearchBoxView
                    placeholder='User Name/ Họ và tên/ CMND'
                    onSearch={() => { }}
                />
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<AccountManagerTableColumns, AccountManagerTableDatas>
                    tableType={TableType.AccountManagerTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows}
                    dataTotal={datas}
                    hasCheckBox
                    page={currentPage}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={10}
                />
            </div>
            <DialogView
                title={renderTitleForm()}
                hidden={!showDialog}
                customContent={renderBodyForm()}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Lưu'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={() => { setShowDialog(false) }}
                loading={loadingButton}
            />
        </div>
    );
}

export default AccountManagerPage