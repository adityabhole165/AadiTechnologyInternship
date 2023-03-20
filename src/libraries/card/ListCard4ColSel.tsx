import { Grid, Grow } from '@mui/material';
import CheckboxImg from './CheckboxImg';
import { ListStyle } from '../styled/CardStyle';
import { useNavigate } from 'react-router-dom';
import Card4 from 'src/libraries/mainCard/Card4';
import { useState } from 'react';

const ListCard4ColSel = ({ Item, onChange,ActiveTab }) => { 
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true)
  const clickNav = (value) => {
    navigate('/'+ location.pathname.split('/')[1] + '/MessageCenter/viewMSg/' + value
    );
  };
  return (
    <>
      <Grow in={checked}
            style={{ transformOrigin: '0 0 1' }}
            {...(checked ? { timeout: 1500 } : {})}
          >
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
              IsSchedule={Item.IsSchedule}
              HasReadReceipt={Item.HasReadReceipt}
              RequestReadReceipt={Item.RequestReadReceipt}
              IsAttachmentExist={Item.IsAttachmentExist}
            />
          </Grid>
        </Grid>
      
      </ListStyle>
      </Grow>
    </>
  );
};
export default ListCard4ColSel;