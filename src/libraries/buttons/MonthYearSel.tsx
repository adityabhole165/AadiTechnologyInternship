import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select
} from '@mui/material';
const MonthYearSel = ({ YearData, month, handleChange, year, handleClick }) => {
  return (
    <Container>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Box>
            <FormControl fullWidth variant="standard">
              <Select value={month} onChange={handleChange} size="small">
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <FormControl fullWidth variant="standard">
              <Select value={year} onChange={handleClick} size="small">
                {YearData.map((item, key) => (
                  <MenuItem value={item} key={key}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MonthYearSel;
