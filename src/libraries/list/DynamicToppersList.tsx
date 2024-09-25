import { Box, Checkbox, Grow } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BronzeMedal from '../../assets/img/medals/bronze-medal.png';
import GoldMedal from '../../assets/img/medals/gold-medal.png';
import SilverMedal from '../../assets/img/medals/silver-medal.png';

const DynamicToppersList = ({
    HeaderList,
    ItemList,
    IconList = undefined,
    ClickItem = undefined,
    ClickCheck = undefined,
    IsSelect = 0
    // clickView
}) => {
    const clickCheckbox = (value) => {
        let arr = [];
        arr = ItemList.map((Item) => {
            return Item.Id === value
                ? { ...Item, IsActive: !Item.IsActive }
                : IsSelect == 1
                    ? { ...Item, IsActive: false }
                    : Item;
        });
        ClickCheck({ Id: value, Value: arr, Action: 'Select' });
    };
    const CheckAll = () => {
        let arr = [];
        arr = ItemList.map((Item) => {
            return { ...Item, IsActive: !getIsCheckedAll() };
        });
        ClickCheck({ Id: 0, Value: arr, Action: 'Select' });
    };
    const getIsCheckedAll = () => {
        let IsChecked = true;
        ItemList.map((Item) => {
            if (!Item.IsActive) {
                IsChecked = false;
            }
        });
        return IsChecked;
    };
    const getMedalImage = (Text77) => {
        let img;
        switch (Text77) {
            case "1":
                img = <img src={GoldMedal} alt="Gold Medal" width={22} />;
                break;
            case "2":
                img = <img src={SilverMedal} alt="Silver Medal" width={22} />;
                break;
            case "3":
                img = <img src={BronzeMedal} alt="Bronze Medal" width={22} />;
                break;

            default:
                img = null;
                break;
        }
        return img



    };

    return (
        <TableContainer component={Box}>
            <Table sx={{ minWidth: 450, border: (theme) => `1px solid ${theme.palette.divider}` }} aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
                    >
                        {HeaderList.map((item, i) => {
                            return (
                                <TableCell align={item.includes('Roll No.') ? 'center' : 'left'} sx={{ color: 'white' }} key={i}>
                                    <b>{item}</b>
                                    {IsSelect == 2 && i == 0 && (
                                        <>
                                            <br></br>
                                            <Checkbox
                                                checked={getIsCheckedAll()}
                                                onChange={CheckAll}
                                            />
                                        </>
                                    )}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 1' }}
                    {...{ timeout: 1500 }}
                >
                    <TableBody>
                        {ItemList.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    {/* {
                                    (IsSelect > 0) &&
                                    <TableCell >
                                        <Checkbox checked={item.IsActive}
                                            onChange={() => { clickCheckbox(item.Id) }}></Checkbox>
                                    </TableCell>
                                } */}

                                    {item.Text77 !== undefined && (
                                        <TableCell sx={{ py: 0, pt: 0.5, pl: "16px", }}>
                                            {getMedalImage(item.Text77)}
                                        </TableCell>
                                    )}
                                    {/* <TableCell
                    sx={{ textTransform: 'capitalize' }}
                    
                  >
                    <Link href={''} onClick={() => clickView(item.Id)}>
                      {item.Text76}
                    </Link>
                  </TableCell> */}
                                    {item.Text1 != undefined && (
                                        <TableCell sx={{ color: item.IsHighlightStudent ? 'red' : '', p: 0.5, pb: "1px", pl: "16px" }}>{item.Text1}</TableCell>
                                    )}
                                    {item.Text6 != undefined && (
                                        <TableCell  >{item.Text6}</TableCell>
                                    )}
                                
                                    {item.Text3 != undefined && (
                                        <TableCell
                                            sx={{ color: item.IsHighlightStudent ? 'red' : '', p: 0.5, pb: "1px", pl: "16px" }}
                                            onClick={() => { ClickItem(item.Id) }} >
                                            {item.Text3}
                                        </TableCell>
                                    )}
                                    {item.Text4 != undefined && (
                                        <TableCell sx={{ color: item.IsHighlightStudent ? 'red' : '', p: "5px", pb: "1px" }}>{item.Text4}</TableCell>
                                    )}
                                    {item.Text5 != undefined && (
                                        <TableCell sx={{ p: 0.5 }}>{item.Text5}</TableCell>
                                    )}

                                    {IconList?.map((obj, i) => {
                                        return (
                                            <TableCell
                                                sx={{ p: "5px", pb: "1px" }}
                                                key={i}
                                                onClick={() => {
                                                    ClickItem({ Id: i, Action: obj.Action });
                                                }}
                                                align={"center"}
                                            >
                                                {obj.Icon}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Grow>
            </Table>
        </TableContainer>
    );
};

export default DynamicToppersList;
