import { Grid } from '@mui/material';
import { useState } from 'react';
import DropdownNew from './DropdownNew';

const MonthYearSelector = ({ YearList, clickItem }) => {
  let MonthList = [
    { Id: '1', Value: '1', Name: 'January', IsActive: false },
    { Id: '2', Value: '2', Name: 'February', IsActive: false },
    { Id: '3', Value: '3', Name: 'March', IsActive: false },
    { Id: '4', Value: '4', Name: 'April', IsActive: false },
    { Id: '5', Value: '5', Name: 'May', IsActive: false },
    { Id: '6', Value: '6', Name: 'June', IsActive: false },
    { Id: '7', Value: '7', Name: 'July', IsActive: false },
    { Id: '8', Value: '8', Name: 'August', IsActive: false },
    { Id: '9', Value: '9', Name: 'September', IsActive: false },
    { Id: '10', Value: '10', Name: 'October', IsActive: false },
    { Id: '11', Value: '11', Name: 'November', IsActive: false },
    { Id: '12', Value: '12', Name: 'December', IsActive: false }
  ];
  const [Month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [Year, setYear] = useState(new Date().getFullYear().toString());
  MonthList = MonthList.map((item) => {
    return { ...item, IsActive: item.Value === Month ? true : false };
  });
  YearList = YearList.map((item) => {
    return { ...item, IsActive: item.Value === Year ? true : false };
  });
  const onChangeMonth = (value) => {
    let month = Month;
    value.map((item) => {
      if (item.IsActive) month = item.Value;
    });
    setMonth(month);
    clickItem({
      Month: month,
      Year: Year
    });
  };
  const onChangeYear = (value) => {
    YearList = value;
    let year = Year;
    value.map((item) => {
      if (item.IsActive) year = item.Value;
    });
    setYear(year);
    clickItem({
      Month: Month,
      Year: year
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <DropdownNew
          Itemlist={MonthList}
          onChange={onChangeMonth}
          Label="Month"
          DefaultValue={Month}
        ></DropdownNew>
      </Grid>
      <Grid item xs={6}>
        <DropdownNew
          Itemlist={YearList}
          onChange={onChangeYear}
          Label="Year"
          DefaultValue={Year}
        ></DropdownNew>
      </Grid>
    </Grid>
  );
};

export default MonthYearSelector;
