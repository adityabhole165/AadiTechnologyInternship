import React from 'react'
import { Grid } from '@mui/material';
import MCButtons from 'src/libraries/button/MCButtons';
import SearchIcon from '@mui/icons-material/Search';
function CardMessage({activeTab,clickSearchIcon, clickTab}) {
  return (
    <div>
   
      <Grid container  >
                <Grid item xs={10} sm={12}>
                  <MCButtons
                    activeTab={activeTab}
                    clickTab={clickTab}
                  ></MCButtons>
                </Grid>
                <Grid item xs={2} md={6} display={{ xs: "block", sm: "none" }} sx={{ textAlign: 'center' }}>
                  <SearchIcon
                    fontSize="large"
                    sx={{

                      marginTop: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={clickSearchIcon}
                  />
                </Grid>
                </Grid>
    
    </div>
  )
}

export default CardMessage