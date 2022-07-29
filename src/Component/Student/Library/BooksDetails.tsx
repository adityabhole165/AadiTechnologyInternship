import Accordion4 from 'src/UI_Library/accordion/accordion4';
import { getBookDetailslist } from 'src/Client_Api/Student/Library';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import ErrorMessages2 from 'src/UI_Library/ErrorMessages/DashboardError';
import {
  GetBooksDetailsResult,
  IBooksDetails
} from 'src/Interface/Student/Library';

function BooksDetails() {
  const dispatch = useDispatch();

  const GetBookList = useSelector(
    (state: RootState) => state.library.BooksDetaiLs
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asLanguage = sessionStorage.getItem('Language');
  const asStandardID = sessionStorage.getItem('StandardId');
  const asParentStaffID = sessionStorage.getItem('ParentStaffID');
  const asStartRowIndex = sessionStorage.getItem('StartRowIndex');
  const asSortRowIndexExpression = sessionStorage.getItem('SortRowIndexExpression');

  const BooksDetails_body: IBooksDetails = {
    aiSchoolId: asSchoolId,
    asBookName: null,
    asAccessionNumber: null,
    asAuthorName: null,
    asPublisher: null,
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

  return (
    <>
      <div>
        {GetBookList.length === 0 ? (
          <ErrorMessages2 Error={'No record found'} />
        ) : (
          <>
            {GetBookList.map((items: GetBooksDetailsResult, i) => {
              return (
                <Accordion4
                  key={i}
                  Bookk={GetBookList}
                  author={items.Author_Name}
                  publisher={items.Published_By}
                  standard={items.Standards}
                  language={items.Language}
                  available={items.Available_Books}
                  total={items.Total_Book_Quantity}
                  title={items.Book_Title}
                  no={items.Book_No}
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
