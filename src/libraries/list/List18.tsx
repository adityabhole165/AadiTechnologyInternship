import ScheduleIcon from '@mui/icons-material/Schedule';
import { Container, Grow, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,
  ListStyle
} from '../styled/CardStyle';

List18.propTypes = {
  Subject: PropTypes.string,
  DisplayText: PropTypes.string,
  Date: PropTypes.string,
  Time: PropTypes.string,
  Index: PropTypes.any,
  ScheduledSMSList: PropTypes.array
};

function List18({
  Subject,
  ScheduledSMSList,
  DisplayText,
  Date: date,
  Time,
  Index
}) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();

  const CurrentDate = new Date();

  const DateTomorrow = new Date(CurrentDate);

  const CurrentDay = String(CurrentDate.getDate()).padStart(2, '0');
  const CurrentMonth = CurrentDate.toLocaleString('en-US', { month: 'short' });
  const CurrentDateInStringFormat = CurrentDay + ' ' + CurrentMonth;

  return (
    <>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <ListStyle
            className={
              ' ' + (Index === 0 ? classes.colorpta1 : classes.colorpta2)
            }
            sx={{
              background:
                date == CurrentDateInStringFormat
                  ? null
                  : `${theme.colors.gradients.pink1}`
            }}
          >
            <CardDetail1>{Subject}</CardDetail1>

            <CardDetail>
              <CardDetail2>{DisplayText}</CardDetail2>
              <CardDetail2>
                {date == CurrentDateInStringFormat ? (
                  <ScheduleIcon
                    sx={{ ml: '-40px', mb: '-5px', mr: '18px', height: '18px' }}
                  />
                ) : null}
                {Time} {date}
              </CardDetail2>
            </CardDetail>
          </ListStyle>
        </Grow>
      </Container>
    </>
  );
}

export default List18;
