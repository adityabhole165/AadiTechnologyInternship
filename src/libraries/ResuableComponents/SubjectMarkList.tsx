import { Box, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function SubjectMarkList({
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
        const updatedItemList = ItemList.map((Item) => {
            return { ...Item, IsActive: !IsCheckAll() };
        });
        clickchange(updatedItemList);
    };

    const onClick = (value) => {
        const updatedItemList = ItemList.map((item) => {
            return item.Id === value ? { ...item, IsActive: !item.IsActive } : item;
        });
        onChange(updatedItemList);
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
                            <TableCell sx={{ textTransform: 'capitalize' }} >
                                <Checkbox checked={IsCheckAll()} onClick={clickAll}></Checkbox>

                            </TableCell>

                            {HeaderArray.map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: (theme) => '#324b84'
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
                                    {item.Text1}
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} >
                                    {item.Text2}
                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} >

                                    {item.Text3}

                                </TableCell>

                                <TableCell sx={{ textTransform: 'capitalize' }} >
                                    {item.Text4}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default SubjectMarkList;
