import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, Checkbox, IconButton, Link, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function SentsmsListAll({ isPrincipal, ItemList, HeaderArray, ClickHeader, clickEdit, clickchange, clickTitle }) {


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
            <TableContainer component={Box} >
                <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    sx={{ p: 1.5 }}
                                    checked={IsCheckAll()}
                                    onChange={clickAll}
                                />
                            </TableCell>
                            {HeaderArray.map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white, py: 1.5 }}
                                    onClick={i >= 1 && i < 3 ? () => clickHeader(item.Id) : null} // Make only the second (index 1) and third (index 2) headers clickable
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        justifyContent: i < 3 ? 'flex-start' : 'center', // Left-align for index 1 and 2, center for others
                                    }}>
                                        <b>{item.Header}</b>
                                        {item.SortOrder !== null && i >= 1 && i < 3 ? ( // Show sorting icons only for index 1 and 2
                                            item.SortOrder === "DESC" ? <ArrowCircleDown /> : <ArrowCircleUpIcon />
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

                                {isPrincipal &&
                                    <Tooltip title={item.SenderName}>
                                        <TableCell sx={{
                                            textTransform: 'capitalize',
                                            textAlign: 'left',
                                            py: 0.5,
                                            width: '200px', // Fixed width
                                            maxWidth: '200px', // Prevent resizing
                                            whiteSpace: 'nowrap', // Keep text on one line
                                            overflow: 'hidden', // Hide overflow content
                                            textOverflow: 'ellipsis', // Add ellipsis for overflow
                                        }}>
                                            {item.SenderName}

                                        </TableCell>
                                    </Tooltip>
                                }

                                <Tooltip title={item.UserName}>
                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>

                                        {item.UserName}

                                    </TableCell>
                                </Tooltip>



                                <TableCell sx={{ textAlign: 'left', py: 0.5 }}>
                                    <Link href={''} onClick={() => clickTitle(item.Id)}>
                                        {item.Subject}
                                    </Link>
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>
                                    {item.Insert_Date}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', py: 0.5 }} align="center">
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

export default SentsmsListAll;
