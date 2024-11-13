import { Grid } from '@mui/material';
import { GetScreenPermission } from 'src/components/Common/Util';
import { CardDetail1, ListStyle1 } from '../styled/CardStyle';
import HeaderCheckbox from './HeaderCheckbox';

const ListHeaderCard3ColSel = ({ Item, onChange }) => {
  const MessageCenterFullAccess = GetScreenPermission('Message Center');
  return (

    <ListStyle1 color={"secondary"} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
      <Grid container >
        <Grid
          item
          xs={1}
          sx={{ display: 'flex', alignItems: 'center', }}
        >
          <HeaderCheckbox checked={Item.isActive} onChange={onChange} />
        </Grid>{' '}
        <Grid item xs={1}>
          <CardDetail1 sx={{ color: 'white' }}>
            {Item.text1.split(' ')[0]}
            &nbsp;
            {Item.text1.split(' ')[1]}
          </CardDetail1>
        </Grid>{' '}
        <Grid item xs={4} >
          <CardDetail1 sx={{ color: 'white', ml: -4 }}>{Item.text2}</CardDetail1>

        </Grid>
        <Grid item xs={3} >
          {MessageCenterFullAccess === 'Y' && (
            <CardDetail1 sx={{ color: 'white', ml: 2 }}>{Item.text3}</CardDetail1>
          )}
        </Grid>
        <Grid item xs={3}  >
          {MessageCenterFullAccess === 'Y' && (
            <CardDetail1 sx={{ color: 'white' }}>{Item.text4}</CardDetail1>
          )}
        </Grid>
      </Grid>

    </ListStyle1>
  );
};

export default ListHeaderCard3ColSel;
