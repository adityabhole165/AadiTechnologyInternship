import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
function RemarkList({
    ItemList,
    HeaderArray,
    onChange,
    ClickHeader
}) {
    const onClick = (value) => {
        ItemList = ItemList.map((item) => {
            return item.Id === value ? { ...item, IsActive: !item.IsActive } : item;
        });
        onChange(ItemList);
    };

    const clickHeader = (value) => {
        if (value != undefined) {
          HeaderArray = HeaderArray.map((Item) => {
            return Item.SortOrder == undefined ? Item :
              { ...Item, SortOrder: Item.SortOrder == " asc" ? " desc" : " asc" }
          })
          ClickHeader(HeaderArray)
        }
      }

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
                                    key={i}
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: (theme) => theme.palette.common.white,
                                        textAlign: 'center', // Align header cell content to center
                                        fontWeight: 'bold', // Make the header text bold
                                       
                                    }}

                                    onClick={() => { clickHeader(item.Id) }}
                                >
                                    {item.Header}
                                    {item.SortOrder != undefined ?
                                        item.SortOrder == " Desc" ?
                                            < ArrowDropDownCircleIcon /> :
                                            <ArrowCircleUpIcon /> :
                                        null
                                    }
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default RemarkList;  