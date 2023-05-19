import React, { useState } from 'react'
import './AccountManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import TablePager from '../../../common/tablePager/TablePager'
import { AccountManagerTableColumns, TableType } from '../../../model/enum/tableTypeEnum'
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


enum AccountAction {
    Create,
    Edit,
    Delete
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
            />
        ])
    }

    function createData(
        userName: string,
        roleI: AccountRoleEnum[],
        fullName: string,
        phoneNumber: string,
        insuranceNumber: string,
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
            {roleI.includes(AccountRoleEnum.Admin)  && <div className='role-element-admin'>Admin</div>}
            {roleI.includes(AccountRoleEnum.Doctor)  && <div className='role-element-doctor'>Bác sĩ</div>}
            {roleI.includes(AccountRoleEnum.Care) && <div className='role-element-care'>CSKH</div>}
            {roleI.includes(AccountRoleEnum.User) && <div className='role-element-user'>Người bệnh</div>}
        </div>
        return {
            userName,
            role,
            fullName,
            phoneNumber,
            insuranceNumber,
        };
    }

    const rows: AccountManagerTableColumns[] = [
        createData('ngo_hoai_nam', [AccountRoleEnum.Admin, AccountRoleEnum.Doctor], 'Ngô Hoài Nam', '0123456788', '012345678'),
        createData('ngo_hoai_nam', [AccountRoleEnum.Care, AccountRoleEnum.User], 'Ngô Hoài Nam', '0123456788', '012345678'),
        createData('ngo_hoai_nam', [AccountRoleEnum.Doctor], 'Ngô Hoài Nam', '0123456788', '012345678'),
    ];

    const renderBodyForm = () => {
        return (
            <div className="account-create-form">
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
                        onSelectDate={(date) => {  }}
                        value={new Date()}
                        // parseDateFromString={()}'
                        maxDate={new Date()}
                    />
                </div>
                <div className="account-create-field">
                    <Dropdown
                        placeholder="Chọn một giá trị"
                        label="Giới tính"
                        options={UserSexView}
                        selectedKey={1}
                        required
                        onChange={(_, selected) => {
                            // onChangeOneFieldForm(PatientProfileModelProperty.patientSex, Number(selected?.key))
                        }}
                        // errorMessage={errorMessageFormString.patientSex}
                    />
                </div>
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
                    onSearch={()=> {}}
                />
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
        <div className="patient-list-table">
          <TablePager<AccountManagerTableColumns>
            tableType={TableType.AccountManagerTable}
            batchActionElements={onRenderActionButtons()}
            rowData={rows}
            hasCheckBox
            page={currentPage}
            handleChangePage={(page) => {setCurrentPage(page)} }
            total={10}
          />
        </div>
            <DialogView
                title={'Tạo tài khoản'}
                hidden={!showDialog}
                customContent={renderBodyForm()}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Lưu'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={() => {setShowDialog(false)}}
                loading={loadingButton}
            />
      </div>
    );
}

export default AccountManagerPage