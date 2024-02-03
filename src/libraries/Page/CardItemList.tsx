import { Box, Typography } from '@mui/material';
import { ListStyle } from '../styled/CardStyle';

const CardItemList = ({ CardItemList }) => {
  return (
    <div>
      {CardItemList.map((Item, i) => {
        return (
          <div key={i}>
            <ListStyle>
              <Box>
                <Typography>
                  <b>Subject : </b>
                  {Item.Text1}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>
                  <b>Total Marks : </b>
                  {Item.Text2}
                </Typography>
                <Typography>
                  {' '}
                  <b>Percentage : </b>
                  {Item.Text3}
                </Typography>
              </Box>
            </ListStyle>
          </div>
        );
      })}
    </div>
  );
};

export default CardItemList;
