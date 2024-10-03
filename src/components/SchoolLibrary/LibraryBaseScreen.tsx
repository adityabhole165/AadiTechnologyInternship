import { Close, QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { BookLockIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import CommonPageHeader from '../CommonPageHeader';
import LibrarySearch from './LibrarySearch';
import TableBook from './TableBook';
import TableBook2 from './TableBook2';
//    Add Dummy data 


const bookData = [
    {
        "Book_Id": "56872",
        "Book_Title": "71+10 Science Projects",
        "Author_Name": "Garge C.L. /Garg Amit",
        "Published_By": "V & S Publishers",
        "Category_Name": "Science",
        "Available_Books": "1",
        "Language": "English",
        "Book_No": "SL02689",
        "Standards": "All",
    },
    {
        "Book_Id": "74542",
        "Book_Title": "8 in 1 Aesop's fables (2)",
        "Author_Name": "Rainbow",
        "Published_By": "Rainbow books",
        "Category_Name": "Story",
        "Available_Books": "1",
        "Language": "English",
        "Book_No": "PL05946",
        "Standards": "All",
    },
];

const bookIssueData = [
    {
        "Book_Title": "Suno Khani : Shreshth Bal Kavitaye",
        "Accession_No": "SL04216",
        "Issue_Date": "24-Sep-2024",
        "Return_Date": "25-Oct-2024"
    },
    {
        "Book_Title": "The Jungal School",
        "Accession_No": "PL01110",
        "Issue_Date": "24-Sep-2024",
        "Return_Date": "25-Oct-2024"
    },
    {
        "Book_Title": "Aaji",
        "Accession_No": "PL04438",
        "Issue_Date": "24-Sep-2024",
        "Return_Date": "25-Nov-2024"
    },
    {
        "Book_Title": "Aamchya aayushateel kahi aathvanee ( Marath)",
        "Accession_No": "PL05739",
        "Issue_Date": "24-Sep-2024",
        "Return_Date": "25-Oct-2024"
    },
    {
        "Book_Title": "Aadhunik Spurtikatha (Shruti Panase)",
        "Accession_No": "SL06026",
        "Issue_Date": "24-Sep-2024",
        "Return_Date": "25-Oct-2024"
    },
    {
        "Book_Title": "Panipat",
        "Accession_No": "SL02535",
        "Issue_Date": "28-Sep-2024",
        "Return_Date": "29-Oct-2024"
    }
];

const LibraryBaseScreen = () => {
    const navigate = useNavigate();
    // const [selectDisplayType, setDisplayType] = useState('false');
    return (
        <Box px={2} >
            <CommonPageHeader
                navLinks={[
                    { title: 'Library', path: '/extended-sidebar/Teacher/LibraryBaseScreen' }
                ]}
                rightActions={
                    <>
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
                        <Tooltip title={`Clear`}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: red[500],
                                    height: '36px !important',
                                    ':hover': { backgroundColor: red[600] }
                                }}
                            // onClick={handleCancel}
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
                                        backgroundColor: grey[600]
                                    }
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
                                        backgroundColor: blue[600]
                                    }
                                }}
                                onClick={() =>
                                    navigate('/extended-sidebar/Teacher/ClaimedBookDetailsPage' + '/')
                                }
                            >
                                <BookLockIcon />
                            </IconButton>
                        </Tooltip>
                    </>}
            />

            <LibrarySearch />
            <Box mt={1} p={2} sx={{ backgroundColor: 'white' }}>
                <Typography variant='h4' pb={1} color={'#38548A'}> Books Details </Typography>
                {bookData && bookData.length === 0 ? (
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
                <TableBook data={bookData} />
            )}
                

            </Box>
            <Box mt={1} p={2} sx={{ backgroundColor: 'white' }}>
                <Typography variant='h4' pb={1} color={'#38548A'}> Books With Me </Typography>
                {bookIssueData && bookIssueData.length === 0 ? (
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
                <TableBook2 data1={bookIssueData} />
            )}
                
            </Box>
        </Box>
    )
}

export default LibraryBaseScreen;
