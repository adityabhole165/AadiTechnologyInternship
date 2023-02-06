import React, { useEffect, useState } from 'react';
import BooksDetails from './BooksDetails';
import PageHeader from 'src/libraries/heading/PageHeader';
import {  Typography, Container,Grid } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router';
import {
  GetBooksDetailsResult,
  IBooksDetails,
  ICancelBookReservation
} from 'src/interfaces/Student/Library';
import { RootState } from 'src/store';
import { getBookDetailslist,getCancelBookReservation } from 'src/requests/Library/Library';
import SearchForm from 'src/libraries/card/SearchForm';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


function Library() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [accessionNo, setAccessionNo] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  
  const GetBookList = useSelector(
    (state: RootState) => state.library.BooksDetaiLs
  );
 
   const clickBookwithme = () => {
    navigate('/extended-sidebar/Student/Library/Bookswithme')
  }
  const clickClaimedBook = () => {
    navigate('/extended-sidebar/Student/Library/ClaimedBook')
  }

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

  useEffect(() => {
    dispatch(getBookDetailslist(BooksDetails_body));
   }, [ bookTitle, accessionNo,author,publisher]);
 
   const clickFilter=({bookTitle,accessionNo,author,publisher})=>{
     setBookTitle(bookTitle)
     setAccessionNo(accessionNo)
     setAuthor(author)
     setPublisher(publisher)
     
   }
  const clickCloseIcon= () => {
    setShowFilter(!showFilter)
      }

    
  return (
    <Container>
      <PageHeader heading={'Library'} subheading={''} />
      {!showFilter ?
      (<Grid container spacing={1}>
        <Grid item xs={5.2}>
          <ButtonPrimary fullWidth onClick={clickClaimedBook}>Claimed Book Details</ButtonPrimary>
        </Grid>
        <Grid item xs={5.2}>
        <ButtonPrimary fullWidth onClick={clickBookwithme}>Books With Me</ButtonPrimary>
        </Grid> 
        <Grid item xs={1.6}>
        <img src={"/imges/SearchBook.png"} style={{width: 30, height: 27,}} onClick={()=>{setShowFilter(!showFilter)}}/>
        </Grid>
       </Grid>):
     (<SearchForm clickFilter={clickFilter} clickCloseIcon={clickCloseIcon}/>)}
      <Typography sx={{textAlign:"center",padding:"10px",color:"black"}} variant="h4">Books Details</Typography>
      <BooksDetails GetBookList={GetBookList}/>
   </Container>
  );
}
export default Library;
