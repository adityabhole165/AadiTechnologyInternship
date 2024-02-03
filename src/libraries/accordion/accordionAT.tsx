import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography
} from '@mui/material';

const AccordionAT = ({ Item }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={'^'}>
          <Typography variant="body2">
            {Item.RollNo}. {Item.Header}
          </Typography>
          <b>Present Days:</b>{' '}
          <Typography>
            {' '}
            {Item.Presentdays} <b>Percentage:</b>
            {Item.Percentage}{' '}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography></Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionAT;
