import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { Box, Container, Grow, Grid, List, useTheme } from '@mui/material';
import {CardDetail1,CardDetail3,ListStyle,CardWrapper} from '../styled/CardStyle';

Accordion4.propTypes = {
  Bookk: PropTypes.array,
  author: PropTypes.string,
  publisher: PropTypes.string,
  standard: PropTypes.string,
  language: PropTypes.string,
  available: PropTypes.number,
  total: PropTypes.number,
  title: PropTypes.string,
  no: PropTypes.string
};

function Accordion4({
  Bookk,
  author,
  publisher,
  standard,
  language,
  available,
  total,
  title,
  no
}) {
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [checked, setChecked] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = Styles();
  return (
    <>
      <Grid item xs={12} container>
        <Container>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <div>
              <Accordion
                className={classes.background}
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    background: `${theme.colors.gradients.pink1}`,
                    boxShadow: '6px 6px 8px  gray !important',
                    mb: 1,
                    color: 'black',
                    fontWeight: 'bold'
                  }}
                >
                  Accession No : {no}
                  <br />
                  Book Title : {title}
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderRadius: 1,
                    
                    mb: 1
                  }}
                >
                  <ListStyle>
                    <CardWrapper>
                      <CardDetail1> Author:</CardDetail1>
                      <CardDetail3>{author}</CardDetail3>
                    </CardWrapper>
                    <CardWrapper>
                      <CardDetail1> Publisher:</CardDetail1>
                      <CardDetail3>{publisher}</CardDetail3>
                    </CardWrapper>
                    <CardWrapper>
                      <CardDetail1> Standards:</CardDetail1>
                      <CardDetail3> {standard}</CardDetail3>
                    </CardWrapper>
                    <CardWrapper>
                      <CardDetail1> Standards:</CardDetail1>
                      <CardDetail3> {language}</CardDetail3>
                    </CardWrapper>
                    <CardWrapper>
                      <CardDetail1> Available:</CardDetail1>
                      <CardDetail3> {available}</CardDetail3>
                    </CardWrapper>
                    <CardWrapper>
                      <CardDetail1> Total:</CardDetail1>
                      <CardDetail3> {total}</CardDetail3>
                    </CardWrapper>
                   
                  </ListStyle>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grow>
        </Container>
      </Grid>
    </>
  );
}
export default Accordion4;
