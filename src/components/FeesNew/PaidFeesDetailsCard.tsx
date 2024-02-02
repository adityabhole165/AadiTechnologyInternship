import { Box, Grid, useTheme } from '@mui/material';
import { CardStyle1 } from 'src/libraries/styled/CardStyle';
import CheckBox from './CheckBox';

const PaidFeesDetailsCard = ({
  item,
  onChange,
  FeesCard,
  IsNotDisabled = true,
  InternalOrSchool
}) => {
  const theme = useTheme();
  return (
    <div>
      <CardStyle1
        sx={{
          background: item.IsActive
            ? `${theme.colors.gradients.selectedlistColor}`
            : `${theme.colors.gradients.pink1}`
        }}
      >
        <Grid container>
          <Grid item xs={1} display={'flex'} mt={0.8}>
            <Box ml={0.5}>
              <CheckBox
                item={item}
                onChange={onChange}
                IsNotDisabled={IsNotDisabled}
                InternalOrSchool={InternalOrSchool}
              />
            </Box>
          </Grid>
          <Grid item xs={11}>
            <FeesCard item={item} />
          </Grid>
        </Grid>
      </CardStyle1>
    </div>
  );
};

export default PaidFeesDetailsCard;
