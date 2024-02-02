import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBookswithmeList } from 'src/interfaces/Student/Library';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import BackButton from 'src/libraries/button/BackButton';
import PageHeader from 'src/libraries/heading/PageHeader';
import List9 from 'src/libraries/list/List9';
import { getBookswithmelist } from 'src/requests/Library/Library';
import { RootState } from 'src/store';
function Bookswithme() {
  const dispatch = useDispatch();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');

  const GetBook = useSelector(
    (state: RootState) => state.library.BookswithmeList
  );

  const loading = useSelector((state: RootState) => state.library.Loading);
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
      <PageHeader heading={'Books with me'} subheading={''} />
      <BackButton FromRoute={'/Student/Library'} />
      {loading ? <SuspenseLoader /> : <List9 itemList={GetBook} />}
    </>
  );
}

export default Bookswithme;
