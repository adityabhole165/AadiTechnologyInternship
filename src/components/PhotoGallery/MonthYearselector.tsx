import { Grid } from '@mui/material';
import { monthArray } from 'src/components/Common/Util';
import Dropdown from 'src/libraries/dropdown/Dropdown';
const MonthYearselector = ({ month, onChange, year, YearData, newChange }) => {
  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Dropdown
            Array={monthArray}
            handleChange={onChange}
            defaultValue={month}
            label="Select Month"
          />
        </Grid>
        <Grid item xs={6}>
          <Dropdown
            Array={YearData}
            handleChange={newChange}
            defaultValue={year}
            label="Select Year"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MonthYearselector;
