import { QuestionMark } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { BookLockIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IGetAllBooksDetailsBody, IGetLibraryBookIssueDetailsBody, IGetReserveBookDetailsBody, IGetReserveBooksCountperpersonBody, ITotalBooksCountsBody } from 'src/interfaces/SchoolLibrary/ILibraryBaseScreen';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { CDABookClimedMsg, CDAClearBookClimedMsg, CDAClearCDAReserveBooksperpersonCount, CDAGetAllBooksDetails, CDAGetLibraryBookIssue, CDAGetReserveBookDetails, CDAGetTotalBooksCount, CDAReserveBooksperpersonCount } from 'src/requests/SchoolLibrary/ReqLibraryBaseScreen';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import LibrarySearch from './LibrarySearch';
import TableBook from './TableBook';
import TableBook2 from './TableBook2';

const LibraryBaseScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cliambook, setcliambook] = useState('');
    const [sortHeader, setsortHeader] = useState(2);
    const [sortExpression, setSortExpression] = useState('Asc');
    const [BookTitle, setBookTitle] = useState<string>('');
    const [AccessionNumber, setAccessionNumber] = useState<string>('');
    const [Author, setAuthor] = useState<string>('');
    const [Publisher, setPublisher] = useState<string>('');
    const [StandardId, setStandardId] = useState<string>('0');
    const [LanguageId, setLanguageId] = useState<string>('');
    const [IsPrintable, setIsPrintable] = useState<string>('');
    const [SearchBook, setSearchBook] = useState([]);
    const [errorMsg, setErrorMsg] = useState(""); // New state for error message
    // Initialize state with numbers, as it's required for pagination
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState<number>(1);
    const rowsPerPageOptions = [20, 50, 100, 200];

    const [headerArray, setHeaderArray] = useState([
        { Id: 1, Header: 'Accession No', SortOrder: null, sortKey: 'Book_No' },
        { Id: 2, Header: 'Book Title', SortOrder: null, sortKey: 'Book_Title' },
        { Id: 3, Header: 'Author', SortOrder: 'ASC', sortKey: 'Author_Name' },
        { Id: 4, Header: 'Publisher', SortOrder: null, sortKey: 'Published_By' },
        { Id: 5, Header: 'Standards' },
        { Id: 6, Header: 'Language', SortOrder: null, sortKey: 'Language' },
        { Id: 7, Header: 'Available' },
        { Id: 8, Header: 'Total' },
        { Id: 9, Header: 'Claim' },
    ]);

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const ascliambook = Number(cliambook);
    // const USBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetAllBooksDetails);
    const USGetLibraryBookIssueDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetLibraryBookIssueDetails);
    const USBookCliamMsg: any = useSelector((state: RootState) => state.SchoolLibrary.IBookClimedMsg);
    // const USTotalBookCount: any = useSelector((state: RootState) => state.SchoolLibrary.IlistGetTotalBooksCounts);
    // const USReserveTotalBookCount: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetailsCount);
    const USReserveBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetails);
    const USReserveBookCountPerPerson: any = useSelector((state: RootState) => state.SchoolLibrary.IreserveBooksCountperperson);
    const USGetAllBooksDetailss: any = useSelector((state: RootState) => state.SchoolLibrary.IGetAllBooksDetailss);
    const USGetBookTotalCount: any = useSelector((state: RootState) => state.SchoolLibrary.IGetBookTotalCount);
    const USGetTotalBookID: any = useSelector((state: RootState) => state.SchoolLibrary.IGetTotalBookID);

    const filteredList = Array.isArray(USGetAllBooksDetailss)
        ? USGetAllBooksDetailss.filter((item) => item.USGetBookTotalCount !== undefined)
        : [];
    const TotalCount = filteredList.map((item) => item.USGetBookTotalCount);
    const uniqueTotalCount = [...new Set(TotalCount)];

    const getSortKey = () => {
        let SortHeader = ""
        headerArray.map(item => {
            if (item.Id == sortHeader)
                SortHeader = item.sortKey
        })
        return SortHeader;
    }
    const BookDetails: IGetAllBooksDetailsBody = {
        asprm_iSchoolId: asSchoolId,
        Book_Title: BookTitle,
        Author_Name: Author,
        Published_By: Publisher,
        AccessionNumber: AccessionNumber,
        Language: LanguageId,
        Is_Printable: IsPrintable,
        asprm_iStandardId: StandardId,
        asSortExp: "Order By " + getSortKey() + " " + sortExpression, //SortDirection,
        asStartIndex: (page - 1) * rowsPerPage, // dynamic start index for pagination
        asEndIndex: page * rowsPerPage, // dynamic end index for pagination
        asprm_iParentStaffId: 0,
    };
    const clickSearch = () => {
        dispatch(CDAGetAllBooksDetails(BookDetails));
    }
    useEffect(() => {
        dispatch(CDAGetAllBooksDetails(BookDetails));
    }, [dispatch, page, rowsPerPage, sortExpression, sortHeader]);  // Dependency on page and rowsPerPage for dynamic pagination

    const BookIssueDetails: IGetLibraryBookIssueDetailsBody = {
        asSchool_Id: asSchoolId,
        asBook_Issued_To: asUserId,
        asAcademic_Year_Id: asAcademicYearId,
    };
    const Totalbookcount: ITotalBooksCountsBody = {
        asprm_iSchoolId: asSchoolId,
        asprm_Filter: "",
        asprm_BookNo: "",
        asprm_iStandardId: 0,
        asprm_iParentStaffId: 0
    };
    const ReserveBooksCountperperson: IGetReserveBooksCountperpersonBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asBookId: ascliambook,
        asUserId: asUserId,
        asFlag: 0
    }

    const bookReserveDetails: IGetReserveBookDetailsBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserID: asUserId,
        asStartIndex: (page - 1) * rowsPerPage,
        asEndIndex: page * rowsPerPage,
        asBookTitle: "",
        asUserName: "",
        asSortExpression: "Order By " + getSortKey() + " " + sortExpression,
        asAllUserFlag: 0

    };
    useEffect(() => {
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
        dispatch(CDAGetLibraryBookIssue(BookIssueDetails));
        dispatch(CDAGetTotalBooksCount(Totalbookcount))
    }, [])

    const [BookId, setBookId] = useState(0);

    const ClickCliam = (Book_Id: number) => {
        setBookId(Book_Id)
        const countperpersonbody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asBookId: Book_Id,
            asUserId: asUserId,
            asFlag: 0
        }
        dispatch(CDAReserveBooksperpersonCount(countperpersonbody));
        //dispatch(CDAReserveBooksperpersonCount(ReserveBooksCountperperson))
    };

    useEffect(() => {
        let isValid = true;
        console.log("USReserveBookCountPerPerson", USReserveBookCountPerPerson);

        if (USReserveBookCountPerPerson.length > 0) {
            if (USReserveBookCountPerPerson[0].Count === "999") {
                setErrorMsg("Could not claim the same book.");
                isValid = false;
            }
            if (USReserveBookCountPerPerson[0].Count === "4") {
                setErrorMsg("Cannot claim more than 4 books.");
                isValid = false;
            }
            if (!isValid) return;
            const cliambookBody = {
                asBookId: BookId,
                asUserId: asUserId,
                asReservedByParent: 0,
                asSchoolId: asSchoolId,
                asAcademicYearId: asAcademicYearId,
                asInsertedById: asUserId,
            };
            dispatch(CDABookClimedMsg(cliambookBody));
            setBookId(0);
            dispatch(CDAClearCDAReserveBooksperpersonCount());
        }
        //dispatch(CDAClearCDAReserveBooksperpersonCount());
    }, [USReserveBookCountPerPerson])
    console.log(USReserveBookCountPerPerson, "USReserveBookCountPerPerson111")
    useEffect(() => {
        // If `USBookCliamMsg` is not empty, show a success toast
        if (USBookCliamMsg !== "") {
            toast.success(USBookCliamMsg); // Display the success message from `USBookCliamMsg`
            dispatch(CDAClearBookClimedMsg()); // Clear the message
        }
    }, [USBookCliamMsg, USReserveBookCountPerPerson]);

    const singleTotalCount: number = useMemo(() => {
        if (!Array.isArray(USGetBookTotalCount)) {
            return 0;
        }
        return USGetBookTotalCount.reduce((acc: number, item: any) => {
            const count = Number(item.TotalCount);
            if (isNaN(count)) {
                return acc;
            }
            return acc + count;
        }, 0);
    }, [USGetBookTotalCount]);

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

    const handleSortChange = (value) => {

        setsortHeader(value.Id)
        setSortExpression(value.SortOrder)
    }

    const clickReset = () => {
        // Reset local state
        setBookTitle('');
        setAccessionNumber('');
        setAuthor('');
        setPublisher('');
        setStandardId('0');
        setLanguageId('0');
        setIsPrintable('');
        const BookDetails: IGetAllBooksDetailsBody = {
            asprm_iSchoolId: asSchoolId,
            Book_Title: BookTitle,
            Author_Name: Author,
            Published_By: Publisher,
            AccessionNumber: AccessionNumber,
            Language: LanguageId,
            Is_Printable: IsPrintable,
            asprm_iStandardId: StandardId,
            asSortExp: "Order By " + getSortKey() + " " + sortExpression,
            asStartIndex: (page - 1) * rowsPerPage, // dynamic start index for pagination
            asEndIndex: page * rowsPerPage, // dynamic end index for pagination
            asprm_iParentStaffId: 0,
        };
        dispatch(CDAGetAllBooksDetails(BookDetails));
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[{ title: 'Library', path: '/extended-sidebar/Teacher/LibraryBaseScreen' }]}
                rightActions={
                    <>
                        {/* <Tooltip title={"Search"}>
                            <IconButton
                                sx={{
                                    background: (theme) => theme.palette.primary.main,
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: (theme) => theme.palette.primary.dark,
                                    },
                                }}
                                onClick={clickSearch}
                            >
                                <SearchTwoTone />
                            </IconButton>
                        </Tooltip> */}

                        {/* <Tooltip title={'Reset'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: blue[500],
                                    '&:hover': {
                                        backgroundColor: blue[600]
                                    }
                                }}
                                onClick={clickClear} >
                                <RestartAltIcon />
                            </IconButton>
                        </Tooltip> */}

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
            {errorMsg && (
                <span style={{ color: 'red', fontWeight: 'bolder' }}>
                    {errorMsg}
                    <br />
                </span>
            )}
            <LibrarySearch
                BookTitle={BookTitle}
                AccessionNumber={AccessionNumber}
                Author={Author}
                Publisher={Publisher}
                StandardId={StandardId}
                LanguageId={LanguageId}
                IsPrintable={IsPrintable}
                setBookTitle={setBookTitle}
                setAccessionNumber={setAccessionNumber}
                setAuthor={setAuthor}
                setPublisher={setPublisher}
                setStandardId={setStandardId}
                setLanguageId={setLanguageId}
                setIsPrintable={setIsPrintable}
                clickSearch={clickSearch}
                clickReset={clickReset} />

            <Box mt={1} px={2} sx={{ background: 'white', p: 1 }}>
                <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography sx={{ color: 'red' }}>Can not be issued</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box mt={1} px={2} sx={{ backgroundColor: 'white' }} pb={2} >
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <Typography variant="h4" pt={2} color="#38548A">
                            Books Details
                        </Typography>
                    </Box>
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
                </Box>

                {USGetAllBooksDetailss.length === 0 ? (
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
                    <TableBook data={USGetAllBooksDetailss} clickcliam={ClickCliam} DefaultValue={sortExpression}
                        handleSortChange={handleSortChange} HeaderArray={headerArray}
                        sortHeader={sortHeader} SortExpression={sortExpression} />

                    // <TableBook data={USGetAllBooksDetailss} clickcliam={ClickCliam} handleSortChange={handleSortChange} HeaderArray={headerArray} />
                )}
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
        </Box >
    );
};

export default LibraryBaseScreen;
