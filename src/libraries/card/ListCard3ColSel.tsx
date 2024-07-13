import { Box, Grid, Typography, useTheme } from '@mui/material';
import { CardDetailA, CardDetailR } from '../styled/CardStyle';
import CheckboxImg from './CheckboxImg';

const ListCard3ColSel = ({ Item, onChange, assignedDate }) => {

  const date = Item.joinDate;

  // const Day = new Date(date).getDate();
  // const Month = new Date(date).toLocaleString('default', { month: 'short' });
  // const Year = new Date(date).getFullYear();
  const dateParts = Item.joinDate.split(' ')[0].split('-');
  const Day = parseInt(dateParts[0]);
  const Month = parseInt(dateParts[1]);
  const Year = parseInt(dateParts[2]);

  const joinDate = new Date(Year, Month - 1, Day);


  //const joinDate = `new Date(Year, Month - 1, Day)`;

  // const userJoinDate = new Date(Item.joinDate);
  // const selectedDate = new Date(assignedDate);
  const joinDateParts = Item.joinDate.split(/[- :]/);
  // month is 0-indexed, so we subtract 1 from the month
  const userJoinDate = new Date(joinDateParts[2], joinDateParts[1] - 1, joinDateParts[0], joinDateParts[3], joinDateParts[4], joinDateParts[5]);
  // const userJoinDate = new Date(Item.joinDate);
  const selectedDate = new Date(assignedDate);


  // const color = userJoinDate > selectedDate ? '#787876' : '';
  const color = userJoinDate > selectedDate ? '#e1bee7' : '';
  const fontWeight = userJoinDate > selectedDate ? 'bold' : 'normal';


  //const color = userJoinDate == selectedDate ? '#787876' : '';
  const theme = useTheme();

  if ((Item.text1 === "49") && (Item.text2 === "Master Soham Bhagade") && userJoinDate > selectedDate) {

  }
  return (
    <>
      <Box
        bgcolor={
          !Item.isActive
            ? `${theme.colors.gradients.listColor}`
            : `${theme.colors.gradients.selectedlistColor}`
        }
        sx={{ backgroundColor: color, display: 'flex', alignItems: 'center' }}
      >
        <Grid
          item
          xs={1}
          sx={{ paddingLeft: '15px', display: 'flex', alignItems: 'center' }}
        >
          {userJoinDate > selectedDate ? null : (
            <CheckboxImg
              name={Item.text1}
              value={0}
              checked={Item.isActive}
              onChange={onChange}
              IsExamSubmitted={Item.IsExamSubmitted}
            />
          )}
        </Grid>
        <Grid item xs={2}>
          <CardDetailR>
            <Typography color={Item.isError ? 'primary' : 'error'} fontWeight={fontWeight}>{Item.text1}</Typography>

          </CardDetailR>
        </Grid>
        <Grid item xs={9}>
          <CardDetailA>
            <Typography color={Item.isError ? 'primary' : 'error'} fontWeight={fontWeight}>{Item.text2}</Typography>
          </CardDetailA>
        </Grid>
      </Box>
    </>
  );
};

export default ListCard3ColSel;
