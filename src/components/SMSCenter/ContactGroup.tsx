import { QuestionMark } from "@mui/icons-material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import { Box, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetMailingGroupsBody } from "src/interfaces/ContactGroup/IContactGroup";
import { CDAGetMailingGroups } from "src/requests/ContactGroup/ReqContactGroup";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";
function ContactGroup() {
    const dispatch = useDispatch();

    const USGetMailingGroups: any = useSelector((state: RootState) => state.ContactGroup.IGetMailingGroups);
    console.log(USGetMailingGroups, '@@@@@@@')
    const ContactGroupDetails: IGetMailingGroupsBody = {
        asSchoolId: 18,
        asAcademicYearId: 55,
        asGroupId: 0,
        asRoleId: 0,
        asUserId: 4463
    };
    useEffect(() => {
        dispatch(CDAGetMailingGroups(ContactGroupDetails));
    }, []);
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Compose SMS', path: '/extended-sidebar/Teacher/ComposeSMS'
                    },
                    {
                        title: 'Contact Group', path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Tooltip title={'Add new contact.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: green[500],
                                    '&:hover': {
                                        backgroundColor: green[600]
                                    }
                                }}
                            // onClick={() => { RadioValue === '1' ? handleIContactListAdd() : handleGroupContactListAdd() }}
                            >
                                <GroupAddRoundedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={`Personalise your phone book and select name and click on OK button. Also you can create groups of selected users.`}>
                            <IconButton sx={{ bgcolor: 'grey.500', color: 'white', '&:hover': { bgcolor: 'grey.600' } }}>
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </>}
            />
            <Box sx={{ background: 'white', p: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, }}>
                            <TableCell sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, pt: '10px', pb: '10px' }} align="left"><Checkbox /></TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, pt: '10px', pb: '10px' }} align="left">Group Name</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, pt: '10px', pb: '10px' }} align="center">Edit</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, pt: '10px', pb: '10px' }} align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {USGetMailingGroups.map((item) => {
                            <TableRow key={item.GroupId}>
                                <TableCell sx={{ pt: '10px', pb: '10px' }}>
                                    <Checkbox />
                                </TableCell>
                                <TableCell sx={{ pt: '10px', pb: '10px' }}>
                                    {item.GroupName}
                                </TableCell>
                                <TableCell align="center" sx={{ pt: '10px', pb: '10px' }}>
                                    <Tooltip title='Edit'>
                                        <IconButton >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center" sx={{ pt: '10px', pb: '10px' }}>
                                    <Tooltip title='Delete'>
                                        <IconButton
                                            sx={{ color: '#223354', '&:hover': { color: 'red', backgroundColor: red[100] } }}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Box>
        </Box>

    )
}

export default ContactGroup