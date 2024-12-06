import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, Checkbox, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function SentsmsList({ ItemList, HeaderArray, ClickHeader, clickEdit, clickchange }) {


    // Function to handle sorting on headers
    const clickHeader = (id) => {
        const updatedHeaderArray = HeaderArray.map((item) => {
            if (item.Id === id) {
                return {
                    ...item,
                    SortOrder: item.SortOrder === 'DESC' ? 'ASC' : 'DESC'
                };
            } else {
                return { ...item, SortOrder: null };
            }
        });
        ClickHeader(updatedHeaderArray);
    };

    const IsCheckAll = () => {
        let returnValue = true;
        ItemList.map((item) => {
            if (!item.IsActive) returnValue = false;
        });
        return returnValue;
    };


    const clickAll = () => {
        const isChecked = !IsCheckAll()
        let updatedItemList = ItemList.map((Item) => {
            return { ...Item, IsActive: isChecked };
        });
        clickchange(updatedItemList);
    };





    const onClick = (value) => {
        let updatedItemList = ItemList.map((item) => {
            return item.Id == value ? { ...item, IsActive: !item.IsActive } : item;
        });
        clickchange(updatedItemList);
    };

    return (
        <>
            <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    sx={{ p: 1 }}
                                    checked={IsCheckAll()}
                                    onChange={clickAll}
                                />
                            </TableCell>
                            {HeaderArray.map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1 }}
                                    onClick={i < 3 ? () => clickHeader(item.Id) : null} // Make only the first 3 headers clickable
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        justifyContent: i < 3 ? 'flex-start' : 'center', // Left-align for the first three headers, center for others
                                    }}>
                                        <b>{item.Header}</b>
                                        {item.SortOrder !== null && i < 3 ? ( // Show sorting icons only for the first 3 columns
                                            item.SortOrder === "DESC" ? <ArrowCircleDown /> : < ArrowCircleUpIcon />
                                        ) : null}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ItemList.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={item.IsActive}
                                        onChange={() => onClick(item.Id)}
                                    />
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                    {item.UserName}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                    {item.Subject}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', paddingTop: '2.5px', paddingBottom: '2.5px' }}>
                                    {item.Insert_Date}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', paddingTop: '2.5px', paddingBottom: '2.5px' }} align="center">
                                    <Tooltip title={"Edit"}>
                                        <IconButton
                                            onClick={() => clickEdit(item.Id)}
                                            sx={{
                                                color: '#223354',
                                                '&:hover': {
                                                    color: '#223354',
                                                    cursor: 'pointer'
                                                }
                                            }}
                                        >
                                            <EditTwoTone />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>




                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default SentsmsList;
