import React, { useEffect, useState } from 'react';
import BooksDetails from './BooksDetails';
import PageHeader from 'src/libraries/heading/PageHeader';
import {  Typography, Container,Grid , ToggleButton, ToggleButtonGroup,Box, Button, IconButton, Avatar} from '@mui/material';
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
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ButtonSort from 'src/libraries/card/ButtonSort';
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
const [ascending, setAscending] = useState('asc');

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
    asSortExpression: "Order by Book_Title " + ascending
  };
  useEffect(() => {
    setStandard(Standard)
    dispatch(getBookDetailslist(BooksDetails_body));
  }, []);
  useEffect(() => {
 
    dispatch(getBookDetailslist(BooksDetails_body));
   }, [ bookTitle, accessionNo,author,publisher,Standard,Language,ascending]);
 
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


const sortClick = () =>{
  if(ascending=== "asc" ){
  setAscending("desc") 
}
  else{
  setAscending("asc") 
}
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

      <Grid container >
      <Grid item xs={1.5}/>
        <Grid item xs={9}>
        <Typography  sx={{textAlign:"center",padding:"10px",color:"black"}} variant="h4">Books Details</Typography>
        </Grid>
     <Grid item xs={1.5}>
      <Avatar  variant="square" sx={{ height: 25, width: 55, color: "black" ,mt:"8px",float:"right",mr:"10px"}}>
      <IconButton onClick={()=>sortClick()}>
      {ascending === 'asc' ?  <ArrowDropUpIcon/>  : 
        <ArrowDropDownIcon/> }
        {ascending === 'asc' ? (<Typography>A-Z</Typography>) :(<Typography>Z-A</Typography>)}
      </IconButton>
      </Avatar>


       </Grid>
    
          </Grid>
      {loading ? (
        <SuspenseLoader />
      ) : (
      <BooksDetails GetBookList={GetBookList}/>
     
       )}
   </Container>
  );
}
export default Library;
