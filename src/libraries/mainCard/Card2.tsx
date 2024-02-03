import { Container, Grid, useTheme } from '@mui/material';
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
  const width = 12 / rowsCol;

  const theme = useTheme();

  return (
    <Container>
      <CardStyle>
        <CardHeading>{heading}</CardHeading>
        <Grid container spacing={-0.1}>
          {items.map(({ Icon, ...item }, index) => (
            <Grid item xs={width} key={index}>
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
            </Grid>
          ))}
        </Grid>
      </CardStyle>
    </Container>
  );
}

export default Card2;
