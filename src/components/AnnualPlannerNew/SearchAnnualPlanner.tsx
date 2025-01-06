import { Box, Grid, Stack } from '@mui/material';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

const SearchAnnualPlanner = ({ ItemList, ClickItem, DefaultValue }) => {
  const handleChange = (value, selectedItem) => {
    ClickItem({
      Standard: selectedItem == 'Standard' ? value : DefaultValue.Standard,
      StandardDivision:
        selectedItem == 'StandardDivision'
          ? value
          : DefaultValue.StandardDivision,
      Month: selectedItem == 'Month' ? value : DefaultValue.Month,
      Year: selectedItem == 'Year' ? value : DefaultValue.Year
    });
  };
  return (
    <Grid container spacing={2} alignItems="center" justifyContent={'flex-end'}>
      <Grid item xs={12} sm={6} md={2}>
        <Box sx={{ minWidth: '100%' }}>
          <SearchableDropdown
            size="small"
            sx={{ minWidth: { xs: '40vw', sm: '15vw' } }}
            ItemList={ItemList.StandardList}
            label="Select Standard"
            defaultValue={DefaultValue.Standard}
            onChange={(value) => handleChange(value, 'Standard')}
          />

          {/* <Dropdown
            size="small"
            variant="outlined"
            Array={ItemList.StandardList}
            label="Select Standard"
            defaultValue={DefaultValue.Standard}
            handleChange={(value) => handleChange(value, 'Standard')}
          /> */}

        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box sx={{ minWidth: '100%' }}>
          <SearchableDropdown
            size="small"
            sx={{ minWidth: { xs: '40vw', sm: '15vw' } }}
            ItemList={ItemList.StandardDivisionList}
            label="Select Division"
            defaultValue={DefaultValue.StandardDivision}
            onChange={(value) => handleChange(value, 'StandardDivision')}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box sx={{ minWidth: '100%' }}>
          <SearchableDropdown
            size="small"
            sx={{ minWidth: { xs: '40vw', sm: '15vw' } }}
            ItemList={ItemList.MonthList}
            label="Select Month"
            defaultValue={DefaultValue.Month}
            onChange={(value) => handleChange(value, 'Month')}
          />



        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box sx={{ minWidth: '100%' }}>
          <SearchableDropdown
            size="small"
            sx={{ minWidth: { xs: '40vw', sm: '15vw' } }}
            ItemList={ItemList.YearList}
            label="Select Year"
            defaultValue={DefaultValue.Year}
            onChange={(value) => handleChange(value, 'Year')}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchAnnualPlanner;
