import { Avatar, Box, ClickAwayListener, Grid, Tooltip } from '@mui/material';
import { useState } from 'react';
import CheckboxImg from '../card/CheckboxImg';
import { ItemSize, ListStyle1 } from '../styled/CardStyle';

const CheckboxCard = ({ Item, onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const onChange = () => {
    onClick({ Id: Item.Id, isActive: !Item.isActive });
  };

  return (
    <ListStyle1>
      <Box sx={{ display: 'flex' }}>
        <CheckboxImg
          name={Item.Name}
          value={Item.Value}
          checked={Item.isActive}
          onChange={onChange}
          IsAllDeactivated={Item.IsAllDeactivated}
          IsExamSubmitted={Item.IsExamSubmitted}
        />
        {Item.IsAllDeactivated ? (
          <ItemSize>{Item.Name}</ItemSize>
        ) : (
          <>
            <Grid container xs={12}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Tooltip
                  PopperProps={{ disablePortal: true }}
                  onClose={handleClick}
                  open={open}
                  title={Item.Users}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  arrow
                  placement="right"
                  componentsProps={{
                    tooltip: { sx: { py: 0.7, width: '200px' } }
                  }}
                >
                  <ItemSize onClick={handleClick} onClickCapture={onChange}>
                    {Item.Name !== '' ? (
                      Item.Name
                    ) : (
                      <Avatar
                        alt="user.name"
                        src={
                          localStorage.getItem('SiteURL') +
                          'RITeSchool/Uploads/OnlineExamImages/' +
                          Item.path1
                        }
                        sx={{
                          width: '180px',
                          height: '160px',
                          border: '2px solid gray',
                          textAlign: 'center'
                        }}
                        variant="square"
                        aria-label="add"
                      ></Avatar>
                    )}
                  </ItemSize>
                </Tooltip>
              </ClickAwayListener>
            </Grid>
          </>
        )}
      </Box>
    </ListStyle1>
  );
};

export default CheckboxCard;
