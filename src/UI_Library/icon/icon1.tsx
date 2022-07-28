import React, { useState } from 'react';
import { ClickAwayListener, IconButton, useTheme, Typography, Container } from "@mui/material";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import {Styles} from 'src/assets/style/student-style'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

Icon1.propTypes = {
    Title: PropTypes.string,
    Subtitle: PropTypes.string,
    Note: PropTypes.string,
}

function Icon1({ Title, Subtitle, Note }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const classes = Styles();

    return (
        <>
           
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    
                   <Typography variant="body2" fontSize='0.8rem'>
                        <b>{Title}</b>  {Subtitle}
                    </Typography>
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

                            componentsProps={{
                                tooltip: {
                                  sx: {
                                   marginLeft : '70px',
                                    transform: "translate3d(15px, 0.5px, 0px) !important",
                                  }
                                }
                              }}
                            
                        >

                            <InfoTwoToneIcon type="button" onClick={handleClick} sx={{ fontSize: 20, marginTop: '-1px',backgroundColor:"#e8a0e7",borderRadius: "50%" }} />
                        </Tooltip>


                    </ClickAwayListener>
                </Box>
           
        </>
    );
}

export default Icon1;
