import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getBookswithmelist } from 'src/Client_Api/Student/Library';
import { RootState } from 'src/store';
import List9 from 'src/UI_Library/list/List9';
import ErrorMessages2 from 'src/UI_Library/ErrorMessages/DashboardError';
import {
  IBookswithmeList,
  GetBookswithmeResult
} from 'src/Interface/Student/Library';

function Bookswithme() {
  const dispatch = useDispatch();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');


  const GetBook = useSelector(
    (state: RootState) => state.library.BookswithmeList
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
      <div>
        {GetBook.length === 0 ? (
          <ErrorMessages2 Error={'No record found'} />
        ) : (
          <>
            {GetBook.map((items: GetBookswithmeResult, i) => {
              return (
                <List9
                  Title={GetBook}
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
      </div>
    </>
  );
}

export default Bookswithme;
