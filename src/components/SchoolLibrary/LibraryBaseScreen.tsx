import { Close, QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { BookLockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IBookclaimedBody, IGetAllBooksDetailsBody, IGetLibraryBookIssueDetailsBody } from 'src/interfaces/SchoolLibrary/ILibraryBaseScreen';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { CDABookClimedMsg, CDAGetAllBooksDetails, CDAGetLibraryBookIssue } from 'src/requests/SchoolLibrary/ReqLibraryBaseScreen';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import LibrarySearch from './LibrarySearch';
import TableBook from './TableBook';
import TableBook2 from './TableBook2';

const LibraryBaseScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cliambook, setcliambook] = useState('');

    // Initialize state with numbers, as it's required for pagination
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);  // Default items per page
    const [page, setPage] = useState<number>(1);
    const rowsPerPageOptions = [10, 20, 30, 40];  // Pagination options

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const USBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetAllBooksDetails);
    const USGetLibraryBookIssueDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetLibraryBookIssueDetails);
    const USBookCliamMsg: any = useSelector((state: RootState) => state.SchoolLibrary.IBookClimedMsg);
    const USReserveTotalBookCount: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetailsCount);
    const USReserveBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetails);
    console.log(USReserveBookDetails, "*******");

    const TotalCount = USBookDetails.map((item) => item.RecordCount);  // Array of record counts
    const singleTotalCount = TotalCount.reduce((acc, curr) => acc + curr, 0);  // Total count of books
    // console.log(singleTotalCount, "singleTotalCount>>>>>>>>>>>.");



    const BookDetails: IGetAllBooksDetailsBody = {
        asprm_iSchoolId: asSchoolId,
        asprm_Filter: '',
        asprm_BookNo: '',
        asprm_iStandardId: 0,
        asSortExp: "ORDER BY Book_Title ASC",
        asStartIndex: (page - 1) * rowsPerPage, // dynamic start index for pagination
        asEndIndex: page * rowsPerPage, // dynamic end index for pagination
        asprm_iParentStaffId: 0,
    };

    useEffect(() => {
        dispatch(CDAGetAllBooksDetails(BookDetails));
    }, [dispatch, page, rowsPerPage]);  // Dependency on page and rowsPerPage for dynamic pagination

    const BookIssueDetails: IGetLibraryBookIssueDetailsBody = {
        asSchool_Id: asSchoolId,
        asBook_Issued_To: asUserId,
        asAcademic_Year_Id: asAcademicYearId,
    };

    useEffect(() => {
        dispatch(CDAGetLibraryBookIssue(BookIssueDetails));
    }, []);

    // const bookReserveDetails: IGetReserveBookDetailsBody = {
    //     asSchoolId: asSchoolId,
    //     asAcademicYearId: asAcademicYearId,
    //     asUserID: asUserId,
    //     asStartIndex: 0,
    //     asEndIndex: 20,
    //     asBookTitle: "",
    //     asUserName: "",
    //     asSortExpression: "ORDER BY Book_Title ASC",
    //     asAllUserFlag: 0,
    // };

    // useEffect(() => {
    //     dispatch(CDAGetReserveBookDetails(bookReserveDetails));
    // }, []);

    // const ClickCliam = (Book_Id: number) => {
    //     setcliambook(Book_Id.toString()); // Set the book being claimed
    // };
    // console.log(cliambook, "@@@USReserveBookDetails");
    // // Handle claiming process
    // useEffect(() => {

    //     // if (cliambook === null) return;

    //     const isAlreadyClaimed = USReserveBookDetails.some((book: any) => book.Book_Id === cliambook);
    //     if (isAlreadyClaimed) {
    //         toast.error("Could not claim the same book.");
    //     } else {
    //         const cliambookBody: IBookclaimedBody = {
    //             asBookId: parseInt(cliambook),
    //             asUserId: asUserId,
    //             asReservedByParent: 0,
    //             asSchoolId: asSchoolId,
    //             asAcademicYearId: asAcademicYearId,
    //             asInsertedById: asUserId,
    //         };
    //         // Dispatch book claim action here
    //         dispatch(CDABookClimedMsg(cliambookBody));
    //         // toast.success("Book claimed successfully");
    //     }
    // }, [cliambook, USReserveBookDetails, asSchoolId, asUserId, asAcademicYearId]);

    // const bookReserveDetails: IGetReserveBookDetailsBody = {
    //     asSchoolId: asSchoolId,
    //     asAcademicYearId: asAcademicYearId,
    //     asUserID: asUserId,
    //     asStartIndex: 0,
    //     asEndIndex: 20,
    //     asBookTitle: "",
    //     asUserName: "",
    //     asSortExpression: "ORDER BY Book_Title ASC",
    //     asAllUserFlag: 0

    // };
    // useEffect(() => {
    //     dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    // }, [])


    const ClickCliam = (Book_Id: number) => {
        const cliambookBody: IBookclaimedBody = {
            asBookId: Book_Id,
            asUserId: asUserId,
            asReservedByParent: 0,
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asInsertedById: asUserId,
        };
        dispatch(CDABookClimedMsg(cliambookBody));
        setcliambook(Book_Id.toString())
        console.log(cliambook, "@@@USReserveBookDetails");
    };
    useEffect(() => {
        toast.success(USBookCliamMsg);
    })
    useEffect(() => {
        console.log(cliambook, '$$$$$$$$$')
        const isAlreadyClaimed = USReserveBookDetails.some(book => book.BookId === cliambook);

        console.log(isAlreadyClaimed, "@@@@@@@@@@isAlreadyClaimed")
        if (isAlreadyClaimed) {
            toast.error("Could not claim the same book.");
        } else {
            toast.success("Book claimed successfully");
        }

    }, [USReserveBookDetails, cliambook]);

    // useEffect(() => {
    //     const set2 = new Set(cliambook);  // cliambook should be an array

    //     const isAlreadyClaimed = USReserveBookDetails.map(item => set2.has(item.Book_Id));


    //     if (isAlreadyClaimed) {
    //         toast.error("Could not claim the same book.");
    //     } else {
    //         toast.success("Book claimed successfully");
    //     }
    // }, [USReserveBookDetails, cliambook]); // Re-run when USReserveBookDetails or cliambook changes


    // useEffect(() => {

    //     const set2 = new Set(cliambook);
    //     // Check if the selectedBook already exists in the reservedBooks array
    //     //  const isAlreadyClaimed = USReserveBookDetails.some(book => book.BookId === set2);
    //     // const doubled = USReserveBookDetails.map(function (num) {
    //     //     return num * 2;
    //     // });

    //     // console.log(doubled, "doubled>>>>>>");

    //     USReserveBookDetails.map((item => item.Book_Id) => {
    //          if (item === set2) {
    //               toast.error("Could not claim the same book.");
    //                 } else {
    //                    toast.success("Book claimed successfully");
    //                 } // Prints true for matching values
    //         }
    //             });



    // }, [USReserveBookDetails, cliambook]); // Re-run when reservedBooks or selectedBook changes


    // useEffect(() => {
    //     const set2 = new Set(cliambook);
    //     console.log(cliambook, "set2>>>>>>");
    //     const duplicates = USReserveBookDetails.map(item => item.Book_Id).filter(item => set2.has(item));
    //     if (duplicates.length > 0) {
    //         toast.error("Could not claim same book");
    //     } else {
    //         toast.success("Book claimed successfully");
    //     }
    // }, [USReserveBookDetails, cliambook]);


    const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        //const newRowsPerPage = parseInt(event.target.value, 10);  // Parse the new value correctly
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);  // Reset to page 1 when rows per page is changed
    };

    const PageChange = (pageNumber: number) => {
        setPage(pageNumber);  // Change to selected page number
    };

    // Calculate total page count
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pageCount = Math.ceil(singleTotalCount / rowsPerPage);

    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[{ title: 'Library', path: '/extended-sidebar/Teacher/LibraryBaseScreen' }]}
                rightActions={
                    <>
                        <Tooltip title={"Search"}>
                            <IconButton
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
                        </Tooltip>
                        <Tooltip title={`Clear`}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: red[500],
                                    height: '36px !important',
                                    ':hover': { backgroundColor: red[600] },
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={"Here you can search the books and also you can see the issued book details."}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600],
                                    },
                                }}
                            >
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Claimed Book Details'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: blue[500],
                                    '&:hover': {
                                        backgroundColor: blue[600],
                                    },
                                }}
                                onClick={() =>
                                    navigate('/extended-sidebar/Teacher/ClaimedBookDetailsPage' + '/')
                                }
                            >
                                <BookLockIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            />
            <LibrarySearch />
            <Box mt={1} p={2} sx={{ backgroundColor: 'white' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
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
                </div>
                <Typography variant="h4" pb={1} color="#38548A">
                    Books Details
                </Typography>
                {USBookDetails.length === 0 ? (
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
                ) : (
                    <TableBook data={USBookDetails} clickcliam={ClickCliam} />
                )}
                <ButtonGroupComponent
                    ChangeRowsPerPage={ChangeRowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions} // Set your options
                    rowsPerPage={rowsPerPage}
                    PageChange={PageChange}
                    pagecount={pageCount}  // Use the calculated pageCount
                />
            </Box>
            <Box mt={1} p={2} sx={{ backgroundColor: 'white' }}>
                <Typography variant="h4" pb={1} color="#38548A">
                    Books With Me
                </Typography>
                {USGetLibraryBookIssueDetails.length === 0 ? (
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
                ) : (
                    <TableBook2 data1={USGetLibraryBookIssueDetails} />
                )}

            </Box>
        </Box>
    );
};

export default LibraryBaseScreen;
