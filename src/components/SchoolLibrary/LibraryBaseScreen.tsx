import { Close, QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { BookLockIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import CommonPageHeader from '../CommonPageHeader';
import TableBook from './TableBook';
import TableBook2 from './TableBook2';
//    Add Dummy data 
const DisplayLocation = [
    { Id: 1, Name: 'All', Value: 'B' },
    { Id: 2, Name: 'Printable', Value: 'C' },
    { Id: 3, Name: 'NonPrintable', Value: 'H' },
];
//    Add Dummy data 
const languages = [
    { Id: 1, Name: 'All', },
    { Id: 2, Name: 'English' },
    { Id: 3, Name: 'English Hindi' },
    { Id: 4, Name: 'Marathi' },
    { Id: 5, Name: 'English Marathi' },
    { Id: 6, Name: 'Hindi' },
];
//    Add Dummy data 
const grades = [
    { value: 'nursery', Name: 'Nursery' },
    { value: 'kg1', Name: 'Kindergarten 1 (KG1)' },
    { value: 'kg2', Name: 'Kindergarten 2 (KG2)' },
    { value: 'grade1', Name: 'Grade 1' },
    { value: 'grade2', Name: 'Grade 2' },
    { value: 'grade3', Name: 'Grade 3' },
    { value: 'grade4', Name: 'Grade 4' },
    { value: 'grade5', Name: 'Grade 5' },
    { value: 'grade6', Name: 'Grade 6' },
    { value: 'grade7', Name: 'Grade 7' },
    { value: 'grade8', Name: 'Grade 8' },
    { value: 'grade9', Name: 'Grade 9' },
    { value: 'grade10', Name: 'Grade 10' },
    { value: 'grade11', Name: 'Grade 11' },
    { value: 'grade12', Name: 'Grade 12' }
];

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
                                    navigate('/extended-sidebar/Teacher/ClaimedBookDetailsPage' + '/' )
                                }
                            >
                                <BookLockIcon />
                            </IconButton>
                        </Tooltip>
                    </>}
            />


            <Box sx={{ p: 2, background: 'white' }}>
                <Typography variant='h4' pb={1} color={'#38548A'}> Search Criteria  </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4} md={3}>
                        <TextField
                            fullWidth
                            label={
                                <span>
                                    Book Title
                                </span>
                            }
                            multiline
                            rows={1}
                        />
                    </Grid>
                    <Grid item xs={4} md={3} >
                        <TextField
                            fullWidth
                            label={
                                <span>
                                    Accession Number
                                </span>
                            }
                            multiline
                            rows={1}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth
                            label={
                                <span>
                                    Author
                                </span>
                            }
                            multiline
                            rows={1}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth
                            label={
                                <span>
                                    Publisher
                                </span>
                            }
                            multiline
                            rows={1}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={DisplayLocation}
                            // defaultValue={selectDisplayLocation}
                            // onChange={clickDisplayLocationDropdown}

                            label='Media Type '
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={grades}
                            // defaultValue={selectDisplayLocation}
                            // onChange={clickDisplayLocationDropdown}

                            label='Standard '
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={languages}
                            // defaultValue={selectDisplayLocation}
                            // onChange={clickDisplayLocationDropdown}

                            label='Language'
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box mt={1} p={2} sx={{ backgroundColor: 'white' }}>
                <Typography variant='h4' pb={1} color={'#38548A'}> Books Details </Typography>
                <TableBook data={bookData} />

                <Box sx={{ backgroundColor: '#D2FDFC' }}>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}
                    >
                        No record found.
                    </Typography>
                </Box>

            </Box>
            <Box mt={1} p={2} sx={{ backgroundColor: 'white' }}>
                <Typography variant='h4' pb={1} color={'#38548A'}> Books With Me </Typography>
                <TableBook2 data1={bookIssueData} />

                <Box sx={{ backgroundColor: '#D2FDFC' }}>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}
                    >
                        No record found.
                    </Typography>

                </Box>
            </Box>
        </Box>
    )
}

export default LibraryBaseScreen;
