import { Close, QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import CommonPageHeader from '../CommonPageHeader';
import BookTable from './BookTable';

const bookData = [
    {
        bookTitle: "Animal Farm",
        date: "27 Sep 2024",
        action: "Submit"
    },
    {
        bookTitle: "Chattering Forest",
        date: "27 Sep 2024",
        action: "Submit"
    },
    {
        bookTitle: "Read aloud tales Ancient Tales- How Parvati became Durga & other stories",
        date: "28 Sep 2024",
        action: "Submit"
    },
    {
        bookTitle: "Read aloud tales of Chattrapati Shivaji - The great Warrior & other stories",
        date: "28 Sep 2024",
        action: "Submit"
    }
];

const ClaimedBookDetailsPage = () => {
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
                        />
                        <TextField
                            fullWidth
                            label="Book Title"
                            variant={'outlined'}
                            size={'small'}
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
                                // onClick={handleCancel}
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
            <Box sx={{ backgroundColor: 'white', p: 2 }}> <BookTable data={bookData} /></Box>
        </Box>
    )
}

export default ClaimedBookDetailsPage