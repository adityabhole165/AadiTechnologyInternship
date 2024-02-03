import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllMonths, Iyears } from 'src/interfaces/MessageCenter/Search';
import Form2 from 'src/libraries/form/form2';
import {
  getAllMonthList,
  getYearsList
} from 'src/requests/MessageCenter/MessaageCenter';
import { RootState } from 'src/store';

function Search({ searchData, closeSearchbarBoolean }) {
  const dispatch = useDispatch();

  const asSchoolId = localStorage.getItem('localSchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const [SelectedAcademicYearId, setSelectedAcademicYearId] =
    useState(AcademicYearId);

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
    asAcademicYearId: SelectedAcademicYearId,
    asSchoolId: asSchoolId
  };

  useEffect(() => {
    dispatch(getYearsList(body));
    dispatch(getAllMonthList(Mbody));
  }, [SelectedAcademicYearId]);

  const SearchFunction = (e) => {
    searchData(e);
  };

  const closeIcon = () => {
    closeSearchbarBoolean(true);
  };

  const AcademicYearChanged = (e) => {
    setSelectedAcademicYearId(e);
  };

  return (
    <>
      <Avatar
        sx={{
          position: 'absolute',
          top: '55px',
          zIndex: '4',
          right: '10px',
          p: '2px',
          width: 25,
          height: 25,
          backgroundColor: 'white',
          boxShadow:
            '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
        }}
        onClick={closeIcon} // Close function
      >
        <CloseIcon fontSize="small" color="error" />
      </Avatar>
      <Form2
        YearsList={YearsList}
        allMonthList={AllMonthList}
        searchFunction={SearchFunction} // Child to parent search object
        YearChangeCapture={AcademicYearChanged}
      />
    </>
  );
}

export default Search;
