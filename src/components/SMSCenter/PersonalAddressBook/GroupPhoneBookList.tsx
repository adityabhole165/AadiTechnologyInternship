import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, IconButton, Table, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { red } from '@mui/material/colors';
interface PersonalAddressBookProps {
    PersonalAddressBookGroupId: string
    User_Id: string
    Name: string
    Is_Deleted: string
    IsActive: boolean
}

interface ListProps {
    itemList: PersonalAddressBookProps[];
    clickRow: any;
    clickEdit: any;
    clickDelete: any;
}
const GroupPhoneBookList = ({ itemList, clickRow, clickEdit, clickDelete }: ListProps) => {
    function clickRows(Value: any) {
        let returnValue = itemList.map((item: any) => {
            return (
                { ...item, IsActive: item.PersonalAddressBookGroupId === Value ? !item.IsActive : item.IsActive }
            )
        })
        clickRow(returnValue)
    }

    function isAllChecked() {
        let flag = true;
        itemList?.map((item, i) => {
            if (!item.IsActive) {
                flag = false
            }
        })
        return flag
    }

    function checkAll() {
        let newlist = itemList.map((item) => {
            return (
                { ...item, IsActive: !isAllChecked() }
            )
        })
        clickRow(newlist)
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow sx={{ background: (theme) => theme.palette.secondary.main, }}>
                        <TableCell sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, pt: '10px', pb: '10px' }} align="left">
                            <Checkbox checked={isAllChecked()} onClick={checkAll} />
                        </TableCell>
                        <TableCell sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, pt: '10px', pb: '10px' }} align="left">Group Name</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, pt: '10px', pb: '10px' }} align="center">Edit</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, pt: '10px', pb: '10px' }} align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                {itemList?.length > 0 && itemList?.map((item, i) => {
                    return (
                        <TableRow
                            key={i} >
                            <TableCell sx={{ pt: '10px', pb: '10px' }}>
                                <Checkbox checked={item.IsActive} onClick={() => { clickRows(item.PersonalAddressBookGroupId) }} />
                            </TableCell>
                            <TableCell sx={{ pt: '10px', pb: '10px' }}>
                                {item.Name}
                            </TableCell>
                            <TableCell align="center" sx={{ pt: '10px', pb: '10px' }}>
                                <Tooltip title='Edit'>
                                    <IconButton onClick={() => { clickEdit(item) }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="center" sx={{ pt: '10px', pb: '10px' }}>
                                <Tooltip title='Delete'>
                                    <IconButton
                                        onClick={() => { clickDelete(item) }}
                                        sx={{
                                            color: '#223354',
                                            '&:hover': {
                                                color: 'red',
                                                backgroundColor: red[100]
                                            }
                                        }}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>

                    )
                })}
            </Table>
        </>
    )
}

export default GroupPhoneBookList;