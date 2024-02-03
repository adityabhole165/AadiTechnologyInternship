import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { ClickAwayListener, Tooltip } from '@mui/material';
import { useState } from 'react';

function Icon1({ Note }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Tooltip
          PopperProps={{
            disablePortal: true
          }}
          onClose={handleClick}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={Note}
          arrow
          placement="left"
          componentsProps={{
            tooltip: {
              sx: {
                marginLeft: '70px',
                transform: 'translate3d(15px, 0.5px, 0px) !important'
              }
            }
          }}
        >
          <InfoTwoToneIcon
            type="button"
            onClick={handleClick}
            sx={{
              fontSize: 20,
              marginTop: '-1px',
              backgroundColor: '#e8a0e7',
              borderRadius: '50%'
            }}
          />
        </Tooltip>
      </ClickAwayListener>
    </>
  );
}

export default Icon1;
