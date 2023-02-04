import  React,{useState} from 'react';
import Accordion4 from 'src/libraries/accordion/accordion4';
import { getBookDetailslist,getCancelBookReservation } from 'src/requests/Library/Library';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import ErrorMessages2 from 'src/libraries/ErrorMessages/DashboardError';
import {
  GetBooksDetailsResult,
  IBooksDetails,
  ICancelBookReservation
} from 'src/interfaces/Student/Library';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { Typography } from '@mui/material';
import SearchForm from 'src/libraries/card/SearchForm';

function BooksDetails() {
  const dispatch = useDispatch();

  const GetBookList = useSelector(
    (state: RootState) => state.library.BooksDetaiLs
  );
  const [bookTitle, setBookTitle] = useState('');
  const [accessionNo, setAccessionNo] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
 
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asLanguage = sessionStorage.getItem('Language');
  const asStandardID = sessionStorage.getItem('StandardId');
  const asParentStaffID = sessionStorage.getItem('ParentStaffID');
  const asStartRowIndex = sessionStorage.getItem('StartRowIndex');
  const asSortRowIndexExpression = sessionStorage.getItem('SortRowIndexExpression');

  const BooksDetails_body: IBooksDetails = {
    aiSchoolId: asSchoolId,
    asBookName: bookTitle,
    asAccessionNumber: accessionNo,
    asAuthorName: author,
    asPublisher: publisher,
    asLanguage: "0",
    aiStandardId: asStandardID,
    aiMediaType: 2,
    aiBookId: 0,
    aiParentStaffId: "0",
    aiEndIndex: 20,
    aiStartRowIndex: "0",
    asSortExpression: ""
  };


  useEffect(() => {
    dispatch(getBookDetailslist(BooksDetails_body));
  }, []);


 
const confirmsg = () =>{
  if (confirm('Do you want to claim this book for Parent?')) {
              console.log('');
        } else {
      
          
        }
 
}
  return (
    <>
 
      <div>
     
        {GetBookList.length === 0 ? (
          <ErrorMessages Error={'No records found'} />
        ) : (
          <>
            {GetBookList.map((items: GetBooksDetailsResult, i) => {
              return (
                <Accordion4
                  key={i}
                  index={i}
                  Bookk={GetBookList}
                  author={items.Author_Name}
                  publisher={items.Published_By}
                  standard={items.Standards}
                  language={items.Language}
                  available={items.Available_Books}
                  total={items.Total_Book_Quantity}
                  title={items.Book_Title}
                  conformMsg={confirmsg}
                  no={items.Book_No}
                  Collapse={handleChange}
                  expand={expanded}
                />
              );
            })}
          </>
        )}

      </div>
    </>
  );
}
export default BooksDetails;
