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
  IsForIssue: string
}
interface HeaderItem {
  Id: number;
  Header?: string;
  SortOrder: string//'ASC' | 'DESC' | null;
}
interface BookTableProps {
  data: Book[];
  sortHeader: Number;
  SortExpression: string
  clickcliam;
  DefaultValue;
  handleSortChange: (updatedHeaderArray: HeaderItem) => void;
  HeaderArray;
}
const rowStyle = {
  height: '0.5em 1.5em', // Ensure auto height to adjust based on content
};
const cellStyle = {
  padding: '0.2em 1.5em', // Adjust these values to reduce the height
};
const BookTable: React.FC<BookTableProps> = ({ data, clickcliam, DefaultValue, handleSortChange, HeaderArray,
  sortHeader, SortExpression
}) => {

  const clickHeader = (value) => {

    const languageHeader = HeaderArray.find(item => item.Id === value.Id);
    if (languageHeader?.sortKey !== undefined) {

      let SortOrder = value.Id == sortHeader ?
        SortExpression == "Asc" ? "Desc" : "Asc" :
        "Asc"
      handleSortChange({ Id: value.Id, SortOrder: SortOrder });
    }
  }
  const USBookDetails: any = useSelector((state: RootState) => state.SchoolLibrary.IGetAllBooksDetails);
  const USGetAllBooksDetailss: any = useSelector((state: RootState) => state.SchoolLibrary.IGetAllBooksDetailss);

  // console.log(SortDirection, "👌👌");
  //console.log(sortHeader, "HeaderArray", HeaderArray.slice(0, 9));

  return (
    <>
      <TableContainer>
        <Table aria-label="book table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
          <TableHead>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white, ...rowStyle }}>
              {HeaderArray.slice(0, 9).map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1.5 }}
                  onClick={() => clickHeader(item)}
                >
                  {/* <div style={{
                    display: 'flex', gap: 1, justifyContent: (item.Id === 1 || item.Id === 2 || item.Id === 3 || item.Id === 4 || item.Id === 5 || item.Id === 6 || item.Id === 7) ? 'left' :
                      'center'
                  }}> */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem', // Adjust gap as needed
                      justifyContent: [1, 2, 3, 4, 5, 6].includes(item.Id) ? 'left' : 'center',
                    }}
                  >

                    <b>{item.Header}</b>
                    {
                      (sortHeader == item.Id) &&
                      (SortExpression == "Asc" ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)
                    }


                    {/* {i < 4 && item.SortOrder !== null && (
                      item.SortOrder === "DESC" ? <ArrowCircleDown /> : <ArrowCircleUpIcon />
                    )} */}
                  </div>
                </TableCell>
              ))}
              {HeaderArray.slice(9).map((item, i) => (
                <TableCell key={i + 9} sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: item.Header.includes('Remark Template') ? 'flex-start ' : 'center', ...cellStyle }}>
                    <b>{item.Header}</b>
                  </div>
                </TableCell>
              ))}

            </TableRow>
          </TableHead>

          <TableBody>
            {USGetAllBooksDetailss.map((row) => (

              <TableRow key={row.Book_Id} >
                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", paddingTop: '2.5px', paddingBottom: '2.5px' }}>{row.Book_No}</TableCell>
                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", paddingTop: '2.5px', paddingBottom: '2.5px' }} >{row.Book_Title}</TableCell>
                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", paddingTop: '2.5px', paddingBottom: '2.5px' }}>{row.Author_Name}</TableCell>
                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", paddingTop: '2.5px', paddingBottom: '2.5px' }}>{row.Published_By}</TableCell>
                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", paddingTop: '2.5px', paddingBottom: '2.5px' }}>{row.Category_Name}</TableCell>
                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", paddingTop: '2.5px', paddingBottom: '2.5px' }}>{row.Language}</TableCell>
                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", textAlign: 'center', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{row.Available_Books}</TableCell>
                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", textAlign: 'center', paddingTop: '2.5px', paddingBottom: '2.5px' }}>{row.Total_Books}</TableCell>

                <TableCell sx={{ color: row.IsForIssue == "1" ? "" : "red", paddingTop: '2.5px', paddingBottom: '2.5px', textAlign: 'center' }}>
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
