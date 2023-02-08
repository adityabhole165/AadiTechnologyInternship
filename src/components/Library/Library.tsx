import React, { useEffect, useState } from 'react';
import BooksDetails from './BooksDetails';
import PageHeader from 'src/libraries/heading/PageHeader';
import {  Typography, Container,Grid } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router';
import {IBooksDetails} from 'src/interfaces/Student/Library';
import { RootState } from 'src/store';
import { getBookDetailslist} from 'src/requests/Library/Library';
import SearchForm from 'src/libraries/card/SearchForm';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { logoURL } from '../Common/Util';

function Library() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [accessionNo, setAccessionNo] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [Language,setLanguage] = useState('');
  const GetBookList = useSelector(
    (state: RootState) => state.library.BooksDetaiLs
  );

  const loading = useSelector(
    (state: RootState) => state.library.Loading
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
  const [Standard,setStandard] = useState(asStandardID);
 console.log(asStandardID,"asStandardID")
  const BooksDetails_body: IBooksDetails = {
    aiSchoolId: asSchoolId,
    asBookName: bookTitle,
    asAccessionNumber: accessionNo,
    asAuthorName: author,
    asPublisher: publisher,
    asLanguage: Language,
    aiStandardId:Standard,
    aiMediaType: 2,
    aiBookId: 0,
    aiParentStaffId: "0",
    aiEndIndex: 20,
    aiStartRowIndex: "0",
    asSortExpression: ""
  };
  useEffect(() => {
    setStandard(Standard)
    dispatch(getBookDetailslist(BooksDetails_body));
  }, []);
  useEffect(() => {
 
    dispatch(getBookDetailslist(BooksDetails_body));
   }, [ bookTitle, accessionNo,author,publisher,Standard,Language]);
 
   const clickFilter=({bookTitle,accessionNo,author,publisher,Language,Standard})=>{
   
    
     setBookTitle(bookTitle)
     setAccessionNo(accessionNo)
     setAuthor(author)
     setPublisher(publisher)
     setLanguage(Language)
     setStandard(Standard)
   }

  const clickCloseIcon= ({bookTitle,accessionNo,author,publisher,Language,Standard}) => {
    setShowFilter(!showFilter);
    setBookTitle(bookTitle)
    setAccessionNo(accessionNo)
    setAuthor(author)
    setPublisher(publisher)
    setLanguage(Language)
    setStandard(Standard)

      }

    
  return (
    <Container>
      <PageHeader heading={'Library'} subheading={''} />
      {!showFilter ?
      (<Grid container spacing={1}>
        <Grid item xs={5.2}>
          <ButtonPrimary fullWidth onClick={clickClaimedBook}>Claimed Book</ButtonPrimary>
        </Grid>
        <Grid item xs={5.2}>
        <ButtonPrimary fullWidth onClick={clickBookwithme}>Books With Me</ButtonPrimary>
        </Grid> 
        <Grid item xs={1.6}>
        <img src={"/imges/SearchBook.png"} style={{width: 30, height: 27,}} onClick={()=>{setShowFilter(!showFilter)}}/>
        </Grid>
       </Grid>):
     (<SearchForm clickFilter={clickFilter} clickCloseIcon={clickCloseIcon} Standard={Standard}/>)}
      <Typography sx={{textAlign:"center",padding:"10px",color:"black"}} variant="h4">Books Details</Typography>
      {loading ? (
        <SuspenseLoader />
      ) : (
      <BooksDetails GetBookList={GetBookList}/>
       )}
   </Container>
  );
}
export default Library;
