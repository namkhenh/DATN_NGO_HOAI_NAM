import React, { useState } from 'react'
import './RoleManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
import TablePager from '../../../common/tablePager/TablePager';
import { AccountManagerTableColumns, RoleManagerTableColumns, TableType } from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import { AppointmentStatus } from '../../../model/enum/appointmentEnum';
import Checkbox from '@mui/material/Checkbox';
function RoleManagerPage() {
    const [currentPage, setCurrentPage] = useState<number>(0)
    // const [checkAdd, setCheckAdd] = useState<number>()
    // const [checkEdit, setCheckEdit] = useState<number>()
    // const [checkRemove, setCheckRemove] = useState<number>()
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.AccountManagerTable}
                
            />
        ])
    }

    function createData(
        userName: string,
        addI: number,
        editI: number,
        removeI: number,
    ): RoleManagerTableColumns {
        let add: JSX.Element = <Checkbox checked={addI === 1} onClick={() => {console.log(addI);
        }}/>
        let edit: JSX.Element = <Checkbox checked={editI === 1} />
        let remove: JSX.Element = <Checkbox checked={removeI === 1} />
        return {
            userName,
            add,
            edit,
            remove
        };
    }


    const rows: RoleManagerTableColumns[][] = [
        [
            createData("nam-nh-19", 0, 1, 0),
            createData("nam-nh-19", 0, 1, 1),
            createData("nam-nh-19", 1, 0, 1),
        ],
        [
            createData("nam-nh-19", 0, 1, 0),
        ]
    ];


    return (
        <div className='rolemanager-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Quản lý chức năng', href: '/quan-ly-chuc-nang' },
                ]}
            />
            <div className="rolemanager-page-title">
                Danh sách chức năng
            </div>
            <div className="rolemanager-page-search">
                <div className="search-id">
                    <SearchBoxView
                        placeholder='User Name'
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<RoleManagerTableColumns>
                    tableType={TableType.RoleManagerTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows[currentPage]}
                    hasCheckBox={false}
                    page={currentPage}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={15}
                    hasNavigate={false}
                />
            </div>
        </div>
    )
}

export default RoleManagerPage