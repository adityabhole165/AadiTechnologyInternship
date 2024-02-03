import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  ICancelBookReservation,
  IClaimDetail,
  IClaimDetailResult
} from 'src/interfaces/Student/Library';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import BackButton from 'src/libraries/button/BackButton';
import PageHeader from 'src/libraries/heading/PageHeader';
import Accordian1 from 'src/libraries/mainCard/Accordian1';
import Filter from 'src/libraries/mainCard/Filter';
import {
  getCancelBookReservation,
  getClaimBookDetails,
  resetMessage
} from 'src/requests/Library/Library';
import { RootState } from 'src/store';
function ClaimedBook() {
  const dispatch = useDispatch();
  const ClaimedBook = useSelector(
    (state: RootState) => state.library.ClaimList
  );
  const GetCancelBookReservation = useSelector(
    (state: RootState) => state.library.CancelBookReservation
  );

  const loading = useSelector((state: RootState) => state.library.Loading);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [checked, setChecked] = useState(false);
  const [userName, setUserName] = useState('');
  const [bookTitle, setBookTitle] = useState('');

  let claimedBookList = ClaimedBook.filter((obj) => {
    return checked ? true : obj.UserId === Number(sessionStorage.getItem('Id'));
  });
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');

  const ClaimDetailbody: IClaimDetail = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiUserId: UserId,
    asBookTitle: bookTitle,
    asUserName: userName,
    aiStartRowIndex: '0',
    aiEndIndex: 20,
    asSortExpression: 'Order by Book_Title asc',
    aiAllUser: 1
  };
  useEffect(() => {
    dispatch(getClaimBookDetails(ClaimDetailbody));
  }, [bookTitle, userName]);

  useEffect(() => {
    if (GetCancelBookReservation !== '')
      toast.success(GetCancelBookReservation, { toastId: 'success1' });
    dispatch(getClaimBookDetails(ClaimDetailbody));
    dispatch(resetMessage());
  }, [GetCancelBookReservation]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const clickSearch = ({ bookTitle, userName }) => {
    setBookTitle(bookTitle);
    setUserName(userName);
  };

  const confirmsg = (value) => {
    if (confirm('Are you sure you want to cancel the book claim?')) {
      const CancelBookReservationbody: ICancelBookReservation = {
        aiUserId: sessionStorage.getItem('Id'),
        aiBookid: value,
        aiSchoolId: localStorage.getItem('localSchoolId'),
        aiAcademicYrId: sessionStorage.getItem('AcademicYearId')
      };
      dispatch(getCancelBookReservation(CancelBookReservationbody));
    }
  };

  return (
    <Container>
      <PageHeader heading={'Claimed Books Details'} subheading={''} />
      <BackButton FromRoute={'/Student/Library'} />

      <Filter
        clickSearch={clickSearch}
        clickAllUser={(AllUser) => {
          setChecked(AllUser);
        }}
      />
      {loading ? (
        <SuspenseLoader />
      ) : claimedBookList.length === 0 ? (
        <ErrorMessages
          Error={checked ? 'No record found' : 'No book has been claimed yet '}
        />
      ) : (
        claimedBookList.map((items: IClaimDetailResult, i) => {
          return (
            <Box key={i} my={1}>
              <Accordian1
                expanded={expanded}
                handleChange={handleChange}
                index={i}
                items={items}
                confirmsg={() => {
                  confirmsg(items.Book_Id);
                }}
              />
            </Box>
          );
        })
      )}
    </Container>
  );
}

export default ClaimedBook;
