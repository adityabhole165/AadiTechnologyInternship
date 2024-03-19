import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, Link } from '@mui/material';
import { ButtonPrimary } from '../styled/ButtonStyle';
// ... (your other imports)
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
function Adddailyloglist({
  ItemList,
  clickView,
  HeaderArray,
  clickEdit,
  clickDelete,
  clickpublish,
  ClickHeader
}) {
  const clickHeader = (value) => {
    if (value != undefined) {
      HeaderArray = HeaderArray.map((Item) => {
        return Item.SortOrder == undefined ? Item :
          { ...Item, SortOrder: Item.SortOrder == " Asc" ? " Desc" : " Asc" }
      })
      ClickHeader(HeaderArray)
    }
  }


  return (
    <div>
      <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: (theme) => theme.colors.primary.main,
                color: (theme) => theme.palette.common.white
              }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    color: (theme) => theme.palette.common.white,
                    py: 1,
                  }}

                  onClick={() => { clickHeader(item.Id) }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}>
                    <b>{item.Header}</b>
                    {item.SortOrder != undefined ?
                      item.SortOrder == " Desc" ?
                        < ArrowDropDownCircleIcon/> :
                        <ArrowCircleUpIcon /> :
                      null
                    }
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow key={item.Id}>
                <TableCell
                  sx={{ textTransform: 'capitalize', py: 0.5 }}

                >

                  {item.Text1}
                </TableCell>

                <TableCell
                  sx={{ textTransform: 'capitalize', py: 0.5 }}

                >
                  <Link href={''} onClick={() => clickView(item.Text2)}>
                    view log
                  </Link>
                </TableCell>

                <TableCell
                  sx={{ textTransform: 'capitalize', py: 0.5 }}

                >
                  <ButtonPrimary onClick={() => clickpublish(item.Id,item.Text3)} sx={{ minWidth: '100px' }}>
                    {item.Text3 === 'False' ? ' PUBLISH' : '  UNPUBLISH'}
                  </ButtonPrimary>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text3 === 'False' ? (
                    <EditTwoTone
                      onClick={() => {
                        clickEdit(item.Id);
                      }}
                    />
                  ) : null}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text3 === 'False' ? (
                    <DeleteTwoTone onClick={() => clickDelete(item.Id)} />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

export default Adddailyloglist;
