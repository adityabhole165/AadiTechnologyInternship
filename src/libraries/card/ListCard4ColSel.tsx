import { Grid } from '@mui/material';
import CheckboxImg from './CheckboxImg';
import { ListStyle } from '../styled/CardStyle';
import { useNavigate } from 'react-router-dom';
import Card4 from 'src/libraries/mainCard/Card4';

const ListCard4ColSel = ({ Item, onChange,ActiveTab }) => {
  const navigate = useNavigate();

  const clickNav = (value) => {
    navigate('/'+ location.pathname.split('/')[1] + '/MessageCenter/viewMSg/' + value
    );
  };
  return (
    <>
      <ListStyle>
        <Grid container>
          <Grid item xs={1} sx={{ mt: '5px' }}>
            <CheckboxImg
              name={Item.Id} value={Item.Id}
              checked={Item.isActive} onChange={onChange}
            />
          </Grid>
          <Grid item xs={11} onClick={() => clickNav(Item.NavPath)}>
            <Card4
              header={Item.text1} text1={Item.text2} text4=""
              text2={Item.text3} text3={''}
              text5={''} text6={''}
              ActiveTab={ActiveTab}
              IsRead={Item.IsRead}
            />
          </Grid>
        </Grid>
      </ListStyle>
    </>
  );
};
export default ListCard4ColSel;