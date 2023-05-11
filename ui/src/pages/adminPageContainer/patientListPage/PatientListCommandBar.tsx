import React from 'react'
import { TableType } from '../../../model/enum/tableTypeEnum'
import { IButtonProps, ICommandBarItemProps, ICommandBarStyles, styled } from '@fluentui/react'
import { CommandBarView } from '../../../common/commandBar/CommandBar'

interface IPatientListCommandBar {
    tableType: TableType
}

// const initActionBar: () => ICommandBarItemProps[] = () => {
//     const {tableType} = props
// }

function PatientListCommandBar(props: IPatientListCommandBar) {
    const initActionBar = (): ICommandBarItemProps[] => {
        switch (props.tableType) {
            case TableType.PatientListTable:
                return patientListActions()
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
                iconProps: { iconName: 'Add' },
                onClick: () => {
                    console.log("ok");
                }
            },
            {
                key: 'patient-list-decline',
                text: 'Từ chối',
                iconProps: { iconName: 'Cancel', style: {color: 'red'} },
                onClick: () => {
                    console.log("ok");
                }
                
                
            })

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