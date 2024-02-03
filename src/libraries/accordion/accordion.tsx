import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Grow, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import List1 from '../mainCard/List1';

ControlledAccordions.propTypes = {
  Days: PropTypes.string,
  Data: PropTypes.array,
  weekdays: PropTypes.string,
  expand: PropTypes.any,
  index: PropTypes.any
};

function ControlledAccordions({ Days, Data, index, Collapse, expand }) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();

  const Data1 = Data.filter((data1) => data1.WeekDay === Days).map(
    (item, index) => {
      return {
        id: index,
        header: 'Lec no.' + item.LectureNumber,
        text3: item.Subject,
        text2: '',
        text1: '',
        backgroundColor: '#c8dccb',
        mx: '-15px'
      };
    }
  );

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
              expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                color: 'white',
                boxShadow: '6px 6px 8px  gray !important'
              }}
              className={classes.ListStyle}
            >
              <Typography sx={{ color: 'black' }}>
                <b>{Days}</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ borderRadius: 1, mb: '10px' }}>
              {<List1 items={Data1}></List1>}
            </AccordionDetails>
          </Accordion>
        </Grow>
      </Container>
    </div>
  );
}

export default ControlledAccordions;
