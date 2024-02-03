import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  Grow,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import ClaimedCard from '../card/ClaimedCard';
import ClaimedCard2 from '../card/ClaimedCard2';
import { Accordionsummary1, HeaderAcc } from '../styled/AccordianStyled';
function Accordian1({ expanded, handleChange, index, items, confirmsg }) {
  const [checked, setChecked] = useState(true);
  const UserId = sessionStorage.getItem('Id');
  const classes = Styles();
  const theme = useTheme();
  return (
    <div>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 0' }}
        {...(checked ? { timeout: 1000 } : {})}
      >
        <Accordion
          className={classes.background}
          expanded={expanded === index}
          onChange={handleChange(index)}
          elevation={0}
          disableGutters
        >
          <Accordionsummary1
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              background:
                items.UserId == sessionStorage.getItem('Id')
                  ? '#c2dbff'
                  : `${theme.colors.gradients.pink1}`
            }}
          >
            <HeaderAcc color={expanded === index ? 'secondary' : ''}>
              <b>Book Title : </b> {items.Book_Title}
              <Typography>
                <b>User Name : </b> {items.UserName}
              </Typography>
            </HeaderAcc>
          </Accordionsummary1>
          <AccordionDetails>
            {items.UserId == sessionStorage.getItem('Id') ? (
              <ClaimedCard
                Text1={items.ReservationDate}
                Text2={items.IsForParent}
                confirmsg={confirmsg}
              />
            ) : (
              <ClaimedCard2 items={items} />
            )}
          </AccordionDetails>
        </Accordion>
      </Grow>
    </div>
  );
}

export default Accordian1;
