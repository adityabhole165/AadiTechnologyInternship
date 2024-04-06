import { Grid, Paper, TextField, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TermwiseHeightWeightList = ({
  ItemList,
  onTextChange,
  onTextChange2,
  HeaderArray,
  IsPublishedStatus
}) => {
  const changeText1 = (value) => {
    ItemList = ItemList.map((item) => {
      return item.Id === value.Id ? { ...item, Text3: value.Value } : item;
    });
    onTextChange2(ItemList);
  };

  const changeText2 = (value) => {
    ItemList = ItemList.map((item) => {
      return item.Id === value.Id ? { ...item, Text4: value.Value } : item;
    });
    onTextChange2(ItemList);
  };

  const handleText3Change = (e, item) => {
    if (IsPublishedStatus == "0") {
      const numericValue = e.target.value.replace(/[^0-9.]/g, '');
      const parts = numericValue.split('.');

      if (parts[0].length > 3) {
        return;
      }

      if (parts[1] && parts[1].length > 3) {
        return;
      }

      changeText1({ Value: numericValue, Id: item.Text1 });
    }
  };

  const handleText4Change = (e, item) => {
    if (IsPublishedStatus == "0") {
      const numericValue = e.target.value.replace(/[^0-9.]/g, '');
      const parts = numericValue.split('.');

      if (parts[0].length > 3) {
        return;
      }

      if (parts[1] && parts[1].length > 3) {
        return;
      }

      changeText2({ Value: numericValue, Id: item.Text1 });
    }
  };

  return (
    <>
      <div>
        <TableHead>
          <TableRow sx={{
            background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white,
            display: 'flex', flexDirection: 'row', width: "1120px", justifyContent: 'space-between'
          }}>
            {HeaderArray.map((item, i) => {
              return (
                <TableCell
                  key={i}
                  sx={{ color: 'white' }} // Align headers to the left
                  align="center"
                >
                  <b>{item.Header}</b>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
      </div>
      <div>
        {ItemList.map((item) => (
          <Paper
            elevation={1}
            style={{ margin: 5, padding: 3, marginBottom: 5 }}
            key={item.Text1}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle1"
                  style={{ color: item.IsLeftStudent === '1' ? 'red' : 'inherit' }}
                >{item.Text1}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="subtitle1"
                  style={{ color: item.IsLeftStudent === '1' ? 'red' : 'inherit' }}
                >
                  {item.Text2}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  value={item.Text3}
                  variant="outlined"
                  onChange={(e) => {
                    handleText3Change(e, item);
                  }}
                  disabled={IsPublishedStatus == "1"}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  value={item.Text4}
                  variant="outlined"
                  onChange={(e) => {
                    handleText4Change(e, item);
                  }}
                  disabled={IsPublishedStatus == "1"}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    </>
  );
};

export default TermwiseHeightWeightList;
