import React, { useState } from 'react';
import { ClickAwayListener, IconButton, Typography, Container } from "@mui/material";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { Styles } from 'src/assets/style/student-style'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { styled, useTheme, Grid, MenuItem, Divider } from '@mui/material';


Icon3.propTypes = {
    Note: PropTypes.string,
}

function Icon3({ Note }) {

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
          margin-top: -${theme.spacing(0.1)};
      `
    );

    const classes = Styles();

    return (
        <>
            <Container>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, marginTop: '-22px' }}>
                    <Typography variant="body2" fontSize='15px'>
                        {/* <DotLegend className={classes.Listfont1}
                            style={{ background: 'darkmagenta', marginLeft: '9px', marginBottom: "-2px" }}
                        /><small><b>Description</b></small> */}
                        <br />
                    </Typography> <br />
                
                    <ClickAwayListener onClickAway={handleClickAway}>

                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
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
                                        transform: "translate3d(20px, 14.5px, 0px) !important",
                                        marginTop: '-10px',

                                    }
                                }
                            }}

                        >

                            <InfoTwoToneIcon type="button" onClick={handleClick} sx={{ fontSize: 20, marginTop: '-94px', backgroundColor: "#e8a0e7", borderRadius: "50px" }} />
                        </Tooltip>


                    </ClickAwayListener>
                </Box>
            </Container>
        </>
    );
}

export default Icon3;
