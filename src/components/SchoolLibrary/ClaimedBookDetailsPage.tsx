import { Close, QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetReserveBookDetailsBody } from 'src/interfaces/SchoolLibrary/ILibraryBaseScreen';
import { CDAGetReserveBookDetails } from 'src/requests/SchoolLibrary/ReqLibraryBaseScreen';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import BookTable from './BookTable';

// const bookData = [
//     {
//         bookTitle: "Animal Farm",
//         userName:"	Mrs. Aditee Karan Gawade",
//         class :"-",
//         designation:"Asst. Teacher - P",
//         date: "27 Sep 2024",
//         action: "Submit"
//     },
//     {
//         bookTitle: "Chattering Forest",
//         userName:"	Mr. Krupal Bharat Bhattad",
//         class :"-",
//         designation:"Asst. Teacher - P",
//         date: "27 Sep 2024",
//         action: "Submit"
//     },
//     {
//         bookTitle: "Read aloud tales Ancient Tales- How Parvati became Durga & other stories",
//         userName:"	Mr. Krupal Bharat Bhattad",
//         class :"-",
//         designation:"Asst. Teacher - P",
//         date: "28 Sep 2024",
//         action: "Submit"
//     },
//     {
//         bookTitle: "Read aloud tales of Chattrapati Shivaji - The great Warrior & other stories",
//         userName:"	Mrs. Aditee Karan Gawade",
//         class :"-",
//         designation:"Asst. Teacher - P",
//         date: "28 Sep 2024",
//         action: "Submit"
//     }
// ];

const ClaimedBookDetailsPage = () => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [BookTitle, setBookTitle] = useState('');
    const [UserName, setUserName] = useState('');

    const USReserveBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetReserveBookDetails);
    console.log(USReserveBookDetails, "🤞🤞🤞🤞")
    const bookReserveDetails: IGetReserveBookDetailsBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserID: asUserId,
        asStartIndex: 0,
        asEndIndex: 20,
        asBookTitle: BookTitle,
        asUserName: UserName,
        asSortExpression: "ORDER BY Book_Title ASC",
        asAllUserFlag: showAllUsers ? 1 : 0

    };
    useEffect(() => {
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    }, [showAllUsers])

    const handleCheckboxChange = () => {
        setShowAllUsers(!showAllUsers);
    };
    const handleCancel = () => {
        setBookTitle('')
        setUserName('')
        const bookReserveDetails: IGetReserveBookDetailsBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asUserID: asUserId,
            asStartIndex: 0,
            asEndIndex: 20,
            asBookTitle: '',
            asUserName: '',
            asSortExpression: "ORDER BY Book_Title ASC",
            asAllUserFlag: showAllUsers ? 1 : 0

        };
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    };

    const clickSearch = () => {
        dispatch(CDAGetReserveBookDetails(bookReserveDetails))
    };
    // const clickAccessionNumber = (Value) => {
    //     setAccessionNumber(Value);
    // }
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
                                    // onClick={clickSearch}
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
                            control={<Checkbox checked={showAllUsers} onChange={handleCheckboxChange} />}
                            label="Show all claimed books by all users"
                            sx={{ mb: 2 }}
                        />
                        <BookTable data={USReserveBookDetails} showAllUsers={showAllUsers} />
                    </>
                )}
            </Box>
        </Box>
    )
}

export default ClaimedBookDetailsPage