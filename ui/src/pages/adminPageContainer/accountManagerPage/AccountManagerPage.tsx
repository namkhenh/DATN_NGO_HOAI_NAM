import React from 'react'
import './AccountManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import TablePager from '../../../common/tablePager/TablePager'
import { AccountManagerTableColumns, TableType } from '../../../model/enum/tableTypeEnum'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import { AccountRoleEnum } from '../../../model/enum/accPermissionEnum'
function AccountManagerPage() {
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.AccountManagerTable}
                // showPreAccept={() => { setShowAccept(true); setPatientAction(PatientListAction.Accept) }}
                // showPreRefuse={() => { setShowRefuse(true); setPatientAction(PatientListAction.Refuse) }}
                // showPreCancel={() => { setShowCancel(true); setPatientAction(PatientListAction.Cancel) }}
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

    return (
        <div className='accountmanager-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Quản lý tài khoản', href: '/quan-ly-tai-khoan' },
                ]}
            />
            <div className="accountmanager-page-title">
                Danh sách tài khoản
            </div>
            <div className="patient-list-table">
                <TablePager<AccountManagerTableColumns>
                    tableType={TableType.AccountManagerTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows}
                    hasCheckBox
                />
            </div>
        </div>
    )
}

export default AccountManagerPage