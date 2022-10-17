import { Grid } from '@mui/material';
import HeaderCheckbox from './HeaderCheckbox';

const ListHeaderCard3ColSel = ({ Item, onChange }) => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={1}
          sx={{ mt: '15px', paddingLeft: '5px', fontWeight: 'bold' }}
        >
          <HeaderCheckbox checked={Item.isActive} onChange={onChange} />
        </Grid>{' '}
        <Grid
          item
          xs={3}
          sx={{ textAlign: 'center', color: 'black', fontWeight: 'bold',mt: '15px',ml: '-5px',  }}
        >
          {Item.text1.split(' ')[0]}
          <br/>
          {Item.text1.split(' ')[1]}
        </Grid>{' '}
        <Grid
          item
          xs={8}
          sx={{
            mt: '15px',
            color: 'black',
            paddingLeft: '25px',
            fontWeight: 'bold'
          }}
        >
          {Item.text2}
        </Grid>
      </Grid>
    </>
  );
};

export default ListHeaderCard3ColSel;
