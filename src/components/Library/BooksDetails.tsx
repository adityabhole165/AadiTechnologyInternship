import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  GetBooksDetailsResult,
  IReserveBook
} from 'src/interfaces/Student/Library';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Accordion4 from 'src/libraries/accordion/accordion4';
import {
  getReserveBook,
  resetClaimMessage
} from 'src/requests/Library/Library';
import { RootState } from 'src/store';
function BooksDetails({ GetBookList }) {
  const dispatch = useDispatch();
  const ReserveBook = useSelector(
    (state: RootState) => state.library.ReserveBook
  );
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [aiFlag, setAiFlag] = useState(0);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //console.log(aiFlag, 'aiFlag');
  useEffect(() => {
    if (ReserveBook !== '') {
      if (aiFlag === 0) {
        toast.success(ReserveBook.replace('!!!', '  ') + 'for Student!!!', {
          toastId: 'success1'
        });
      } else {
        toast.success(ReserveBook.replace('!!!', '  ') + 'for Parent!!!', {
          toastId: 'success1'
        });
      }

      dispatch(resetClaimMessage());
    }
  }, [ReserveBook]);

  const ClickReserve = (value) => {
    //console.log(value.aiFlag, 'flag');
    setAiFlag(value.aiFlag);
    const ReserveBookbody: IReserveBook = {
      aiSchoolId: localStorage.getItem('localSchoolId'),
      aiAcademicYrId: sessionStorage.getItem('AcademicYearId'),
      aiUserId: sessionStorage.getItem('Id'),
      aiUserRoleId: sessionStorage.getItem('RoleId'),
      aiBookId: value.aiBookId,
      ReservedByParent: value.aiFlag,
      InsertedById: sessionStorage.getItem('Id'),
      aiFlag: value.aiFlag
    };
    dispatch(getReserveBook(ReserveBookbody));
  };

  return (
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
                Book_Id={items.Book_Id}
                author={items.Author_Name}
                publisher={items.Published_By}
                standard={items.Standards}
                language={items.Language}
                available={items.Available_Books}
                total={items.Total_Book_Quantity}
                title={items.Book_Title}
                no={items.Book_No}
                IsForIssue={items.IsForIssue}
                AllowBookClaimForParent={items.AllowBookClaimForParent}
                Collapse={handleChange}
                expand={expanded}
                ClickReserve={ClickReserve}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
export default BooksDetails;
