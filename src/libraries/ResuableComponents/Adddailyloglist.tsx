import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, IconButton, Link } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ButtonPrimary } from '../styled/ButtonStyle';
// ... (your other imports)
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { green, red } from '@mui/material/colors';
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
                backgroundColor: (theme) => theme.colors.secondary.main,
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
                    justifyContent: item?.align ? 'center' : 'flex-start'
                  }}>
                    <b>{item.Header}</b>
                    {item.SortOrder != undefined ?
                      item.SortOrder == " Desc" ?
                        < ArrowDropDownCircleIcon /> :
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
                  sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' }}

                >

                  {item.Text1}
                </TableCell>

                <TableCell
                  sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' }}

                >
                  <Link href={''} onClick={() => clickView(item.Text2)}>
                    view log
                  </Link>
                </TableCell>

                <TableCell
                  sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' }}

                >
                  <ButtonPrimary
                    style={{ backgroundColor: item.Text3 === 'False' ? green[500] : red[500] }}
                    onClick={() => clickpublish(item.Id, item.Text3)} sx={{ minWidth: '10px', marginLeft: '40px' }}>
                    {item.Text3 === 'False' ? <PublishedWithChangesIcon /> : <UnpublishedIcon />
                    }
                  </ButtonPrimary>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="center">
                  {item.Text3 === 'False' ? (
                    <IconButton
                      onClick={() => clickEdit(item.Id)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'lightgrey' }
                      }}
                    ><EditTwoTone /></IconButton>
                  ) : null}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="center">
                  {item.Text3 === 'False' ? (
                    <IconButton
                      onClick={() => clickDelete(item.Id)}
                      sx={{
                        color: '#223354',
                        //  backgroundColor: grey[500],
                        '&:hover': {
                          color: 'red',
                          backgroundColor: red[100]
                        }
                      }}>   <DeleteForeverIcon /> </IconButton>
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
