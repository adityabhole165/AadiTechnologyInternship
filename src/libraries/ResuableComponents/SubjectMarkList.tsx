import { Box } from '@mui/material';
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
        const isChecked = !IsCheckAll()
        let updatedItemList = ItemList.map((Item) => {
            return { ...Item, IsActive: isChecked };
        });
        clickchange(updatedItemList);
    };

    const onClick = (value) => {
        let updatedItemList = ItemList.map((item) => {
            return item.Text1 == value ? { ...item, IsActive: !item.IsActive } : item;
        });
        clickchange(updatedItemList);
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
                            <TableCell sx={{ textTransform: 'capitalize', padding:'15px' }} >
                                <Checkbox sx={{ p: 1 }} checked={IsCheckAll()}
                                    onClick={clickAll}
                                ></Checkbox>

                            </TableCell>

                            {HeaderArray.map((item, i) => (
                                <TableCell
                                    key={i}
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: (theme) => 'white',
                                        paddingTop: '2.5px', paddingBottom: '2.5px'

   
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
                                sx={{paddingTop: '2.5px', paddingBottom: '2.5px'}}
                                >
                                    <Checkbox sx={{  }}
                                        checked={item.IsActive}
                                        onChange={() => {
                                            onClick(item.Text1);
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
