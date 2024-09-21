import { Box, Table, TableBody, TableContainer, TextField, Typography } from '@mui/material';
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

      if (parts[1] && parts[1].length > 2) {
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

      if (parts[1] && parts[1].length > 2) {
        return;
      }

      changeText2({ Value: numericValue, Id: item.Text1 });
    }
  };

  return (
    <>

      <TableContainer component={Box} sx={{
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
      }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
            >


              {HeaderArray.map((item, i) => (
                <TableCell
                  // size={"small"}
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    color: (theme) => theme.palette.common.white
                  }}
                  align={item.align ? item.align : 'left'}
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i}>


                <TableCell
                  size={"small"} sx={{ textTransform: 'capitalize' }} >
                  <Typography variant="subtitle1"
                    style={{ color: item.IsLeftStudent === '1' ? 'red' : 'inherit' }}
                  >{item.Text1}</Typography>
                </TableCell>

                <TableCell
                  size={"small"} sx={{ textTransform: 'capitalize' }} >
                  <Typography
                    variant="subtitle1"
                    style={{ color: item.IsLeftStudent === '1' ? 'red' : 'inherit' }}
                  >
                    {item.Text2}
                  </Typography>
                </TableCell>

                <TableCell
                  size={"small"} sx={{ textTransform: 'capitalize' }} >
                  <TextField
                    size={"small"}
                    id="outlined-basic"
                    value={item.Text3}
                    variant="outlined"
                    onChange={(e) => {
                      handleText3Change(e, item);
                    }}
                    disabled={IsPublishedStatus == "1"}
                  />
                </TableCell>


                <TableCell
                  size={"small"} sx={{ textTransform: 'capitalize' }} >
                  <TextField
                    size={"small"}
                    id="outlined-basic"
                    value={item.Text4}
                    variant="outlined"
                    onChange={(e) => {
                      handleText4Change(e, item);
                    }}
                    disabled={IsPublishedStatus == "1"}
                  />

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TermwiseHeightWeightList;