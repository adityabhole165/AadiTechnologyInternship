import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Link, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function SubjectList1({
  ItemList,
  HeaderArray,
  onChange,
  clickchange,
  clickTitle
}) {
  const IsCheckAll = () => {
    let returnValue = true;
    ItemList.map((item) => {
      if (!item.IsActive) returnValue = false;
    });
    return returnValue;
  };

  const clickAll = () => {
    let li = ItemList.map((Item) => {
      return { ...Item, IsActive: !IsCheckAll() };
    });
    clickchange(li);
  };

  const onClick = (value) => {
    ItemList = ItemList.map((item) => {
      return item.Id === value ? { ...item, IsActive: !item.IsActive } : item;
    });
    onChange(ItemList);
  };

  return (
    <>
      <Typography variant={"h4"} my={1}>
        Homework assigned for other subjects :
      </Typography>
      <TableContainer component={Box} sx={{
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
      }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: (theme) => theme.colors.primary.main }}
            >
              {/* <TableCell sx={{ textTransform: 'capitalize' }} >
                                <Checkbox checked={IsCheckAll()} onClick={clickAll}></Checkbox>

                            </TableCell> */}

              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    color: (theme) => theme.palette.common.white
                  }}

                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Checkbox
                    checked={item.IsActive}
                    onChange={() => {
                      onClick(item.Id);
                    }}
                  />
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text2}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  <Link href={''} onClick={() => clickTitle(item.Id)}>
                    {item.Text3}
                  </Link>
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text5 === 'True' ? <CheckIcon /> : <ClearIcon color={"error"} />}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text6}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SubjectList1;
