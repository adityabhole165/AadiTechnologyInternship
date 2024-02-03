import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Dialog, Grid, Grow, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import Card14 from '../mainCard/Card14';
import { Accordionsummary1, HeaderAcc } from '../styled/AccordianStyled';
import { ButtonPrimary } from '../styled/ButtonStyle';

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
  Book_Id,
  author,
  publisher,
  standard,
  language,
  available,
  total,
  title,
  no,
  index,
  IsForIssue,
  Collapse,
  expand,
  ClickReserve,
  AllowBookClaimForParent
}) {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const classes = Styles();
  const [open, setOpen] = React.useState(false);

  const clickParentStudent = (value) => {
    ClickReserve({ aiBookId: Book_Id, aiFlag: value });
    setOpen(false);
  };

  const clickClaim = () => {
    if (AllowBookClaimForParent) setOpen(true);
    else clickParentStudent(0);
  };
  return (
    <>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 0' }}
        {...(checked ? { timeout: 1000 } : {})}
      >
        <Accordion
          className={classes.background}
          expanded={expand === index}
          onChange={Collapse(index)}
          elevation={0}
          disableGutters
          sx={{ mb: '10px' }}
        >
          <Accordionsummary1
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ background: `${theme.colors.gradients.pink1}` }}
          >
            <HeaderAcc color={expand === index ? 'secondary' : ''}>
              <b>Book Title</b> : {title}
              <Box sx={{ display: 'flex' }}>
                <b>Available</b> : ({available}/{total})
                {available === 0 && (
                  <Typography
                    onClick={clickClaim}
                    sx={{ color: '#628def', ml: '70px' }}
                  >
                    Claim{' '}
                  </Typography>
                )}
                <Dialog
                  open={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                  PaperProps={{
                    sx: { position: 'fixed', top: 190, m: 0, p: 1 }
                  }}
                >
                  <Typography>Claim this book for -- </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ButtonPrimary
                        onClick={() => {
                          clickParentStudent(0);
                        }}
                      >
                        {' '}
                        Student
                      </ButtonPrimary>
                    </Grid>
                    <Grid item xs={6}>
                      <ButtonPrimary
                        onClick={() => {
                          clickParentStudent(1);
                        }}
                      >
                        {' '}
                        Parent
                      </ButtonPrimary>
                    </Grid>
                  </Grid>
                </Dialog>
              </Box>
            </HeaderAcc>
          </Accordionsummary1>
          <AccordionDetails>
            <Card14
              Text1={author}
              Text2={publisher}
              Text3={standard}
              Text4={language}
              Text5={available}
              Text6={total}
              Text7={no}
            />
          </AccordionDetails>
        </Accordion>
      </Grow>
    </>
  );
}
export default Accordion4;
