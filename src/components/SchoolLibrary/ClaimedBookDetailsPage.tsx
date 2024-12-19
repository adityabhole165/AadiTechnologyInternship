import { Close, QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useContext, useEffect, useMemo, useState } from 'react';
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
    const [SortBy, setSortBy] = useState('');

    console.log(SortDirection, "SortDirection!!!");
    console.log(SortBy, "SortBy@@@");



    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState<number>(1);
    const rowsPerPageOptions = [10, 20, 50, 100, 200];


    const UsCancelBookReservationMsg: any = useSelector((state: RootState) => state.SchoolLibrary.ICancelBookReservationMsg);
    const USReserveBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetails);
    const USReserveBookDetailsCount: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetailsCount);

    const singleTotalCount: number = useMemo(() => {
        if (!Array.isArray(USReserveBookDetailsCount)) {
            return 0;
        }
        return USReserveBookDetailsCount.reduce((acc: number, item: any) => {
            const count = Number(item.Count);
            if (isNaN(count)) {
                return acc;
            }
            return acc + count;
        }, 0);
    }, [USReserveBookDetailsCount]);
    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    // Calculate total page count
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pageCount = Math.ceil(singleTotalCount / rowsPerPage);
    // const getSortKey = () => {
    //     let SortHeader = ""
    //     .map(item => {
    //         if (item.Id == sortHeader)
    //             SortHeader =headerArray item.sortKey
    //     })
    //     return SortHeader;
    // }
    const handleSortChange = (column: string) => {
        if (SortBy === column) {
            setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    const bookReserveDetails: IGetReserveBookDetailsBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserID: asUserId,
        asStartIndex: (page - 1) * rowsPerPage,
        asEndIndex: 1000,
        asBookTitle: BookTitle,
        asUserName: UserName,
        asSortExpression: "Order By " + SortBy + " " + SortDirection, //"ORDER BY Book_Title ASC",
        asAllUserFlag: showAllUsers == true ? 1 : 0
    };
    useEffect(() => {
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    }, [showAllUsers, UserName, BookTitle, page, SortDirection, SortBy]);

    const handleCheckboxChange = () => {
        setShowAllUsers(!showAllUsers);
    };
    const handleCancel = () => {
        setBookTitle('')
        setUserName('')
    };
    const clickSearch = () => {
        setUserName(''),
            setBookTitle('')
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
                    { title: 'Library', path: '/extended-sidebar/Teacher/LibraryBaseScreen' },
                    { title: 'Claimed Book Details', path: '/extended-sidebar/Teacher/LibraryBaseScreen/ClaimedBookDetailsPage' },
                ]}
                rightActions={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            label="User Name"
                            variant={'outlined'}
                            size={"small"}
                            onChange={(e) => setUserName(e.target.value.slice(0, 50))}
                            value={UserName}
                        />
                        <TextField
                            fullWidth
                            label="Book Title"
                            variant={'outlined'}
                            size={'small'}
                            onChange={(e) => setBookTitle(e.target.value.slice(0, 50))}
                            value={BookTitle}

                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === 'Tab') {
                                    clickSearch();
                                }
                            }}
                        />
                        <Box>
                            <Tooltip title={"Search"}>
                                <IconButton
                                    onClick={clickSearch}
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
                        </Box>
                        <Box>
                            <Tooltip title={`Clear`}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: red[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: red[600] }
                                    }}
                                    onClick={handleCancel}
                                >
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
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
                        </Box>
                    </Box>
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
                            data={USReserveBookDetails}
                            showAllUsers={showAllUsers}
                            handleDelete={handleDelete}
                            handleSortChange={handleSortChange}
                            SortBy={SortBy}
                            SortDirection={SortDirection}
                        />
                        {endRecord > 9 ? (
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