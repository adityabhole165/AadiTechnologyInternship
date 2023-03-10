import React from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import DotLegend from 'src/libraries/summary/DotLegend';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';


function TransportCommittee() {


    const data3 = {
        PTA_Member: 'Executive Committee (School)',
        PTA: 'Executive Committee (Parent)'
      };
    
  return (
    <Container>
          <PageHeader heading={'Transport Committee'} subheading={''} />

          <Grid container>
          </Grid><Grid item xs={12}>
            <DotLegend color='info' text='Committee member associated with the section and standard divison' />
        </Grid>
        
    </Container>
  )
}

export default TransportCommittee