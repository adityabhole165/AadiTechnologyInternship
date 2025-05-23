import { QuestionMark } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, List, Tooltip, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IDeleteMailGroupBody } from 'src/interfaces/ContactGroup/IContactGroup';
import { CDADeleteMailGroupMsg } from 'src/requests/ContactGroup/ReqContactGroup';
//import { useState } from 'react';
import { grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import React from 'react';
import { GetScreenPermission } from 'src/components/Common/Util';
import ContactGroupList from 'src/components/MessageCenter/ContactGroupList';
import { AlertContext } from 'src/contexts/AlertContext';
import { IContactGRPBody } from 'src/interfaces/MessageCenter/MessageCenter';
import { ContactGroup } from 'src/requests/AdminSMSCenter/To1';
import CheckboxImg from '../card/CheckboxImg';
import { ItemSize } from '../styled/CardStyle';

const ContactGroupCheckboxCard = ({ Item, onClick }) => {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [EditGroupName, setEditGroupName] = useState([]);
    const { showAlert, closeAlert } = useContext(AlertContext);
    const dispatch = useDispatch();
    const schoolId = localStorage.getItem('localSchoolId');
    const asUserId = sessionStorage.getItem('Id');
    const academicYearId = sessionStorage.getItem('AcademicYearId');
    const RoleId = sessionStorage.getItem('RoleId');
    const MessageCenterFullAccess = GetScreenPermission('Message Center');
    const handleClickAway = () => {
        setOpen(false);
    };
    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    const onChange = () => {
        onClick({ Id: Item.Id, isActive: !Item.isActive });
    };
    function onDelete(Id) {
        const DeleteMailGroupBody: IDeleteMailGroupBody = {
            asSchoolId: Number(schoolId),
            asGroupId: Id,
            asInsertedById: 0
        }
        if (!Item.isActive) {

            showAlert({
                title: 'Please Confirm',
                message: 'Are you sure you want to remove this group?',
                variant: 'warning',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                onCancel: () => {
                    closeAlert();
                },
                onConfirm: () => {

                    dispatch(CDADeleteMailGroupMsg(DeleteMailGroupBody));
                    closeAlert();
                },
            });
            const ContactgroupBody: IContactGRPBody = {
                asSchoolId: Number(schoolId),
                asAcademicYearId: Number(academicYearId),
                asGroupId: 0,
                asUserRoleId: Number(RoleId),
                asUserId: Number(asUserId)
            };
            dispatch(ContactGroup(ContactgroupBody));
        }
    }
    const onEdit = (Name) => {
        setEditGroupName(Name)
    }
    const handleOpenDialog = (isRecipients) => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <Box>
            <List sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, py: 0.2, }}>
                <Box sx={{ display: 'flex' }}>
                    <CheckboxImg
                        name={Item.Name}
                        value={Item.Value}
                        checked={Item.isActive}
                        onChange={onChange}
                        IsAllDeactivated={Item.IsAllDeactivated}
                        IsExamSubmitted={Item.IsExamSubmitted}
                    />
                    {/* {Item.IsAllDeactivated ? (
                        <ItemSize>{Item.Name}</ItemSize>
                    ) : ( */}
                    <>
                        <Grid item container xs={12}>
                            <Tooltip

                                title={
                                    <React.Fragment>
                                        <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>{Item.Name}</Typography>
                                        <Typography variant="body1" sx={{ color: 'white' }}>{Item.Users}</Typography>
                                    </React.Fragment>
                                }
                                placement="right"
                                disableFocusListener
                                disableTouchListener
                                PopperProps={{ disablePortal: true }}
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                        overflow: 'hidden',
                                            whiteSpace: 'normal',
                                            textOverflow: 'ellipsis',
                                            maxHeight: '6.25rem',
                                            lineHeight: '1.25rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 4,
                                            WebkitBoxOrient: 'vertical',
                                            position: 'relative',
                                        }
                                    },
                                }}
                            >
                                <ItemSize>

                                    {
                                        Item.Name !== '' ? (
                                            // <Tooltip title={Item.Name} placement='right'>
                                            <Typography sx={{ width: '130px', overflow: 'hidden', color: '#38548A	' }}>
                                                {Item.Name}
                                            </Typography>
                                            // </Tooltip>
                                        ) : (
                                            <Avatar
                                                alt="user.name"
                                                src={
                                                    localStorage.getItem('SiteURL') +
                                                    'RITeSchool/Uploads/OnlineExamImages/' +
                                                    Item.path1
                                                }
                                                sx={{
                                                    width: '180px',
                                                    height: '160px',
                                                    border: '2px solid gray',
                                                    textAlign: 'center',
                                                }}
                                                variant="square"
                                                aria-label="add"
                                            ></Avatar>
                                        )}
                                </ItemSize>
                            </Tooltip>
                        </Grid>


                        <Grid container>
                            <Grid item xs={4}>
                                {MessageCenterFullAccess === 'Y' && (
                                    <IconButton sx={{
                                        ml: 1,
                                        p: 0,
                                        textAlign: 'left',
                                        color: '#38548A	',
                                        '&:hover': {
                                            color: '#38548A',
                                            p: 0,
                                            backgroundColor: grey[300]
                                        }
                                    }}

                                        onClick={() => handleOpenDialog(true)}
                                    >
                                        <Tooltip title="Edit" >
                                            <EditIcon sx={{ p: 0 }} />
                                        </Tooltip>
                                    </IconButton>
                                )}
                            </Grid>
                            <Grid item xs={4}>
                                {MessageCenterFullAccess === 'Y' && (
                                    <IconButton
                                        onClick={() => onDelete(Item.Id)}
                                        sx={{
                                            ml: 4.5,
                                            p: 0,
                                            color: '#38548A	',
                                            '&:hover': {
                                                color: 'red',
                                                p: 0,
                                                backgroundColor: red[100]
                                            }
                                        }}

                                    >
                                        <Tooltip title="Delete" >

                                            <DeleteForeverIcon sx={{ p: 0 }} />
                                        </Tooltip>

                                    </IconButton>
                                )}
                            </Grid>
                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                fullWidth
                                maxWidth="md"
                                PaperProps={{ sx: { borderRadius: '15px' } }}
                            >
                                <DialogTitle sx={{ bgcolor: '#223354' }}>
                                    <Tooltip
                                        title={'Add / edit delete contact group(s).'}
                                        placement="bottom-end"
                                    >
                                        <QuestionMark
                                            sx={{
                                                color: 'white',
                                                // background:'white',
                                                borderRadius: '10px',
                                                position: 'absolute',
                                                top: '4px',
                                                right: '35px',
                                                cursor: 'pointer',
                                                '&:hover': { backgroundColor: grey[600] }
                                            }}
                                        />
                                    </Tooltip>
                                    <ClearIcon
                                        onClick={handleCloseDialog}
                                        sx={{
                                            color: 'white',
                                            borderRadius: '7px',
                                            position: 'absolute',
                                            top: '5px',
                                            right: '8px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: 'red'
                                            }
                                        }}
                                    />
                                </DialogTitle>
                                <Typography variant="h3" sx={{ pt: 2, pl: 3 }}>
                                    Update Contact Group
                                </Typography>

                                <DialogContent>
                                    <Box>
                                        <ContactGroupList onClose={handleCloseDialog} GPID={Item.Id} GPName={Item.Name} />
                                    </Box>
                                </DialogContent>
                            </Dialog>
                        </Grid>
                    </>
                    {/* )} */}
                </Box>
            </List>
        </Box>
    );
};

export default ContactGroupCheckboxCard;

