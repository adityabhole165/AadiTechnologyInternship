import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getBookswithmelist } from 'src/requests/Library/Library';
import { RootState } from 'src/store';
import List9 from 'src/libraries/list/List9';
import {
  IBookswithmeList,
  GetBookswithmeResult
} from 'src/interfaces/Student/Library';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
function Bookswithme() {
  const dispatch = useDispatch();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');


  const GetBook = useSelector(
    (state: RootState) => state.library.BookswithmeList
  );

  const loading = useSelector(
    (state: RootState) => state.library.Loading
  );
  const Books_body: IBookswithmeList = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiUserId: UserId
  };

  useEffect(() => {
    dispatch(getBookswithmelist(Books_body));
  }, []);
  return (
    <>
     
        <PageHeader heading={'Books with me'} subheading={''}/>
        <BackButton FromRoute={'/Student/Library'}/>
        {loading ? (
        <SuspenseLoader />
      ) : (
        <>
        {GetBook.length === 0 ? (
         <ErrorMessages Error={'No records found'} />
         ) : (
          <>
            {GetBook.map((items: GetBookswithmeResult, i) => {
              return (
                <List9
                 Acc={items.Book_No}
                  title={items.Book_Title}
                  issue={items.Issue_Date}
                  returnn={items.Return_Date}
                  parentissue={items.IsForParent}
                  key={i}
                />
              );
            })}
          </>
        )}
        </>
      )}
    </>
    
  );
}

export default Bookswithme;
