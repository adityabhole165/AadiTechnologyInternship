import { Grid } from '@mui/material';
import SelectedHomeworkDate from './SelectedHomeworkDate';

function SelectedHomework({ itemList, clickItem }) {
  const onClick = (value) => {
    itemList = itemList.map((item) => {
      return item.Id === value.Id ? value : { ...item, IsActive: false };
    });
    clickItem(itemList);
  };
  return (
    <>
      <Grid container spacing={2}>
        {itemList.map((item, i) => (
          <Grid item xs={2} sx={{ textAlign: 'center' }} key={i}>
            <SelectedHomeworkDate item={item} clickItem={onClick} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default SelectedHomework;
