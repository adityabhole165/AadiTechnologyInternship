import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


// Sample Table Component
const TableBook = ({ books }) => {
    return (
      
        <TableContainer component={Box} >
            <Table aria-label="book table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                <TableHead >
                    <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                        <TableCell sx={{ color: 'white', textAlign: 'left', py:1.5 }}><strong>Accession No</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left', py:1.5 }}><strong>Book  Title</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left', py:1.5 }}><strong>Author</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left', py:1.5}}><strong>Published By</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left' , py:1.5}}><strong>Standards </strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left', py:1.5}}><strong>Language</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center', py:1.5}}><strong>Available</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' , py:1.5}}><strong>Total</strong></TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'left' , py:1.5}}><strong>Claim</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.Book_Id}>
                            <TableCell sx={{py:1}}>{book.Book_No}</TableCell>
                            <TableCell sx={{py:1}}>{book.Book_Title}</TableCell>
                            <TableCell sx={{py:1}}>{book.Author_Name}</TableCell>
                            <TableCell sx={{py:1}}>{book.Published_By}</TableCell>
                            <TableCell sx={{py:1}}>{book.Standards} </TableCell>
                            <TableCell sx={{py:1}}>{book.Language}</TableCell>
                            <TableCell sx={{textAlign: 'center', py:1}}>{book.Available_Books}</TableCell>
                            <TableCell  sx={{textAlign: 'center', py:1}}>1</TableCell>
                            <TableCell sx={{py:1}}><Link href="#">Claim</Link> </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableBook;