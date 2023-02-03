import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {getClaimBookDetails} from "src/requests/Library/Library"
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';
import { IClaimDetail,IClaimDetailResult, } from 'src/interfaces/Student/Library';
function ClaimedBook() {
    const dispatch = useDispatch();
    const GetBook = useSelector(
        (state: RootState) => state.library.ClaimList
      );
     
      const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
      const asSchoolId = localStorage.getItem('localSchoolId');
      const UserId = sessionStorage.getItem('Id');
      console.log(GetBook ,"GetBook ")
      const ClaimDetailbody: IClaimDetail = {
      aiSchoolId:asSchoolId,
      aiAcademicYearId:asAcademicYearId,
      aiUserId: UserId,
      asBookTitle:'',
      asUserName:'',
      aiStartRowIndex:'0',
      aiEndIndex:20,
      asSortExpression:'Order by Book_Title asc',
      aiAllUser:1
      }
      useEffect(() => {
        dispatch(getClaimBookDetails(ClaimDetailbody));
      }, []);
  return (
    <div>
      <PageHeader heading={'Claimed Books Detail'} subheading={''}/>
        <BackButton FromRoute={'/Student/Library'}/>
    </div>
  )
}

export default ClaimedBook
