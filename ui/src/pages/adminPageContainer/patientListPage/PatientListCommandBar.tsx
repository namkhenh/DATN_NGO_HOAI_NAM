import React from 'react'
import { TableType } from '../../../model/enum/tableTypeEnum'
import { IButtonProps, ICommandBarItemProps, ICommandBarStyles, styled } from '@fluentui/react'
import { CommandBarView } from '../../../common/commandBar/CommandBar'

interface IPatientListCommandBar {
    tableType: TableType
    showPatientAccept?: () => void
    showPatientRefuse?: () => void
    showPatientCancel?: () => void
    showAccountEdit?: () => void
    showAccountCreate?: () => void
    showAccountDelete?: () => void
}

// const initActionBar: () => ICommandBarItemProps[] = () => {
//     const {tableType} = props
// }

function PatientListCommandBar(props: IPatientListCommandBar) {
    const initActionBar = (): ICommandBarItemProps[] => {
        switch (props.tableType) {
            case TableType.PatientListTable:
                return patientListActions()
            case TableType.AccountManagerTable:
                return accountManagerActions()
            default:
                return [];
        }
    }

    const patientListActions = (): ICommandBarItemProps[] => {
        let commandBarItems: ICommandBarItemProps[] = []
        commandBarItems.push(
            {
                key: 'patient-list-accept',
                text: 'Đồng ý',
                iconProps: { iconName: 'EventAccepted', style: { color: '#00794E' } },
                onClick: () => {
                    props.showPatientAccept!()
                }
            },
            {
                key: 'patient-list-decline',
                text: 'Từ chối',
                iconProps: { iconName: 'EventDeclined', style: { color: '#AC0000'} },
                onClick: () => {
                    props.showPatientRefuse!()
                }
            },
            {
                key: 'patient-list-decline',
                text: 'Hủy lịch',
                iconProps: { iconName: 'Cancel', style: { color: '#AC0000' } },
                onClick: () => {
                    props.showPatientCancel!()
                }
            },
            {
                key: 'patient-list-decline',
                text: 'Xuất file',
                iconProps: { iconName: 'Download', style: { color: '#1976d2'} },
                onClick: () => {
                    console.log("ok");
                }
            },
            {
                key: 'patient-list-decline',
                text: 'Chỉnh sửa',
                iconProps: { iconName: 'Edit', style: { color: '#707070' } },
                onClick: () => {
                    console.log("ok");
                }
            })

        return commandBarItems
    }

    const accountManagerActions = (): ICommandBarItemProps[] => {
        let commandBarItems: ICommandBarItemProps[] = []
        commandBarItems.push(
            {
                key: 'account-create',
                text: 'Tạo tài khoản',
                iconProps: { iconName: 'AddFriend', style: { color: '#00794E' } },
                onClick: () => {
                    props.showAccountCreate!()
                }
            },
            {
                key: 'account-edit',
                text: 'Chỉnh sửa',
                iconProps: { iconName: 'edit', style: { color: '#707070' } },
                onClick: () => {
                    props.showAccountEdit!()
                }
            },
            {
                key: 'account-delete',
                text: 'Xóa tài khoản',
                iconProps: { iconName: 'trash', style: { color: '#AC0000' } },
                onClick: () => {
                    props.showAccountDelete!()
                }
            }
        )

        return commandBarItems
    }

    const commandBarStyles: ICommandBarStyles = {
        root: {
            paddingLeft: 12,
        }
    }
    const overflowProps: IButtonProps = { ariaLabel: 'More commands' };
    return (
        <React.Fragment>
            <CommandBarView
                onReduceData={() => {
                    return undefined
                }}
                shiftOnReduce={false}
                overflowButtonProps={overflowProps}
                overflowItems={[]}
                className='patient-list-commandbar'
                items={initActionBar()}
                styles={commandBarStyles}
            />
        </React.Fragment>
    )
}

export default PatientListCommandBar