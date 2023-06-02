import React, { useState } from 'react'
import './PatientReceptionList.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb';
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
import { Label } from '@fluentui/react';
import { DatePicker } from '../../../common/datePicker/DatePicker';
import TablePager from '../../../common/tablePager/TablePager';
import {  PatientListTableColumns, PatientListTableDatas, TableType, UserGender } from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
function PatientReceptionList() {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.PatientReceptionListTable}
            />
        ])
    }

    function createData(
        profileDateI: string,
        profileTimeI: string,
        profileCode: string,
        patientCode: string,
        emergencyStatusI: boolean,
        patientName: string,
        patientDateOfBirth: string,
        patientGenderI: number,
        patientPhoneNumber: string,
    ): PatientListTableColumns {
        let profileDate = profileDateI + '    ' + profileTimeI
        let emergencyStatus: JSX.Element = emergencyStatusI ? <CheckCircleIcon color='success' /> : <UnpublishedIcon color='error' />
        let patientGender: string = patientGenderI === UserGender.Male ? 'Nam' : 'Nữ'
        return {
            profileCode,
            profileDate,
            patientCode,
            emergencyStatus,
            patientName,
            patientDateOfBirth,
            patientGender,
            patientPhoneNumber
        };
    }

    const rows: PatientListTableColumns[][] = [
        [
            createData(
                '22/03/2003',
                '09:45',
                'HS12345',
                'BN23456',
                true,
                'Ngô Hoài Nam',
                '23/05/2001',
                0,
                '0123456789'
            ),
            createData(
                '22/03/2003',
                '09:45',
                'HS12346',
                'BN23457',
                false,
                'Ngô Hoài Nam',
                '23/05/2001',
                0,
                '0123456789'
            ),
            createData(
                '22/03/2003',
                '09:45',
                'HS12347',
                'BN23458',
                true,
                'Ngô Hoài Nam',
                '23/05/2001',
                0,
                '0123456789'
            ),
        ], [
            createData(
                '22/03/2003',
                '09:45',
                'HS12348',
                'BN23459',
                false,
                'Ngô Hoài Nam',
                '23/05/2001',
                1,
                '0123456789'
            )
        ]
    ];

    const datas: PatientListTableDatas[][] = [
        [
            {
                profileId: 'sdklghsdhjfjk34234',
                profileCode: 'HS12345',
                profileDate: '22/03/2003',
                profileTime: '09:45',
                profileReason: 'đau đầu',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                emergencyStatus: true,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            },
            {
                profileId: 'sdgjhsdkjfsdjk223',
                profileCode: 'HS12345',
                profileDate: '22/03/2003',
                profileTime: '09:45',
                profileReason: 'đau đầu',
                patientId: 'lkdfjklasjdf23123',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                emergencyStatus: true,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            },
            {
                profileId: 'asfdf2343rfsdfsg',
                profileCode: 'HS12345',
                profileDate: '22/03/2003',
                profileTime: '09:45',
                profileReason: 'đau đầu',
                patientId: 'sdgdsfhdgfh234rd',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                emergencyStatus: true,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            }
        ],
        [
            {
                profileId: 'aslkjfhsdjkhfjk324234',
                profileCode: 'HS12345',
                profileDate: '22/03/2003',
                profileTime: '09:45',
                profileReason: 'đau đầu',
                patientId: 'sdfsdflkmmas23m4k32',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                emergencyStatus: true,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            }
        ]
    ];

    return (
        <div className='patientlist-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Tiếp đón bệnh nhân', href: '/tiep-don-benh-nhan' },
                ]}
            />
            <div className="patientlist-page-title">
                Danh sách bệnh nhân
            </div>
            <div className="patientlist-page-search">
                <div className="search-date">
                    <Label>Ngày đăng ký:</Label>
                    <div className="search-date-item">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            isRequired={false}
                            // strings={defaultDatePickerStrings}
                            // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                            value={new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                    <div className='line' style={{ width: '12px', height: '1px', backgroundColor: '#000000', margin: '0 8px' }}></div>
                    <div className="search-date-item">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            isRequired={false}
                            // strings={defaultDatePickerStrings}
                            // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                            value={new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                </div>
                <div className="search-id">
                    <SearchBoxView
                        placeholder='Mã bệnh nhân/ Số điện thoại/ CMND'
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            {/* <DataTable/> */}

            <div className="patient-list-table">
                <TablePager<PatientListTableColumns, PatientListTableDatas>
                    tableType={TableType.PatientReceptionListTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows[currentPage]}
                    dataTotal={datas[currentPage]}
                    hasCheckBox
                    page={currentPage}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={15}
                    hasNavigate
                    navigateLink={"/admin/tiep-don-benh-nhan/chi-dinh-dich-vu/"}
                />
            </div>
        </div>
    )
}

export default PatientReceptionList