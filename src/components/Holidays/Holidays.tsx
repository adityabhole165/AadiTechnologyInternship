import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IHolidays from 'src/interfaces/Common/Holidays';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ListH from 'src/libraries/mainCard/ListH';
import DotLegend from 'src/libraries/summary/DotLegend';
import { getHolidays } from 'src/requests/Holiday/Holiday';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
function Holidays() {
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');

  const dispatch = useDispatch();
  const holidaysList = useSelector(
    (state: RootState) => state.Holidays.HolidaysData
  );

  const loading = useSelector((state: RootState) => state.Holidays.Loading);

  const body: IHolidays = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStandardId:
      asStandardId == null || asStandardId == 'undefined' ? '0' : asStandardId,
    asDivisionId:
      asDivisionId == null || asDivisionId == 'undefined' ? '0' : asDivisionId
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getHolidays(body));
  }, []);

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader navLinks={[
        {
          title: 'Holidays',
          path: ''
        }
      ]} />
      <Box sx={{ background: 'white', p: 2 }}>
        <Grid container>
          <Grid item xs={6}>
            <DotLegend color="secondary" text="Upcoming Holidays" />
          </Grid>
        </Grid>
        {loading ? <SuspenseLoader /> : <ListH itemList={holidaysList}></ListH>}
      </Box>
    </Box>
  );
}
export default Holidays;
