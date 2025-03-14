import { Close, QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { ICancelBookReservationBody, IGetReserveBookDetailsBody } from 'src/interfaces/SchoolLibrary/ILibraryBaseScreen';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { CDACancelBookReservationMsg, CDAClearCancelBookReservationMsg, CDAGetReserveBookDetails } from 'src/requests/SchoolLibrary/ReqLibraryBaseScreen';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import BookTable from './BookTable';
const ClaimedBookDetailsPage = () => {

    const dispatch = useDispatch();
    const { showAlert, closeAlert } = useContext(AlertContext);
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [BookTitle, setBookTitle] = useState('');
    const [UserName, setUserName] = useState('');

    const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [SortBy, setSortBy] = useState('Book_Title');

    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState<number>(1);

    const [ReserveBookDetails, SetReserveBookDetails] = useState([]);
    const rowsPerPageOptions = [20, 50, 100, 200];

    const UsCancelBookReservationMsg: any = useSelector((state: RootState) => state.SchoolLibrary.ICancelBookReservationMsg);
    const USReserveBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetails);
    const USReserveBookDetailsCount: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetailsCount);
    const singleTotalCount = USReserveBookDetailsCount.map(item => item.Count)

    const loading = useSelector((state: RootState) => state.SchoolLibrary.Loading);
    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 20));
        setPage(1);
    };

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pageCount = Math.ceil(singleTotalCount / rowsPerPage);

    const handleSortChange = (column: string) => {
        if (SortBy === column) {
            setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    const startIndexNew = (page - 1) * rowsPerPage;
    const endIndexNew = startIndexNew + rowsPerPage;

    const bookReserveDetails: IGetReserveBookDetailsBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserID: asUserId,
        asStartIndex: startIndexNew,
        asEndIndex: endIndexNew,
        asBookTitle: BookTitle,
        asUserName: UserName,
        asSortExpression: "Order By " + SortBy + " " + SortDirection, // "ORDER BY Book_Title ASC",
        asAllUserFlag: showAllUsers == true ? 1 : 0
    };
    useEffect(() => {
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    }, [showAllUsers, page, SortDirection, SortBy, startIndexNew, endIndexNew]);

    const handleCheckboxChange = () => {
        setShowAllUsers(!showAllUsers);
    };
    useEffect(() => {
        SetReserveBookDetails(USReserveBookDetails);
    }, [USReserveBookDetails]);


    const ClickValue1 = (value) => {
        setBookTitle(value);
    };

    const ClickValue = (value) => {
        setUserName(value);
    };

    const clickSearchNew = () => {
        if (BookTitle === '') {
            SetReserveBookDetails(USReserveBookDetails);
        } else {
            SetReserveBookDetails(
                USReserveBookDetails.filter((item) => {
                    const text1Match = item.bookTitle.toLowerCase().includes(
                        BookTitle.toLowerCase()
                    );
                    return text1Match;
                })
            );
        }
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    };
    const clickSearchNew1 = () => {
        clickSearchNew()
        if (UserName === '') {
            SetReserveBookDetails(USReserveBookDetails);
        } else {
            SetReserveBookDetails(
                USReserveBookDetails.filter((item) => {
                    const text1Match = item.userName.toLowerCase().includes(
                        UserName.toLowerCase()
                    );
                    return text1Match;
                })
            );
        }
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    };
    const handleClear = () => {
        setBookTitle('')
        setUserName('')
        const defaultBookReserveDetails: IGetReserveBookDetailsBody = {
            ...bookReserveDetails, // Use the existing object structure
            asBookTitle: '', // Clear book title filter
            asUserName: '', // Clear username filter
            asAllUserFlag: showAllUsers == true ? 1 : 0, // Reset the "Show All Users" flag
            asStartIndex: 0, // Reset start index
            asEndIndex: rowsPerPage, // Reset end index to default rows per page
        };
        dispatch(CDAGetReserveBookDetails(defaultBookReserveDetails))
    };

    const handleDelete = (BookId: string) => {
        if (!BookId) return;
        const CancelBookReservation: ICancelBookReservationBody = {
            asSchoolId: asSchoolId,// Number(schoolId),
            asAcademicYearId: asAcademicYearId,// Number(academicYearId),
            asUserId: asUserId, // number,
            asBookid: Number(BookId)
        };
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to cancel the book claim?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(CDACancelBookReservationMsg(CancelBookReservation));
                closeAlert();
            },
        });
    };
    useEffect(() => {
        if (UsCancelBookReservationMsg !== '') {
            toast.success(UsCancelBookReservationMsg);
            dispatch(CDAClearCancelBookReservationMsg());
            dispatch(CDAGetReserveBookDetails(bookReserveDetails));
        }
    }, [UsCancelBookReservationMsg]);

    return (
        <Box px={2}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Library', path: '/RITeSchool/Teacher/LibraryBaseScreen' },
                    { title: 'Claimed Book Details', path: '/RITeSchool/Teacher/LibraryBaseScreen/ClaimedBookDetailsPage' },
                ]}
                rightActions={
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        // justifyContent="space-between"
                        alignItems="right"

                        spacing={2}
                        sx={{

                            mt: { xs: 0, sm: 0 },
                            flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            display="flex"
                            justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                        >
                            <TextField
                                fullWidth
                                label="User Name"
                                variant={'outlined'}
                                size={"small"}
                                sx={{ width: { xs: '50vw', sm: '10vw' } }}
                                onChange={(e) => {
                                    ClickValue(e.target.value);
                                }}
                                value={UserName}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === 'Tab') {
                                        clickSearchNew1();
                                    }
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                        >
                            <TextField
                                fullWidth
                                label="Book Title"
                                variant={'outlined'}
                                size={'small'}
                                sx={{ width: { xs: '50vw', sm: '13vw' } }}
                                onChange={(e) => {
                                    ClickValue1(e.target.value);
                                }}
                                value={BookTitle}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === 'Tab') {
                                        clickSearchNew1();
                                    }
                                }}
                            /></Grid>
                        <Grid
                            item
                            xs={12}
                            gap={1}
                            display="flex"
                            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                        >
                            <Tooltip title={"Search"}>
                                <IconButton
                                    onClick={clickSearchNew1}
                                    sx={{
                                        background: (theme) => theme.palette.primary.main,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: (theme) => theme.palette.primary.dark
                                        }
                                    }}>
                                    <SearchTwoTone />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={`Clear`}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: red[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: red[600] }
                                    }}
                                    onClick={handleClear}
                                >
                                    <Close />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={"Displays the books claimed by user and user can cancel the book claim."}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        '&:hover': {
                                            backgroundColor: grey[600]
                                        }
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                    </Stack>
                }
            />
            <Box sx={{ backgroundColor: 'white', p: 2 }}>
                {USReserveBookDetails && USReserveBookDetails.length === 0 ? (
                    <Box sx={{ backgroundColor: '#D2FDFC' }}>
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}
                        >
                            No record found.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showAllUsers}
                                    onChange={handleCheckboxChange}
                                />}
                            label="Show all claimed books by all users"
                            sx={{ mb: 2 }}
                        />
                        {singleTotalCount > 0 ? (
                            <Box style={{ flex: 1, textAlign: 'center' }}>
                                <Typography
                                    variant='subtitle1'
                                    sx={{ margin: '16px 0', textAlign: 'center' }}
                                >
                                    <Box component='span' fontWeight='fontWeightBold'>
                                        {startRecord} to {endRecord}
                                    </Box>{' '}
                                    out of{' '}
                                    <Box component='span' fontWeight='fontWeightBold'>
                                        {singleTotalCount}
                                    </Box>{' '}
                                    {singleTotalCount === 1 ? 'record' : 'records'}
                                </Typography>
                            </Box>
                        ) : (
                            <span> </span>
                        )}
                        <BookTable
                            data={ReserveBookDetails}
                            showAllUsers={showAllUsers}
                            handleDelete={handleDelete}
                            handleSortChange={handleSortChange}
                            SortBy={SortBy}
                            SortDirection={SortDirection}
                        />
                        {endRecord > 19 ? (
                            <ButtonGroupComponent
                                rowsPerPage={rowsPerPage}
                                ChangeRowsPerPage={ChangeRowsPerPage}
                                rowsPerPageOptions={rowsPerPageOptions} // Set your options
                                PageChange={PageChange}
                                pagecount={pageCount}  // Use the calculated pageCount
                            />
                        ) : (
                            <span></span>
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}

export default ClaimedBookDetailsPage