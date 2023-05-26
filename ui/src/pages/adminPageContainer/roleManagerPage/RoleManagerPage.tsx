import React, { useState } from 'react'
import './RoleManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
import TablePager from '../../../common/tablePager/TablePager';
import { AccountManagerTableColumns, RoleManagerTableColumns, RoleManagerTableDatas, TableType } from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import { AppointmentStatus } from '../../../model/enum/appointmentEnum';
import Checkbox from '@mui/material/Checkbox';
import TablePagerCheckBox from '../../../common/tablePager/TablePagerCheckBox';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';

export enum RoleStatus {
    Able,
    Enable
}

export enum RoleAction {
    Create,
    Edit,
    Assign,
    Delete
}

function RoleManagerPage() {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [roleAction, setRoleAction] = useState<RoleAction>()
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.RoleManagerTable}
                // showRoleCreate={() => { setShowDialog(true); setRoleAction(RoleAction.Create) }}
                // showRoleEdit={() => { setShowDialog(true); setRoleAction(RoleAction.Edit) }}
                // showRoleAssign={() => { setShowDialog(true); setRoleAction(RoleAction.Assign) }}
                // showRoleDelete={() => { setShowDialog(true); setRoleAction(RoleAction.Delete) }}
            />
        ])
    }

    function createData(
        roleCode: string,
        roleName: string,
        roleStatusI: RoleStatus
    ): RoleManagerTableColumns {
        // let add: JSX.Element = <Checkbox checked={addI === 1} onClick={() => {console.log(addI);
        // }}/>
        // let edit: JSX.Element = <Checkbox checked={editI === 1} />
        // let remove: JSX.Element = <Checkbox checked={removeI === 1} />
        let roleStatus: JSX.Element = roleStatusI === RoleStatus.Able ? <div className='status-element'><CheckCircleOutlineOutlinedIcon sx={{ color: '#2da55b86' }} />Hoạt động</div> : <div className='status-element'><NotInterestedOutlinedIcon sx={{ color: '#ff4646b4' }} />Vô hiệu hóa</div> 
        return {
            roleCode,
            roleName,
            roleStatus
        };
    }


    const rows: RoleManagerTableColumns[][] = [
        [
            createData("admin-01", "Admin", RoleStatus.Able),
            createData("doctor-01", "Bác sĩ", RoleStatus.Able),
            createData("doctor-02", "Bác sĩ A", RoleStatus.Enable),
        ],
        [
            createData("care-01", "CSKH", RoleStatus.Able),
        ]
    ];

    const datas: RoleManagerTableDatas[][] = [
        [
            {
                id: 'qawqwdik2h2j322',
                code: 'admin-01',
                name: 'Admin',
                status: RoleStatus.Able
            },
            {
                id: 'dfioweuw224325235d',
                code: 'doctor-01',
                name: 'Bác sĩ',
                status: RoleStatus.Able
            },
            {
                id: 'gfifhsdklkl333nj',
                code: 'doctor-02',
                name: 'Bác sĩ A',
                status: RoleStatus.Enable
            }
        ],
        [
            {
                id: 'a2kjhjjkh2il4h2',
                code: 'care-01',
                name: 'CSKH',
                status: RoleStatus.Able
            }
        ]
    ];

    const renderTitleForm = () => {
        switch (roleAction) {
            case RoleAction.Create:
                return 'Tạo vai trò'
            case RoleAction.Edit:
                return 'Chỉnh sửa vai trò'
            case RoleAction.Delete:
                return 'Xóa vai trò'
            case RoleAction.Assign:
                return 'Gán người dùng cho vai trò'
            default:
                return ''
        }
    }

    // const renderBodyForm = () => {
    //     switch (roleAction) {
    //         case RoleAction.Create:
    //         case AccountAction.Edit:
    //             return renderBodyCreateForm()
    //         case AccountAction.ChangePass:
    //             return renderBodyChangePassForm()
    //         case AccountAction.Delete:
    //         case AccountAction.Enable:
    //         case AccountAction.Able:
    //             return renderBodyDeleteForm()
    //         case AccountAction.Assign:
    //             return <AssignRoleForm />
    //         default:
    //             break;
    //     }
    // }


    return (
        <div className='rolemanager-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Quản lý vai trò', href: '/quan-ly-vai-tro' },
                ]}
            />
            <div className="rolemanager-page-title">
                Danh sách vai trò
            </div>
            <div className="rolemanager-page-search">
                <div className="search-id">
                    <SearchBoxView
                        placeholder='Mã vai trò'
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<RoleManagerTableColumns, RoleManagerTableDatas>
                    tableType={TableType.RoleManagerTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows[currentPage]}
                    dataTotal={datas[currentPage]}
                    hasCheckBox
                    page={currentPage}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={15}
                    hasNavigate
                    navigateLink='/admin/quan-ly-vai-tro/chi-tiet-vai-tro/'
                />
            </div>
            {/* <DialogView
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
            /> */}
        </div>
    )
}

export default RoleManagerPage