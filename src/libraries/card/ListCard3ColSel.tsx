import { Box, Grid, useTheme } from '@mui/material';
import { CardDetailA, CardDetailR } from '../styled/CardStyle';
import CheckboxImg from './CheckboxImg';

const ListCard3ColSel = ({ Item, onChange, assignedDate }) => {
  const date = Item.joinDate;
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  const joinDate = `${Day}-${Month}-${Year}`;

  const userJoinDate = new Date(Item.joinDate);
  const selectedDate = new Date(assignedDate);
  const color = userJoinDate > selectedDate ? '#787876' : '';
  const theme = useTheme();

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
            />
          )}
        </Grid>
        <Grid item xs={2}>
          <CardDetailR>{Item.text1}</CardDetailR>
        </Grid>
        <Grid item xs={9}>
          <CardDetailA>{Item.text2}</CardDetailA>
        </Grid>
      </Box>
    </>
  );
};

export default ListCard3ColSel;
