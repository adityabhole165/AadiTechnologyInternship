import { Grid } from '@mui/material';
import ButtonHomework from 'src/libraries/buttons/HomeworkButton';

function HomeworkCard({ ItemList, clickItem }) {
  const onClick = (value) => {
    ItemList = ItemList.map((item) => {
      return item.Id === value.Id ? value : { ...item, IsActive: false };
    });
    clickItem(ItemList);
  };

  return (
    <Grid container spacing={1}>
      {ItemList.map((data, i) => {
        return (
          <Grid item xs={4} key={i}>
            <ButtonHomework Item={data} ClickItem={onClick}></ButtonHomework>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default HomeworkCard;
