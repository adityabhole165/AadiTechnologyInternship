import React from 'react'
import { Grid, Avatar } from '@mui/material';

import ReplayIcon from '@mui/icons-material/Replay';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
function CardMessDeleteButtons({ TrashDelete, clickReset, activeTab, ConfirmUndelete, DeletePermanent, clickDelete }) {
    return (
        <div>
            <Grid container spacing={0.5} sx={{ mb: "10px" }}>
                {
                activeTab == 'Sent' ?
                    <Grid item xs={5.5} sm={6} md={3} lg={2} >
                        <ButtonPrimary
                            onClick={activeTab == 'Sent' && DeletePermanent}
                            endIcon={<HighlightOffIcon />} fullWidth
                        >Delete From Everyone
                        </ButtonPrimary>
                    </Grid> :
                    activeTab == 'Trash' &&
                    <Grid item xs={5.5} sm={6} md={3} lg={1.5} >
                        <ButtonPrimary
                            onClick={ConfirmUndelete}
                            endIcon={<Avatar sx={{ width: 25, height: 20, ml: "-8px", filter: " brightness(0) invert(1) " }}
                                src={
                                    "/imges/unDelete.png"
                                }
                            />} fullWidth
                        >Un-Delete
                        </ButtonPrimary></Grid>
                }

                <Grid item xs={3.5} sm={3} md={1.5} lg={1}>
                    <ButtonPrimary fullWidth
                        onClick={activeTab == 'Trash' ? TrashDelete : clickDelete}
                        endIcon={<Avatar sx={{ width: 20, height: 20, ml: "-8px", filter: " brightness(0) invert(1) " }}
                            src={
                                "/imges/delete.png"
                            }
                        />}
                    >
                        Delete
                    </ButtonPrimary>
                </Grid>
                <Grid item xs={3} sm={3} md={1.5} lg={1}>
                    <ButtonPrimary fullWidth
                        onClick={clickReset}
                        endIcon={<ReplayIcon />}
                        color="secondary"
                    >
                        Reset
                    </ButtonPrimary>
                </Grid>
            </Grid>
        </div>
    )
}

export default CardMessDeleteButtons