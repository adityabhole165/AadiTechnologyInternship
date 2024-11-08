import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, ClickAwayListener, Grid, IconButton, List, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IDeleteMailGroupBody } from 'src/interfaces/ContactGroup/IContactGroup';
import { CDADeleteMailGroupMsg } from 'src/requests/ContactGroup/ReqContactGroup';
//import { useState } from 'react';
import { IContactGRPBody } from 'src/interfaces/MessageCenter/MessageCenter';
import { ContactGroup } from 'src/requests/AdminSMSCenter/To1';
import CheckboxImg from '../card/CheckboxImg';
import { ItemSize } from '../styled/CardStyle';
const ContactGroupCheckboxCard = ({ Item, onClick }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const schoolId = localStorage.getItem('localSchoolId');
    const asUserId = sessionStorage.getItem('Id');
    const academicYearId = sessionStorage.getItem('AcademicYearId');

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
        dispatch(CDADeleteMailGroupMsg(DeleteMailGroupBody));

        const ContactgroupBody: IContactGRPBody = {
            asScholId: schoolId,
            asAcademicYearId: academicYearId,
            asGroupId: '0',
            asUserRoleId: '3',
            asUserId: asUserId
        };

        dispatch(ContactGroup(ContactgroupBody));
    }

    // const OnShowEditDelete = () => {

    // };

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
                    {Item.IsAllDeactivated ? (
                        <ItemSize>{Item.Name}</ItemSize>
                    ) : (
                        <>
                            <Grid item container xs={12}>
                                <ClickAwayListener onClickAway={handleClickAway}>
                                    <Tooltip
                                        PopperProps={{ disablePortal: true }}
                                        onClose={handleClick}
                                        open={open}
                                        title={Item.Users}
                                        disableFocusListener
                                        disableHoverListener
                                        disableTouchListener
                                        arrow
                                        placement="right"
                                        componentsProps={{
                                            tooltip: { sx: { py: 0.7, width: '200px' } }
                                        }}
                                    >
                                        <ItemSize onClick={handleClick} onClickCapture={onChange}>
                                            {Item.Name !== '' ? (
                                                Item.Name
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
                                                        textAlign: 'center'
                                                    }}
                                                    variant="square"
                                                    aria-label="add"
                                                ></Avatar>
                                            )}
                                        </ItemSize>

                                    </Tooltip>

                                </ClickAwayListener>

                            </Grid>

                            <Grid container>
                                <Grid item xs={3}>
                                    <IconButton
                                    //onClickEdit={() => onClick({ Id: Item.Id, isActive: !Item.isActive })}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={3}>
                                    <IconButton
                                        onClick={() => onDelete(Item.Id)}
                                    >

                                        <DeleteForeverIcon />

                                    </IconButton>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Box>
            </List>
        </Box>
    );
};

export default ContactGroupCheckboxCard;
