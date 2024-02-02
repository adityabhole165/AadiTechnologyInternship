import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {
  ClickAwayListener,
  Container,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';

Icon2.propTypes = {
  Note: PropTypes.string
};

function Icon2({ Note }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const theme = useTheme();

  const DotLegend = styled('span')(
    ({ theme }) => `
          border-radius: 22px;
          width: ${theme.spacing(1.5)};
          height: ${theme.spacing(1.5)};
          display: inline-block;
          margin-right: ${theme.spacing(1)};
          margin-top: -${theme.spacing(0)};
      `
  );

  const classes = Styles();

  return (
    <>
      <Container>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginRight: -3, mb: 2, marginTop: '-22px' }}
        >
          <Typography variant="body2" fontSize="15px">
            {/* <DotLegend className={classes.Listfont1}
                            style={{ background: 'darkmagenta', marginLeft: '9px', marginBottom: "-2px" }}
                        /><small><b>Description</b></small> */}
            <br />
          </Typography>{' '}
          <br />
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
              // alignItem="right"

              componentsProps={{
                tooltip: {
                  sx: {
                    marginLeft: '70px',
                    transform: 'translate3d(15px, 14.5px, 0px) !important',
                    marginTop: '-30px'
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
                  borderRadius: '50px'
                }}
              />
            </Tooltip>
          </ClickAwayListener>
        </Box>
      </Container>
    </>
  );
}

export default Icon2;
