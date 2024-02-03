import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Grid, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { AccordianHeader, Header1 } from '../styled/AccordianStyled';

const Card36 = ({
  Id,
  Name,
  expand,
  isActive,
  Rank,
  Percentage,
  Rollno,
  Presentdays,
  IsStudent
}) => {
  let isThirdAbove = false;
  if (IsStudent) {
    const arr = ['Number1.gif', 'Number2.gif', 'Number3.gif'];
    arr.map((item) => {
      if (Rank.indexOf(item) > 0) isThirdAbove = true;
    });
  } else isThirdAbove = true;

  const theme = useTheme();

  return (
    // <ListStyle color={isActive ? 'red' : ''}>
    <AccordianHeader
      onClick={() => {
        expand(Id);
      }}
      color={isActive ? 'red' : ''}
      pl={isActive ? 0.5 : null}
    >
      <Grid container>
        {isThirdAbove ? (
          <Grid item xs={1}>
            <img
              src={
                localStorage.getItem('SiteURL') + '/' + Rank.replace('~/', '')
              }
              width={25}
              height={30}
              style={{ marginTop: '10px' }}
            />
          </Grid>
        ) : (
          <Grid item xs={1}>
            <Avatar
              variant="square"
              sx={{
                width: 25,
                height: 33,
                mt: '8px',
                border: '1px solid orange'
              }}
            ></Avatar>
          </Grid>
        )}

        <Grid item xs={9} sx={{ color: 'black' }}>
          <Header1>
            {Rollno + '.' + ' ' + ' '} {Name}{' '}
          </Header1>
        </Grid>
        <Grid item xs={1} sx={{ ml: '20px' }}>
          {isActive ? (
            <ExpandLessIcon sx={{ color: 'black' }} />
          ) : (
            <ExpandMoreIcon sx={{ color: 'black' }} />
          )}
        </Grid>

        <Grid item xs={1} />
        <Grid item xs={5} sx={{ color: 'black' }}>
          <Box sx={{ mr: '5px', mt: '-15px', ml: '6px' }} fontSize={'12px'}>
            <b> Present days:</b> {Presentdays}
          </Box>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            float: 'right',
            fontSize: '12px',
            color: 'black',
            mt: '-15px',
            ml: '20px'
          }}
        >
          <b>Percentage:</b> {Percentage + '%'}
        </Grid>
      </Grid>
    </AccordianHeader>
    // </ListStyle>
  );
};
export default Card36;
