import React from 'react'
import './PatientListPage.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import AdminHeaderPage from '../../../structure/headerPage/AdminHeaderPage';
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb';
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
import { Label } from '@fluentui/react';
import { DatePicker } from '../../../common/datePicker/DatePicker';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TablePager from '../../../common/tablePager/TablePager';
import PatientListCommandBar from './PatientListCommandBar';
import { TableType } from '../../../model/enum/tableTypeEnum';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const DataTable = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowDoubleClick={(select) => { console.log(select) }}
      />
    </div>
  );
}
function PatientListPage() {
  const onSearch = (newValue: string) => {
    console.log(newValue);
    
  }
  return (
    <div className='patientlist-page'>
      <BreadCrumb
        breadcrumbItem={[
          { key: 1, text: 'Danh sách bệnh nhân hẹn khám', href: '/danh-sach-hen-kham' },
          { key: 1, text: 'Danh sách bệnh nhân hẹn khám', href: '/danh-sach-hen-kham' },
        ]}
      />
      <div className="patientlist-page-title">
        Danh sách bệnh nhân hẹn khám
      </div>
      <div className="patientlist-page-search">
        <div className="search-id">
          <SearchBoxView
            placeholder='Mã đặt lịch/ Mã bệnh nhân/ CMND'
            onSearch={onSearch}
          />
        </div>
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
          <div className='line' style={{ width: '12px', height: '1px', backgroundColor: '#000000', margin: '0 8px'}}></div>
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
      {/* <DataTable/> */}
      <PatientListCommandBar
        key={'patient-list-commandbar'}
        // {...props}
        tableType={TableType.PatientListTable}
      />
      <TablePager/>
    </div>
  )
}

export default PatientListPage