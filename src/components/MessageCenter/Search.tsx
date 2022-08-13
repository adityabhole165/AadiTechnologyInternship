import { useEffect,useState } from 'react';
import {
  getYearsList,
  getAllMonthList
} from 'src/requests/MessageCenter/MessaageCenter';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Iyears, IGetAllMonths } from 'src/interfaces/MessageCenter/Search';
import Form2 from 'src/libraries/form/form2';

function Search({searchData}) {

  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');

  const dispatch = useDispatch();
  const YearsList = useSelector(
    (state: RootState) => state.MessageCenter.YearsList
  );
  const AllMonthList = useSelector(
    (state: RootState) => state.MessageCenter.AllMonthList
  );

  const body: Iyears = {
    asSchoolId: asSchoolId
  };
  const Mbody: IGetAllMonths = {
    asAcademicYearId: AcademicYearId,
    asSchoolId: asSchoolId
  };
  

  useEffect(() => {
    dispatch(getYearsList(body));
    dispatch(getAllMonthList(Mbody));
  }, []);

  const SearchFunction = (e) => {
    searchData(e);
  }

  const [show, setShow] = useState(false);
  const handleClick = (e) => {
    setShow(!show);
  };
  return (
    <>
      <Form2 YearsList={YearsList} allMonthList={AllMonthList} searchFunction={SearchFunction}/>
    </>
  );
}

export default Search;
