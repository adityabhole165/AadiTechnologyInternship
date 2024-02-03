import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { Box, ClickAwayListener, Tooltip } from '@mui/material';
import { useState } from 'react';
const IconFile = ({ FileValidationNote }) => {
  const [open, setOpen] = useState<any>(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Tooltip
            PopperProps={{ disablePortal: true }}
            onClose={handleClick}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={FileValidationNote}
            arrow
            placement="left"
            componentsProps={{
              tooltip: {
                sx: {
                  marginLeft: '70px',
                  mt: 0.5,
                  transform: 'translate3d(17px, 0.5px, 0px) !important'
                }
              }
            }}
          >
            <InfoTwoToneIcon
              type="button"
              onClick={handleClick}
              fontSize="small"
              sx={{ color: 'navy' }}
            />
          </Tooltip>
        </ClickAwayListener>
      </Box>
    </div>
  );
};

export default IconFile;
