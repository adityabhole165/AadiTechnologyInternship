import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


// Sample Table Component
const TableBook = ({ books }) => {
    return (
      
        <TableContainer component={Box} >
            <Table aria-label="book table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                <TableHead >
                    <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                        <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Accession No</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Book Title</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Author</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Published By</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Standards </strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Language</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>Available</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>Total</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Claim</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.Book_Id}>
                            <TableCell>{book.Book_No}</TableCell>
                            <TableCell>{book.Book_Title}</TableCell>
                            <TableCell>{book.Author_Name}</TableCell>
                            <TableCell>{book.Published_By}</TableCell>
                            <TableCell>{book.Standards} </TableCell>
                            <TableCell>{book.Language}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{book.Available_Books}</TableCell>
                            <TableCell  sx={{textAlign: 'center'}}>1</TableCell>
                            <TableCell><Link href="#">Claim</Link> </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableBook;