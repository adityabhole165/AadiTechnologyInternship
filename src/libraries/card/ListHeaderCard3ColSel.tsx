import { Grid } from '@mui/material';
import { ListStyle } from '../styled/CardStyle';
import HeaderCheckbox from './HeaderCheckbox';

const ListHeaderCard3ColSel = ({ Item, onChange }) => {
  return (
    <ListStyle>
      <Grid container>
        <Grid
          item
          xs={1}
        
        >
          <HeaderCheckbox checked={Item.isActive} onChange={onChange} />
        </Grid>{' '}
        <Grid
          item
          xs={3}
          sx={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}
        >
          {Item.text1.split(' ')[0]}
          <br/>
          {Item.text1.split(' ')[1]}
        </Grid>{' '}
        <Grid
          item
          xs={8}
          sx={{
           color: 'black',
          fontWeight: 'bold',
          fontSize:"14px",
          }}
        >
          {Item.text2}
        </Grid>
      </Grid>
    </ListStyle>
  );
};

export default ListHeaderCard3ColSel;
