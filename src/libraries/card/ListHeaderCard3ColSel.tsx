import { Grid } from '@mui/material';
import { CardDetail1, ListStyle1 } from '../styled/CardStyle';
import HeaderCheckbox from './HeaderCheckbox';

const ListHeaderCard3ColSel = ({ Item, onChange }) => {
  return (
    <ListStyle1>
      <Grid container>
        <Grid
          item
          xs={1}
          sx={{ display: 'flex', alignItems: 'center', paddingLeft: '5px' }}
        >
          <HeaderCheckbox checked={Item.isActive} onChange={onChange} />
        </Grid>{' '}
        <Grid item xs={3}>
          <CardDetail1>
            {Item.text1.split(' ')[0]}
            &nbsp;
            {Item.text1.split(' ')[1]}
          </CardDetail1>
        </Grid>{' '}
        <Grid item xs={8}>
          <CardDetail1>{Item.text2}</CardDetail1>
        </Grid>
      </Grid>
    </ListStyle1>
  );
};

export default ListHeaderCard3ColSel;
