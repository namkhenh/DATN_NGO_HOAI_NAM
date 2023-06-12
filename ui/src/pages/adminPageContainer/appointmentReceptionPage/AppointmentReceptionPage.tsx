import React, { useState } from 'react'
import './AppointmentReceptionPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { Label } from '@fluentui/react/lib/Label'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import TablePager from '../../../common/tablePager/TablePager'
import { AppointmentReceptionTableColumns, AppointmentReceptionTableDatas, TableType, UserGender } from '../../../model/enum/tableTypeEnum'
function AppointmentReceptionPage() {
    const [currentPage, setCurrentPage] = useState<number>(0)

    function createData(
        appointmentCode: string,
        appointmentDateI: string,
        appointmentTimeI: string,
        patientCode: string,
        patientName: string,
        patientDateOfBirth: string,
        patientGenderI: number,
        patientPhoneNumber: string,
        patientIdentityNumber: string,
        patientAddress: string,
    ): AppointmentReceptionTableColumns {
        let appointmentTime: string = appointmentDateI + ' ' + appointmentTimeI
        let patientGender: string = patientGenderI === UserGender.Male ? 'Nam' : 'Nữ'
        return {
            appointmentCode,
            appointmentTime,
            patientCode,
            patientName,
            patientDateOfBirth,
            patientGender,
            patientPhoneNumber,
            patientIdentityNumber,
            patientAddress,
        };
    }

    const rows: AppointmentReceptionTableColumns[][] = [
        [
            createData(
                'DL12345',
                '20/03/2023',
                '09:45',
                'BN23456',
                'Ngô Hoài Nam',
                '23/05/2001',
                0,
                '0123456789',
                '01234567',
                'Tân Triều'
            ),
            createData(
                'DL12346',
                '20/03/2023',
                '09:45',
                'BN23456',
                'Ngô Hoài Nam',
                '23/05/2001',
                0,
                '0123456789',
                '01234567',
                'Tân Triều'
            ),
            createData(
                'DL123475',
                '20/03/2023',
                '09:45',
                'BN23456',
                'Ngô Hoài Nam',
                '23/05/2001',
                0,
                '0123456789',
                '01234567',
                'Tân Triều'
            ),
        ], [
            createData(
                'DL123475',
                '20/03/2023',
                '09:45',
                'BN23456',
                'Ngô Hoài Nam',
                '23/05/2001',
                0,
                '0123456789',
                '01234567',
                'Tân Triều'
            )
        ]
    ];

    const datas: AppointmentReceptionTableDatas[][] = [
        [
            {
                appointmentId: 'sdklghsdhjfjk34234',
                appointmentCode: 'HS12345',
                appointmentDate: '22/03/2003',
                appointmentTime: '09:45',
                appointmentReason: 'đau đầu',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                appointmentStatus: 0,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            },
            {
                appointmentId: 'kasdfhkahsfjk22',
                appointmentCode: 'HS12345',
                appointmentDate: '22/03/2003',
                appointmentTime: '09:45',
                appointmentReason: 'đau đầu',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                appointmentStatus: 0,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            },
            {
                appointmentId: 'klsdhfjshdfkj3423j43',
                appointmentCode: 'HS12345',
                appointmentDate: '22/03/2003',
                appointmentTime: '09:45',
                appointmentReason: 'đau đầu',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                appointmentStatus: 0,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            },
        ],
        [
            {
                appointmentId: 'asdasdjkjh213h123j',
                appointmentCode: 'HS12345',
                appointmentDate: '22/03/2003',
                appointmentTime: '09:45',
                appointmentReason: 'đau đầu',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                appointmentStatus: 0,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            },
        ]
    ];
    return (
        <div className='patientlist-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Tiếp đón bệnh nhân đặt khám', href: '/tiep-don-dat-kham' },
                ]}
            />
            <div className="patientlist-page-title">
                Danh sách bệnh nhân đặt khám
            </div>
            <div className="patientlist-page-search">
                <div className="search-date">
                    <Label>Thời gian:</Label>
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
                        placeholder='Mã đặt lịch/ Mã bệnh nhân/ CMND'
                        onSearch={() => {}}
                    />
                </div>
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            {/* <DataTable/> */}

            <div className="patient-list-table">
                <TablePager<AppointmentReceptionTableColumns, AppointmentReceptionTableDatas>
                    tableType={TableType.AppointmentReceptionTable}
                    rowData={rows[currentPage]}
                    dataTotal={datas[currentPage]}
                    hasCheckBox={false}
                    hasTablePaging
                    page={currentPage}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={15}
                    hasNavigate
                    navigateLink={"/admin/tiep-don-dat-kham/chi-tiet-dat-kham/"}
                    isLoading={false}

                />
            </div>
        </div>
    )
}

export default AppointmentReceptionPage