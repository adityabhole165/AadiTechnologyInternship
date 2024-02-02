import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grow, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Styles } from 'src/assets/style/student-style';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import List1 from '../mainCard/List1';
import { Accordionsummary } from '../styled/AccordianStyled';
const AccordionPTA = ({ name, header, Data, isExpanded, handleChange }) => {
  const theme = useTheme();
  const classes = Styles();

  return (
    <>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: 1000 }}
      >
        <Accordion
          className={classes.background}
          expanded={isExpanded}
          onChange={handleChange}
          elevation={0}
          disableGutters
        >
          <Accordionsummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              background: `${theme.colors.gradients.pink1}`,
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
              mb: 1,
              color: isExpanded
                ? `${theme.colors.gradients.accordianHeadercolor}`
                : ''
            }}
          >
            <b>{header}</b>
          </Accordionsummary>

          <AccordionDetails sx={{ borderRadius: 1, mb: -1 }}>
            {Data?.length == 0 ? (
              <ErrorMessages Error={'No records found'} />
            ) : (
              <List1 items={Data} />
            )}
          </AccordionDetails>
        </Accordion>
      </Grow>
    </>
  );
};

export default AccordionPTA;
