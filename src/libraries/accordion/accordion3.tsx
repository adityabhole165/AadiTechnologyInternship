import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grow, useTheme } from '@mui/material';
import { GetStudentExamResult } from 'src/interfaces/Student/ProgressReport';
import { Styles } from 'src/assets/style/student-style';
import Block from 'src/libraries/accordion/block';

Accordions3.propTypes = {
  Exam: PropTypes.string,
  Data: PropTypes.array,
  expand: PropTypes.any
};

function Accordions3({ Exam, Data, index, Collapse, expand }) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();

  return (
    <div>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '1 1 1' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Accordion
            className={classes.background}
            expanded={expand === index}
            onChange={Collapse(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                color: 'white',
                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                mb: 1
              }}
            >
              <Typography
                sx={{
                  color:
                    expand === index
                      ? `${theme.colors.gradients.accordianHeadercolor}`
                      : 'black'
                }}
              >
                <b>{Exam}</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                borderRadius: 1,
                mb: -1
              }}
            >
              {Data.map((list: GetStudentExamResult, index) => {
                if (Exam === list.Exam) {
                  return (
                    <>
                      <Block
                        Data={Data}
                        ExamId={list.ExamId}
                        Percentage={list.Percentage}
                        Rank={list.Rank}
                        GrandTotal={list.GrandTotal}
                        SubjectTotalMarks={list.SubjectTotalMarks}
                        Grade={list.Grade}
                      />
                    </>
                  );
                }
              })}
            </AccordionDetails>
          </Accordion>
        </Grow>
      </Container>
    </div>
  );
}

export default Accordions3;
