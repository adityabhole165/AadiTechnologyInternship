import { Close, QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { BookLockIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IBookclaimedBody, IGetAllBooksDetailsBody, IGetLibraryBookIssueDetailsBody, IGetReserveBookDetailsBody, IGetReserveBooksCountperpersonBody, ITotalBooksCountsBody } from 'src/interfaces/SchoolLibrary/ILibraryBaseScreen';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { CDABookClimedMsg, CDAClearBookClimedMsg, CDAGetAllBooksDetails, CDAGetLibraryBookIssue, CDAGetReserveBookDetails, CDAGetTotalBooksCount, CDAReserveBooksperpersonCount } from 'src/requests/SchoolLibrary/ReqLibraryBaseScreen';
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
    const ascliambook = Number(cliambook);

    console.log(ascliambook, "&&&&&34343&&&&&&")

    const USBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetAllBooksDetails);
    const USGetLibraryBookIssueDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetLibraryBookIssueDetails);
    const USBookCliamMsg: any = useSelector((state: RootState) => state.SchoolLibrary.IBookClimedMsg);
    const USTotalBookCount: any = useSelector((state: RootState) => state.SchoolLibrary.IlistGetTotalBooksCounts);
    // const USReserveTotalBookCount: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetailsCount);
    const USReserveBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetails);
    const USReserveBookCountPerPerson: any = useSelector((state: RootState) => state.SchoolLibrary.IreserveBooksCountperperson);
    //console.log(USReserveBookCountPerPerson[0].Text1, "@$$$&&")
    console.log(cliambook, "&&&&&&&&&&&")



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
    const Totalbookcount: ITotalBooksCountsBody = {
        asprm_iSchoolId: asSchoolId,
        asprm_Filter: "",
        asprm_BookNo: "",
        asprm_iStandardId: 0,
        asprm_iParentStaffId: 0
    };
    useEffect(() => {
        dispatch(CDAGetTotalBooksCount(Totalbookcount))
    }, []);
    const ReserveBooksCountperperson: IGetReserveBooksCountperpersonBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asBookId: ascliambook,
        asUserId: asUserId,
        asFlag: 0
    }
    useEffect(() => {
        dispatch(CDAReserveBooksperpersonCount(ReserveBooksCountperperson))
    }, []);

    const bookReserveDetails: IGetReserveBookDetailsBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserID: asUserId,
        asStartIndex: 0,
        asEndIndex: 20,
        asBookTitle: "",
        asUserName: "",
        asSortExpression: "ORDER BY Book_Title ASC",
        asAllUserFlag: 0

    };
    useEffect(() => {
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    }, [])

    //console.log(number(cliambook),'cliambook')
    const ClickCliam = (Book_Id: number) => {
        setcliambook(Book_Id.toString())

        if (USReserveBookCountPerPerson === "4") {
            toast.error("Can not claim more than 4 book");
        } else if (USReserveBookCountPerPerson === "999") {
            toast.error("Could not claim the same book.");
        }
        else {
            const cliambookBody: IBookclaimedBody = {
                asBookId: ascliambook,
                asUserId: asUserId,
                asReservedByParent: 0,
                asSchoolId: asSchoolId,
                asAcademicYearId: asAcademicYearId,
                asInsertedById: asUserId,
            };
            dispatch(CDABookClimedMsg(cliambookBody));
        }

    };
    useEffect(() => {
        if (USBookCliamMsg !== "") {
            toast.success(USBookCliamMsg);
            dispatch(CDAClearBookClimedMsg())
        }
    }, [USBookCliamMsg])


    const singleTotalCount: number = useMemo(() => {
        if (!Array.isArray(USTotalBookCount)) {
            return 0;
        }
        return USTotalBookCount.reduce((acc: number, item: any) => {
            const count = Number(item.TotalCount);
            if (isNaN(count)) {
                return acc;
            }
            return acc + count;
        }, 0);
    }, [USTotalBookCount]);

    const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    const PageChange = (pageNumber: number) => {
        setPage(pageNumber);
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
            <Box mt={1} px={2} sx={{ backgroundColor: 'white' }} pb={2} >
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <Typography variant="h4" pt={2} color="#38548A">
                            Books Details
                        </Typography>
                    </Box>

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
                </Box>

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
        </Box >
    );
};

export default LibraryBaseScreen;
