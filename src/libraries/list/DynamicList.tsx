import { Checkbox, Grid } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card1 from '../mainCard/Card1';
import { CardD, CardDetail } from '../styled/CardStyle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const DynamicList = ({ HeaderList, ItemList,
    IconList, ClickItem, ClickCheck, IsSelect = 0 }) => {
    const clickCheckbox = (value) => {
        let arr = []
        arr = ItemList.map((Item) => {
            return Item.Id === value ?
                { ...Item, IsActive: !Item.IsActive } :
                IsSelect == 1 ? { ...Item, IsActive: false } : Item
        })
        ClickCheck({ Id: value, Value: arr, Action: "Select" })
    }
    const CheckAll = () => {
        let arr = []
        arr = ItemList.map((Item) => {
            return { ...Item, IsActive: !getIsCheckedAll() }
        })
        ClickCheck({ Id: 0, Value: arr, Action: "Select" })
    }
    const getIsCheckedAll = () => {
        let IsChecked=true
        ItemList.map((Item)=>{
            if(!Item.IsActive){
            IsChecked=false
        }
        })
        return IsChecked
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {HeaderList.map((item, i) => {
                            return (
                                <TableCell align="right" key={i}>
                                    <b>{item}</b>
                                    {(IsSelect==2 && i==0) &&
                                    (<><br></br><Checkbox checked={getIsCheckedAll()} 
                                    onChange={CheckAll}/></>)}
                                </TableCell>
                            )
                        })}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {ItemList.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                {
                                    (IsSelect > 0) &&
                                    <TableCell align="right">
                                        <Checkbox checked={item.IsActive}
                                            onChange={() => { clickCheckbox(item.Id) }}></Checkbox>
                                    </TableCell>
                                }
                                <TableCell align="right">{item.Name}</TableCell>

                                {IconList.map((obj, i) => {
                                    return (
                                        <TableCell align="right" key={i}
                                            onClick={() => { ClickItem({ Id: item.Id, Action: obj.Action }) }}>
                                            {obj.Icon}
                                        </TableCell>
                                    )
                                })
                                }
                            </TableRow>


                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DynamicList