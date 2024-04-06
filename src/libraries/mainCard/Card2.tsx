import { Box, Grid, useTheme } from '@mui/material';
import Card3 from 'src/libraries/mainCard/Card3';
import { CardHeading, CardStyle } from '../styled/DashboardStyled';

function Card2({
  items,
  heading,
  rowsCol,
  Messagecount,
  ExternalLibrarySite = ''
}) {
  //rowsCol
  const spread = 12 / rowsCol;

  const theme = useTheme();

  return (
    <Box sx={{ px: 2 }}>
      <CardStyle>
        <CardHeading>{heading}</CardHeading>
        <Grid container spacing={2}>
          {items.map(({ Icon, ...item }, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card3
                  color={items.color}
                  text1={item.Text1}
                  text2={item.Text2}
                  icon={item.index}
                  Link1={item.Link}
                  ImageUrl={item.ImageUrl}
                  iconColor={item.iconColor}
                  Messagecount={Messagecount}
                  isAvtar="true"
                  opacityLevel="1"
                  ExternalLibrarySite={ExternalLibrarySite}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardStyle>
    </Box>
  );
}

export default Card2;
