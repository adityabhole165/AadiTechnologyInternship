import Cancel from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { Box, Link, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';

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
     
      <TableContainer component={Box} sx={{
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
      }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
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
                <TableCell>
                  <Checkbox
                    checked={item.IsActive}
                    onChange={() => {
                      onClick(item.Id);
                    }}
                  />
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text10} 
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                <Link href={''} onClick={() => clickTitle(item.Id)}>
                    {item.Text2}
                  </Link>
                </TableCell>
               

               
                <TableCell sx={{ textTransform: 'capitalize' }} align='center'>
                  {item.IsPublished === 'True' ? <CheckCircle color={"success"} /> : <Cancel color={"error"} />}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {getDateMonthYearFormatted(item.Text6)}
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