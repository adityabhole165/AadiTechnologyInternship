import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Grid, Grow, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardMessage from '../mainCard/CardMessage';
import { ListStyle } from '../styled/CardStyle';
import CheckboxImg from './CheckboxImg';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const ListCard4ColSel = ({ Item, onChange, ActiveTab, DeleteDraft }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  return (
    <>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 1' }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <ListStyle>
          <Grid container>
            <Grid item xs={1} sm={0.5} sx={{ mt: '5px' }}>
              {ActiveTab !== 'Draft' ? (
                <CheckboxImg
                  name={Item.Id}
                  value={Item.Id}
                  checked={Item.isActive}
                  onChange={onChange}
                />
              ) : (
                <Tooltip
                  title="Delete">
                  <DeleteForeverIcon
                    onClick={() => DeleteDraft(Item.Id)}
                    sx={{
                      color: '#38548A',
                      cursor: 'pointer',
                      //  backgroundColor: grey[500],
                      '&:hover': {
                        color: 'red',
                        backgroundColor: red[100]
                      }
                    }}
                  />
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={11} sm={11}>
              <CardMessage
                header={Item.text1}
                text1={Item.text2}
                text2={Item.text3}
                text3={Item.text4}
                ActiveTab={ActiveTab}
                IsRead={Item.IsRead}
                IsSchedule={Item.IsSchedule}
                HasReadReceipt={Item.HasReadReceipt}
                RequestReadReceipt={Item.RequestReadReceipt}
                IsAttachmentExist={Item.IsAttachmentExist}
                DetailsId={Item.DetailsId}
                NavPath={Item.NavPath}
              />
            </Grid>
          </Grid>
        </ListStyle>
      </Grow>
    </>
  );
};
export default ListCard4ColSel;
