import { useEffect } from 'react';
import {
  getYearsList,
  getAllMonthList
} from 'src/Client_Api/MessageCenter/MessaageCenter';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Iyears, IGetAllMonths } from 'src/Interface/MessageCenter/Search';
import Form2 from 'src/UI_Library/form/form2';

function Search({searchData}) {
  const dispatch = useDispatch();
  const YearsList = useSelector(
    (state: RootState) => state.MessageCenter.YearsList
  );
  const AllMonthList = useSelector(
    (state: RootState) => state.MessageCenter.AllMonthList
  );

  const body: Iyears = {
    asSchoolId: '120'
  };
  const Mbody: IGetAllMonths = {
    asAcademicYearId: '8',
    asSchoolId: '120'
  };

  useEffect(() => {
    dispatch(getYearsList(body));
    dispatch(getAllMonthList(Mbody));
  }, []);

  const SearchFunction = (e) => {
    searchData(e);
  }

  return (
    <>
      <Form2 YearsList={YearsList} allMonthList={AllMonthList} searchFunction={SearchFunction}/>
    </>
  );
}

export default Search;
