import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {getClaimBookDetails,getCancelBookReservation, resetMessage} from "src/requests/Library/Library"
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';
import { IClaimDetail,IClaimDetailResult, ICancelBookReservation } from 'src/interfaces/Student/Library';
import Accordian1 from 'src/libraries/mainCard/Accordian1';
import { Container,Box,Checkbox } from '@mui/material';
import Filter from 'src/libraries/mainCard/Filter';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { toast } from 'react-toastify';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
function ClaimedBook() {
    const dispatch = useDispatch();
    const ClaimedBook = useSelector(
        (state: RootState) => state.library.ClaimList
      );
      const GetCancelBookReservation = useSelector(
        (state: RootState) => state.library.CancelBookReservation
      );
      
       const loading = useSelector(
          (state: RootState) => state.library.Loading
       );
      const [claimedBookList, setClaimedBookList] = useState([]);
      const [expanded, setExpanded] = React.useState<string | false>(false);
      const [checked, setChecked] = useState(false);
      const [userName, setUserName] = useState('');
      const [bookTitle, setBookTitle] = useState('');
      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
      useEffect(()=>{
        
        setClaimedBookList(ClaimedBook
          .filter((obj)=>{
            return checked?true:
            obj.UserId===Number(sessionStorage.getItem('Id'))
          }))
      },[ClaimedBook,checked])
      const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
      const asSchoolId = localStorage.getItem('localSchoolId');
      const UserId = sessionStorage.getItem('Id');
   
      const ClaimDetailbody: IClaimDetail = {
      aiSchoolId:asSchoolId,
      aiAcademicYearId:asAcademicYearId,
      aiUserId: UserId,
      asBookTitle:bookTitle,
      asUserName:userName,
      aiStartRowIndex:'0',
      aiEndIndex:20,
      asSortExpression:'Order by Book_Title asc',
      aiAllUser:1
      }
      useEffect(() => {
        dispatch(getClaimBookDetails(ClaimDetailbody));
      }, []);
      useEffect(() => {
        console.log(ClaimDetailbody,checked ? 1:0,checked)
        dispatch(getClaimBookDetails(ClaimDetailbody));
      }, [ bookTitle, userName]);

      
      useEffect(() => {
        if(GetCancelBookReservation!=='')
        toast.success(GetCancelBookReservation,{ toastId: 'success1'});

        dispatch(resetMessage());
        
      },[GetCancelBookReservation])
      const clickSearch=({bookTitle,userName})=>{
        setBookTitle(bookTitle)
        setUserName(userName)
      }

     const clickAllUser=(AllUser)=>{
      setChecked(AllUser)

     }

      const confirmsg = (value) =>{
        if (confirm('Are you sure you want to cancel the book claim?')) {
          
      const CancelBookReservationbody:ICancelBookReservation = {
        aiUserId:sessionStorage.getItem('Id'),
        aiBookid:value,
        aiSchoolId:localStorage.getItem('localSchoolId'),
        aiAcademicYearId:sessionStorage.getItem('AcademicYearId')
    
      }
      dispatch(getCancelBookReservation(CancelBookReservationbody));
        // dispatch(getClaimBookDetails(ClaimDetailbody));
      } 

       
      }
  return (
    <Container >
    <PageHeader heading={'Claimed Books Detail'} subheading={''}/>
    <BackButton FromRoute={'/Student/Library'}/>
    {loading ? (
    <SuspenseLoader />
      ) : ( <>
    <Filter  clickSearch={ clickSearch} clickAllUser={clickAllUser}/>
    {claimedBookList.length === 0?
  (<ErrorMessages Error={
    checked?
     'No books claimed':
     'No book has been claimed yet '} />):
      claimedBookList.map((items: IClaimDetailResult,i) => {
      return (
    <Box key={i}  my={1}>
    <Accordian1 expanded={expanded} handleChange={handleChange} 
    index={i} items={items} confirmsg={()=>{confirmsg(items.Book_Id)}}/>
    </Box>
      );
    })}
    </>
    )}
    </Container>
  )
}

export default ClaimedBook
