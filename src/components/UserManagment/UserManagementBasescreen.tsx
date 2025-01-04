import { SearchTwoTone } from '@mui/icons-material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import UnsubscribeOutlinedIcon from '@mui/icons-material/UnsubscribeOutlined';
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AlertContext } from 'src/contexts/AlertContext';
import Legend from 'src/libraries/Legend/Legend';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import CommonPageHeader from '../CommonPageHeader';
import ActivateDeactivateUserPopup from './ActivateDeactivateUserPopup';
import ChangePasswordPopup from './ChangePasswordPopup';
import UserManagementTable from './UserManagementTable';

const UserManagementBasescreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dummyDataList2 = [
        {
            Id: 1,
            Name: 'Mr. Devendra Kumar (Principal)',
            MobileNumber: '9876543210',
            UserName: 'devendra.kumar',
            ActivateDeactivate: 'Active',
            SendLoginSMS: 'Yes',
            ActivateDeactivateSMSMessage: 'Account activated successfully',
            Login: 'LoginLink1',
            totalCount: 5,  // Total count of items
        },
        {
            Id: 2,
            Name: 'Ms. Priya Sharma (Vice Principal)',
            MobileNumber: '9123456789',
            UserName: 'priya.sharma',
            ActivateDeactivate: 'Inactive',
            SendLoginSMS: 'No',
            ActivateDeactivateSMSMessage: 'Account deactivated',
            Login: 'LoginLink2',
            totalCount: 5,  // Total count of items
        },
        {
            Id: 3,
            Name: 'Mr. Vikram Singh (Mathematics Teacher)',
            MobileNumber: '8976541230',
            UserName: 'vikram.singh',
            ActivateDeactivate: 'Active',
            SendLoginSMS: 'Yes',
            ActivateDeactivateSMSMessage: 'Account activated successfully',
            Login: 'LoginLink3',
            totalCount: 5,  // Total count of items
        },
        {
            Id: 4,
            Name: 'Ms. Aarti Patel (English Teacher)',
            MobileNumber: '7654321098',
            UserName: 'aarti.patel',
            ActivateDeactivate: 'Inactive',
            SendLoginSMS: 'Yes',
            ActivateDeactivateSMSMessage: 'Account deactivated',
            Login: 'LoginLink4',
            totalCount: 5,  // Total count of items
        },
        {
            Id: 5,
            Name: 'Mr. Suresh Reddy (Science Teacher)',
            MobileNumber: '8765432109',
            UserName: 'suresh.reddy',
            ActivateDeactivate: 'Active',
            SendLoginSMS: 'No',
            ActivateDeactivateSMSMessage: 'Account activated successfully',
            Login: 'LoginLink5',
            totalCount: 5,  // Total count of items
        }
    ];


    const [HeaderList1, setHeaderList1] = useState([
        { Id: 1, Header: 'Name', SortOrder: null },
        { Id: 2, Header: 'Mobile Number', SortOrder: null },
        { Id: 3, Header: 'Username', SortOrder: null },
        { Id: 4, Header: 'Activate/Deactivate', SortOrder: null },
        { Id: 5, Header: 'Change Password', SortOrder: null },
        { Id: 6, Header: 'Send Login SMS	', SortOrder: null },
        { Id: 7, Header: 'Activate/Deactivate SMS/Message', SortOrder: null },
    ]);

    const dropdownData = [
        { Id: 0, Name: " All", Value: "all" },
        { Id: 1, Name: "Nursery", Value: "nursery" },
        { Id: 2, Name: "Junior KG", Value: "junior_kg" },
        { Id: 3, Name: "Senior KG", Value: "senior_kg" },
        { Id: 4, Name: "1", Value: "1" },
        { Id: 5, Name: "2", Value: "2" },
        { Id: 6, Name: "3", Value: "3" },
        { Id: 7, Name: "4", Value: "4" },
        { Id: 8, Name: "5", Value: "5" },
        { Id: 9, Name: "6", Value: "6" },
        { Id: 10, Name: "7", Value: "7" },
        { Id: 11, Name: "8", Value: "8" },
        { Id: 12, Name: "9", Value: "9" },
        { Id: 13, Name: "10", Value: "10" },
    ];

    const divisionDropdown = [
        { Id: 0, Name: "All", Value: "all" },
        { Id: 1, Name: "A", Value: "a" },
        { Id: 2, Name: "B", Value: "b" },
        { Id: 3, Name: "C", Value: "c" },
        { Id: 4, Name: "D", Value: "d" },
        { Id: 5, Name: "E", Value: "e" },
    ];

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const RoleId = sessionStorage.getItem('RoleId');
    const asUserId = Number(localStorage.getItem('UserId'));
    const [selectUserRole, setSelectUserRole] = useState('0');
    const [selectUserType, setSelectUserType] = useState('1');
    const [searchUserName, setSearchUserName] = useState('');
    const [selectStandard, setSelectStandard] = useState('all');
    const [selectDivision, setSelectDivision] = useState('all');
    const { showAlert, closeAlert } = useContext(AlertContext);
    const [selectedUserName, setSelectedUserName] = useState(''); // Store the selected username for change password
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [page, setPage] = useState(1);
    const [sortExpression, setSortExpression] = useState('RollNo desc');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Initial sorting direction (ascending)
    const [sortedData, setSortedData] = useState(dummyDataList2);
    const [Open, setOpen] = useState(false);
    const totalCount = dummyDataList2.length;
    const filteredList = dummyDataList2.filter((item) => item.totalCount !== undefined);

    const TotalCount = filteredList.map((item) => totalCount);
    const uniqueTotalCount = [...new Set(TotalCount)];
    const singleTotalCount = uniqueTotalCount[0];

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

    const userRoleOptions = [
        { id: '0', Name: 'Select', Value: '0' },
        { id: '1', Name: 'Teachers', Value: '1' },
        { id: '2', Name: 'Students', Value: '2' },
        { id: '3', Name: 'Admin Staff', Value: '3' },
        { id: '4', Name: 'Other Staff', Value: '4' },
        { id: '5', Name: 'Transport Staff', Value: '5' }
    ];
    const userTypeOptions = [
        { id: '0', Name: 'All', Value: '0' },
        { id: '1', Name: 'Active', Value: '1' },
        { id: '2', Name: 'Deactive', Value: '2' }
    ];

    const clickUserRole = (Value) => {
        setSelectUserRole(Value);
    };
    const clickUserType = (Value) => {
        setSelectUserType(Value);
    };
    const ClickValue = (value) => {
        setSearchUserName(value);
    };
    const clickSearchNew = () => {

    };
    const clickDisplayTypeDropdown = (value) => {
        setSelectStandard(value);
    };
    const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    const PageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };
    const handleHeaderClickk = (updatedHeaderArray) => {
        setHeaderList1(updatedHeaderArray);
        const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
        const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'UserName desc';
        setSortExpression(newSortExpression);
    };
    const handleActivateDeactivateClick = (userId) => {
        setOpen(true);
    };

    const handleKeyClick = (userId, username) => {
        setSelectedUserName(username); // Store the username of the selected user
        setOpenChangePassword(true); // Open the Change Password Popup
    };
    const ClickSave = () => {
        showAlert({
            title: 'Please Confirm',
            message: 'To Send SMS, please activate user and SMS facility.',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                ClickSave()
                closeAlert();
            }
        });

    };
    const ClickSave2 = () => {
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to add this user to the SMS & Message Center address book?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                ClickSave()
                closeAlert();
            }
        });

    };
    const handleTextsmsClick = (userId) => {
        ClickSave();
    };

    const handleEmailReadClick = (userId) => {
        ClickSave2();
    };
    const LegendArray = [
        {
            id: 1,
            Name: 'Active',
            Value: <LockOpenOutlinedIcon
                style={{
                    color: 'green',
                    fontSize: 25,
                    position: 'relative',
                    top: '-2px',
                }}
            />
        },
        {
            id: 2,
            Name: 'Deactive',
            Value: <LockOutlinedIcon
                style={{
                    color: '#ff6347',
                    fontSize: 25,
                    position: 'relative',
                    top: '-2px',
                }}
            />
        },
        {
            id: 3,
            Name: 'Active for SMS/Message',
            Value: <MarkEmailReadOutlinedIcon
                style={{
                    color: 'green',
                    fontSize: 25,
                    position: 'relative',
                    top: '-2px',
                }}
            />
        },
        {
            id: 4,
            Name: 'Deactive for SMS/Message',
            Value: <UnsubscribeOutlinedIcon
                style={{
                    color: '#ff6347',
                    fontSize: 28,
                    position: 'relative',
                   
                }}
            />
        },

    ]

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'User Management',
                            path: ''
                        }
                    ]}
                    rightActions={
                        <Box>
                            <Tooltip title={"Lists user's available to the school. Click on 'Lock' to restrict access your school's data to particular user. To change password click on 'Change Password' link. Click on 'Send SMS/Message' to add or remove user from SMS/Message list. To search user, enter Name / Reg. No / User Login and click on 'Search' button."}>
                                <span>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: grey[600] }
                                        }}
                                    >
                                        <QuestionMarkIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                    }
                />

                <Box sx={{ background: 'white', p: 1, mb: 2 }}>
                    <Legend LegendArray={LegendArray} />
                    {/* <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // Stack items on smaller screens
                            gap: { xs: '10px', sm: '20px' },
                            alignItems: 'left',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                mb: 0,
                                lineHeight: 'normal',
                                alignSelf: 'left',
                                paddingBottom: '2px',
                                fontSize: { xs: '1rem', sm: '1rem' }, // Responsive font size
                                textAlign: { xs: 'left', sm: 'left' }, // Center align on mobile
                            }}
                        >
                            Legend
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' }, // Stack items on smaller screens
                                gap: { xs: '10px', sm: '20px' },
                                alignItems: { xs: 'flex-start', sm: 'center' }, // Adjust alignment
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'left',
                                }}
                            >
                                <LockOpenTwoToneIcon
                                    style={{
                                        color: 'green',
                                        fontSize: 25,
                                        position: 'relative',
                                        top: '-2px',
                                    }}
                                />
                                <Typography>Activate</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'left',
                                }}
                            >
                                <LockIcon
                                    style={{
                                        color: '#ff6347',
                                        fontSize: 25,
                                        position: 'relative',
                                        top: '-2px',
                                    }}
                                />
                                <Typography>Deactivate</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'left',
                                }}
                            >
                                <MarkEmailReadIcon
                                    style={{
                                        color: 'green',
                                        fontSize: 25,
                                        position: 'relative',
                                        top: '-2px',
                                    }}
                                />
                                <Typography>Available for SMS/Message</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'left',
                                }}
                            >
                                <UnsubscribeIcon
                                    style={{
                                        color: '#ff6347',
                                        fontSize: 25,
                                        position: 'relative',
                                        top: '-2px',
                                    }}
                                />
                                <Typography>Not available for SMS/Message</Typography>
                            </Box>
                        </Box>
                    </Box> */}
                </Box>

                <Box sx={{ background: 'white', p: 2, mb: 2 }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            alignItems: 'right',
                            justifyContent: { xs: 'flex-end', sm: 'flex-start' }, // Align content to the end on mobile
                        }}
                    >
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <SearchableDropdown
                                sx={{ width: '100%' }}
                                ItemList={userRoleOptions}
                                defaultValue={selectUserRole}
                                onChange={clickUserRole}
                                size="small"
                                label="User Role"
                                mandatory
                            />
                        </Grid>
                        {selectUserRole !== '' && selectUserRole !== '0' && (
                            <>
                                <Grid item xs={12} sm={6} md={3} lg={2}>
                                    <SearchableDropdown
                                        sx={{ width: '100%' }}
                                        ItemList={userTypeOptions}
                                        defaultValue={selectUserType}
                                        onChange={clickUserType}
                                        size="small"
                                        label="User Type"
                                    />
                                </Grid>
                            </>
                        )}
                        {selectUserRole === '2' && (
                            <>
                                <Grid item xs={12} sm={6} md={3} lg={2}>
                                    <SearchableDropdown
                                        sx={{ width: '100%' }}
                                        ItemList={dropdownData}
                                        defaultValue={selectStandard}
                                        onChange={clickDisplayTypeDropdown}
                                        size="small"
                                        label="Standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={2}>
                                    <SearchableDropdown
                                        sx={{ width: '100%' }}
                                        ItemList={divisionDropdown}
                                        defaultValue={selectDivision}
                                        onChange={clickDisplayTypeDropdown}
                                        size="small"
                                        label="Division"
                                    />
                                </Grid>
                            </>
                        )}
                        {selectUserRole !== '' && selectUserRole !== '0' && (
                            <>
                                <Grid item xs={12} sm={8} md={6} lg={3.5}>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        fullWidth
                                        label="Name / Reg. No. / User Name :"
                                        value={searchUserName}
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ maxLength: 50 }}
                                        onChange={(e) => {
                                            ClickValue(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === 'Tab') {
                                                clickSearchNew();
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={2} lg={0.5} >
                                    <IconButton
                                        onClick={undefined}
                                        sx={{
                                            background: (theme) => theme.palette.primary.main,
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: (theme) => theme.palette.primary.dark,
                                            },
                                        }}
                                    >
                                        <SearchTwoTone />
                                    </IconButton>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>
                {selectUserRole !== '' && selectUserRole !== '0' && (
                    <Box sx={{ background: 'white', pr: 2, pl: 2, pt: 1, pb: 2 }}>
                        {singleTotalCount > 0 ? (
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <Typography variant='subtitle1' sx={{ margin: '16px 0', textAlign: 'center' }}>
                                    <Box component='span' fontWeight='fontWeightBold'>
                                        {startRecord} to {endRecord}
                                    </Box>{' '}
                                    out of{' '}
                                    <Box component='span' fontWeight='fontWeightBold'>
                                        {singleTotalCount}
                                    </Box>{' '}
                                    {singleTotalCount === 1 ? 'record' : 'records'}
                                </Typography>
                            </div>
                        ) : (
                            <span> </span>
                        )}

                        {dummyDataList2 && dummyDataList2.length > 0 ? (
                            <UserManagementTable
                                HeaderArray={HeaderList1}
                                ItemList={dummyDataList2}
                                ClickHeader={handleHeaderClickk}
                                handleKeyClick={handleKeyClick}
                                handleEmailReadClick={handleEmailReadClick}
                                handleActivateDeactivateClick={handleActivateDeactivateClick}
                                handleTextsmsClick={handleTextsmsClick}
                            />
                        ) : (
                            <Box sx={{ backgroundColor: '#D2FDFC' }}>
                                <Typography
                                    variant="h6"
                                    align="center"
                                    sx={{
                                        textAlign: 'center',
                                        marginTop: 1,
                                        backgroundColor: '#324b84',
                                        padding: 1,
                                        borderRadius: 2,
                                        color: 'white',
                                    }}
                                >
                                    No record found.
                                </Typography>
                            </Box>
                        )}

                        {totalCount > 19 ? (
                            <ButtonGroupComponent
                                rowsPerPage={rowsPerPage}
                                ChangeRowsPerPage={ChangeRowsPerPage}
                                rowsPerPageOptions={rowsPerPageOptions}
                                PageChange={PageChange}
                                pagecount={pagecount}
                            />
                        ) : (
                            <span></span>
                        )}
                    </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
                    {Open && (
                        <ActivateDeactivateUserPopup
                            open={Open}
                            setOpen={setOpen}
                            UserName={undefined}
                            clickActivateDeactivate={undefined}
                        />
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    {openChangePassword && (
                        <ChangePasswordPopup
                            open={openChangePassword}
                            setOpen={setOpenChangePassword}
                            UserName={selectedUserName}
                            clickSavePassword={undefined}
                        />
                    )}
                </Box>
            </Box>
        </>
    );
}
export default UserManagementBasescreen;
