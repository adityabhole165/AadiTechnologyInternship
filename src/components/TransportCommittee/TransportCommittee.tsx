import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import PageHeader from 'src/libraries/heading/PageHeader';
import DotLegend from 'src/libraries/summary/DotLegend';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import AccordionTrC from 'src/libraries/accordion/AccordionTrc';


const header = {
  PTA_Member: 'Executive Committee (School)',
  PTA: 'Executive Committee (Parent)'
}



function TransportCommittee() {
  
  const Teacher= [{id:"1",text1:"Ms. Nazneen A. Shaikh", text2:"principle" }]
  const Data = Teacher.map((item, index) => {
    return {
      id: item.id,
      text1: item.text1,
      text2: item.text2,
      // backgroundColor: item.RealatedSection === '2' ? 'info' : '',
      // RelatedSection: item.RealatedSection === '2' ? '2' : '0',
    
    }
  });
 
 
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <PageHeader heading={'Transport Committee'} subheading={''} />

      <Grid container>
      </Grid><Grid item xs={12}>
        <DotLegend color='info' text='Committee member associated with the section and standard divison' />
      </Grid>
      <br />

      <AccordionTrC
        Name='panel1'
        header={header.PTA_Member}
        Data={Data}
        isExpanded={expanded === 'panel1'}
        handleChange={handleChange('panel1')}
      />
      

      <AccordionTrC
        Name='panel2'
        header={header.PTA}
        Data={Data}
        isExpanded={expanded === 'panel2'}
        handleChange={handleChange('panel2')}
      />
    </Container>
  )
}

export default TransportCommittee