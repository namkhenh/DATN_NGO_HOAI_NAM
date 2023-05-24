import React, { useEffect, useState } from 'react'
import './AssignRoleForm.scss'
import { Dropdown } from '../../common/dropdown/DropDown'
import { Autocomplete, Button, TextField } from '@mui/material'
import { ButtonVariantType } from '../../model/enum/buttonEnum'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";
import { RoleManagerTableDatas } from '../../model/enum/tableTypeEnum'
import { RoleStatus } from '../../pages/adminPageContainer/roleManagerPage/RoleManagerPage'
interface RoleTableColumns {
  roleId: string
  roleName: string
  roleTask: JSX.Element
}




function AssignRoleForm() {
  const [roleList, setRoleList] = useState<RoleManagerTableDatas[]>([])
  const [selected, setSelected] = useState<RoleManagerTableDatas>()
  const [rows, setRow] = useState<RoleTableColumns[]>([])
  
  useEffect(() => {
    if (!!selected) {
      setRow(roleList.map((e: RoleManagerTableDatas) => {
        return {
          roleId: e.roleId, roleName: e.roleName, roleTask: <IconButton aria-label="delete" size="small" onClick={() => { removeRole(e.roleId) }}>
            <DeleteIcon color='error' />
          </IconButton>
        }
      }))
    }
  }, [roleList])
  
  const removeRole = (idDel: string) => {
    setRoleList(roleList.filter((e) => idDel !== e.roleId))
  }

  return (
    <div className='assignrole-form'>
      <div className="assignrole-action">
        <div className="assignrole-choose">
          <Autocomplete
            disablePortal
            id="assignrole-box-select"
            options={[{ roleName: "Bác sĩ", roleId: "aa11", roleStatus: RoleStatus.Enable }, { roleName: "Admin", roleId: "aa22", roleStatus: RoleStatus.Enable }, { roleName: "Bác ", roleId: "aa33", roleStatus: RoleStatus.Enable }]}
            isOptionEqualToValue={(option, value) => option.roleId === value.roleId}
            getOptionLabel={(option) => option.roleName}
            sx={{ width: 420 }}
            renderInput={(params) => <TextField {...params} label="" placeholder='Chọn vai trò'/>}
            onChange={(_, selected) => {
              setSelected(selected!)
            }}
          />
        </div>
        <div className="assignrole-assign">
          <Button
            variant={ButtonVariantType.Contained}
            endIcon={<AddCircleOutlineOutlinedIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => {
              if (!!selected) {
                roleList.filter((role) => 
                  role.roleId === selected.roleId
                ).length === 0 &&
                setRoleList(roleList.concat(selected))
              }
            }}
          >Gán quyền</Button>
        </div>
      </div>
      <div className="role-assign-list">
        {rows.length !== 0 ?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã vai trò</TableCell>
                  <TableCell>Tên vai trò</TableCell>
                  <TableCell align='center'>Tác vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.roleId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.roleId}
                    </TableCell>
                    <TableCell>{row.roleName}</TableCell>
                    <TableCell align='center'>{row.roleTask}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> :
          <div className="role-assign-list-nodata">
            <ContentPasteOffOutlinedIcon />
            Không có dữ liệu để hiển thị
          </div>}
      </div>
    </div>
  )
}

export default AssignRoleForm