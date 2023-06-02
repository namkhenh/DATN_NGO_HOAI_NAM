import React, { useState } from 'react'
import './PaidManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import { Label } from '@fluentui/react/lib/Label'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import TablePager from '../../../common/tablePager/TablePager'
import { PaidListTableColumns, PaidListTableDatas, TableType } from '../../../model/enum/tableTypeEnum'
import { PaidStatus } from '../paidDetailManagerPage/PaidDetailManagerPage'
import { Dropdown } from '../../../common/dropdown/DropDown'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'

function PaidManagerPage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [currentPage,setCurrentPage]= useState<number>(0)
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.PaidManagerTable}
            />
        ])
    }

    function createData(
        profileCode: string,
        patientCode: string,
        profileDate: string,
        profileTime: string,
        paidStatusI: number,
        patientName: string,
        patientDateOfBirth: string,
        patientPhone: string,

    ): PaidListTableColumns {
        let paidStatus: JSX.Element = paidStatusI === PaidStatus.Paid ? <div className='patient-paid'>Đã thanh toán</div> : <div className='patient-unpaid'>Chưa thanh toán</div>
        return {
            profileCode,
            patientCode,
            profileDate,
            profileTime,
            paidStatus,
            patientName,
            patientDateOfBirth,
            patientPhone
        };
    }

    const rows: PaidListTableColumns[][] = [
        [
            createData('HS12345', 'BN12345', '23/03/2023', '09:45', 0, 'Ngô Hoài Nam', '20/04/2001', '0123456789'),
            createData('HS12346', 'BN12346', '23/03/2023', '09:45', 1, 'Ngô Hoài Nam', '20/04/2001', '0123456789')
        ],
        [
            createData('HS12347', 'BN12347', '23/03/2023', '09:45', 0, 'Ngô Hoài Nam', '20/04/2001', '0123456789')
        ],

    ]

    const datas: PaidListTableDatas[][] = [
        [
            {
                profileId: '21lkjasfdkljkljdf',
                profileCode: 'HS12345',
                patientId: 'asdlaksdjk22erfa',
                patientCode: 'BN12345',
                profileDate: '23/03/2023',
                profileTime: '09:45',
                patientDateOfBirth: '23/03/2023',
                patientPhone: '0123456789',
                patientAddress: 'aannnncccccc',
                paidStatus: 0,
                paidContent: [
                    {
                        serviceId: '124k2lrkejfkl',
                        serviceCode: '123',
                        serviceName: 'Khám Nhi',
                        serviceCost: '345000'
                    }
                ],
            },
            {
                profileId: 'kldfkljsdfklj23123',
                profileCode: 'HS12346',
                patientId: 'dsfhjkfhjkafas',
                patientCode: 'BN12346',
                profileDate: '23/03/2023',
                profileTime: '09:45',
                patientDateOfBirth: '23/03/2023',
                patientPhone: '0123456789',
                patientAddress: 'aannnncccccc',
                paidStatus: 0,
                paidContent: [
                    {
                        serviceId: '124k2lrkejfkl',
                        serviceCode: '123',
                        serviceName: 'Khám Nhi',
                        serviceCost: '345000'
                    }
                ],
            }
        ],
        [
            {
                profileId: 'wejhkqwjjkjk2h2',
                profileCode: 'HS12347',
                patientId: 'asdasdnasdnmasd222',
                patientCode: 'BN12347',
                profileDate: '23/03/2023',
                profileTime: '09:45',
                patientDateOfBirth: '23/03/2023',
                patientPhone: '0123456789',
                patientAddress: 'aannnncccccc',
                paidStatus: 0,
                paidContent: [
                    {
                        serviceId: '124k2lrkejfkl',
                        serviceCode: '123',
                        serviceName: 'Khám Nhi',
                        serviceCost: '345000'
                    }
                ],
            }
        ]
    ]

    return (
        <div className='paidmanager-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Thanh toán ngoại trú', href: '/admin/danh-sach-benh-nhan' },
                ]}
            />
            <div className="paidmanager-page-title">
                Danh sách bệnh nhân
            </div>
            <div className="paidmanager-page-header">
                <div className="paidmanager-page-status">
                    <Label>Chọn trạng thái</Label>
                    <div className="status-option">
                        <Dropdown
                            placeholder="--"
                            options={[]}
                            selectedKey={1}
                            onChange={(_, selected) => { }}
                            errorMessage={''}
                        // onFocus={() => { this.getDistrictOptions.bind(this)(Number(patientAddress.province?.key)) }}
                        />
                    </div>
                </div>
                <div className="search-date">
                    <Label>Thời gian tiếp nhận:</Label>
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
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<PaidListTableColumns, PaidListTableDatas>
                    tableType={TableType.PaidManagerTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows[currentPage]}
                    dataTotal={datas[currentPage]}
                    hasCheckBox
                    page={currentPage}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={10}
                    hasTablePaging
                    hasNavigate
                    navigateLink={"/admin/thanh-toan-ngoai-tru/chi-tiet-thanh-toan/"}
                />
            </div>
        </div>
    )
}

export default PaidManagerPage