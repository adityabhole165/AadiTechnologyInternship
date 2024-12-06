import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

interface Book {
  Book_Id: string;
  Book_Title: string;
  Author_Name: string;
  Published_By: string;
  Category_Name: string;
  Available_Books: string;
  Language: string;
  Book_No: string;
  Standards: string;
  Total_Books: string;
}

interface BookTableProps {
  data: Book[];
  SortDirection;
  clickcliam;
  SortBy;
  handleSortChange;
}

const BookTable: React.FC<BookTableProps> = ({ data, clickcliam, handleSortChange, SortDirection, SortBy }) => {


  const USBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetAllBooksDetails);


  // console.log(SortDirection, "👌👌");
  // console.log(SortBy, "🤞🤞");


  // const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  // const [orderBy, setOrderBy] = useState<keyof Book>('Book_Title');

  // const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // const [SortBy, setSortBy] = useState('Name');

  // const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  //const [SortBy, setSortBy] = useState('Book_Title');

  // console.log(SortDirection, "👌👌👌")

  // Pagination state
  // const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Default rows per page
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // const handleSortRequest = (property: keyof Book) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setRowsPerPage(Number(event.target.value));
  //   setCurrentPage(1); // Reset to the first page when changing rows per page
  // };

  // const handlePageChange = (value: number) => {
  //   setCurrentPage(value);
  // };

  // // Calculate the start and end index for the current page
  // const startIndex = (currentPage - 1) * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;

  // // Get the paginated data
  // const paginatedData = [...data].slice(startIndex, endIndex);

  // // Calculate the total number of pages
  // const pageCount = Math.ceil(data.length / rowsPerPage);

  // Sorting the data
  // const sortedData = [...data].sort((a, b) => {
  //   if (a[orderBy] && b[orderBy]) {
  //     return (order === 'asc' ? 1 : -1) * (a[orderBy] > b[orderBy] ? 1 : -1);
  //   }
  //   return 0;
  // });

  // const sortData = (data: any[]) => {
  //   return [...data].sort((a, b) => {
  //     if (a[SortBy] < b[SortBy]) return SortDirection === 'asc' ? -1 : 1;
  //     if (a[SortBy] > b[SortBy]) return SortDirection === 'asc' ? 1 : -1;
  //     return 0;
  //   });
  // };


  // const handleSortChange = (column: string) => {
  //   if (SortBy === column) {
  //     setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortBy(column);
  //     setSortDirection('asc');
  //   }
  // };

  return (
    <>
      <TableContainer>
        <Table aria-label="book table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
          <TableHead>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
              {/* <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Accession No</TableCell> */}
              {/* {['Book_Title', 'Author_Name', 'Published_By', 'Standards'].map((field) => (
                <TableCell key={field} sortDirection={orderBy === field ? order : false}>
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={() => handleSortRequest(field as keyof Book)}
                    // sx={{ 
                    //   color: 'white', 
                    //   textAlign: 'left', 
                    //   py: 0, 
                    //   '& .MuiTableSortLabel-icon': { 
                    //     color: 'white' // Ensure the icon color is white
                    //   }
                    // }}
                    IconComponent={order === 'asc' ? ArrowCircleUpIcon : ArrowCircleDownIcon}
                    // Set the color to white when clicked (active)
                    sx={{
                      color: (orderBy === field ? 'white !important' : 'white !important'),
                      '& .MuiTableSortLabel-icon': {
                        color: (orderBy === field ? 'white !important' : 'white !important')
                      }
                    }}
                  >
                    {field.replace('_', ' ')}
                  </TableSortLabel>
                </TableCell>
              ))} */}
              <TableCell sx={{ color: 'white', textAlign: 'left' }}>
                <b
                  onClick={() => handleSortChange(' Accession No')}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: SortBy === ' Accession No' ? 'bold' : 'normal'
                  }}
                >
                  Accession No
                  {SortBy === ' Accession No' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left' }}>
                <b
                  onClick={() => handleSortChange('Book_Title')}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: SortBy === 'Book_Title' ? 'bold' : 'normal'
                  }}
                >
                  Book_Title
                  {SortBy === 'Book_Title' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>

              <TableCell sx={{ color: 'white', textAlign: 'left' }}>
                <b
                  onClick={() => handleSortChange('Author_Name')}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: SortBy === 'Author_Name' ? 'bold' : 'normal'
                  }}
                >
                  Author_Name
                  {SortBy === 'Author_Name' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>

              <TableCell sx={{ color: 'white', textAlign: 'left' }}>
                <b
                  onClick={() => handleSortChange('Published_By')}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: SortBy === 'Published_By' ? 'bold' : 'normal'
                  }}
                >
                  Published_By
                  {SortBy === 'Published_By' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>

              <TableCell sx={{ color: 'white', textAlign: 'left' }}>
                <b
                  onClick={() => handleSortChange('Standards')}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: SortBy === 'Standards' ? 'bold' : 'normal'
                  }}
                >
                  Standards
                  {SortBy === 'Standards' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Language</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Available Books</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Total</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Claim</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USBookDetails.map((row) => (
              <TableRow key={row.Book_Id}>
                <TableCell>{row.Book_No}</TableCell>
                <TableCell>{row.Book_Title}</TableCell>
                <TableCell>{row.Author_Name}</TableCell>
                <TableCell>{row.Published_By}</TableCell>
                <TableCell>{row.Category_Name}</TableCell>
                <TableCell>{row.Language}</TableCell>
                <TableCell>{row.Available_Books}</TableCell>
                <TableCell>{row.Total_Books}</TableCell>

                <TableCell sx={{ py: 0 }}>
                  {row.Available_Books === '0' ? (
                    <Link href="#" onClick={() => clickcliam(row.Book_Id)}>Claim</Link>
                  ) : (" ")}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookTable;
