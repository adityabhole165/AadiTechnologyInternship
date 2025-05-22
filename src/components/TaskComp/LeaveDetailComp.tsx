import { CheckBox } from '@mui/icons-material';
import { Checkbox, Table, TableCell, TableRow } from '@mui/material';
import React from 'react';


const LeaveDetailComp = ({ ItemList,clickItem }) => {
    const onClick = (Value) => {
        let ReturnValue = ItemList.map((item) => {
            return {...item,isActive : item.Value == Value ? !item.isActive : item.isActive}
        })
        clickItem(ReturnValue)
    }   

    const IsAllCheck = () => {
        let returnValue = true;
        ItemList.map((item) => {
            if(!item.isActive)
                returnValue = false
        })
        return returnValue
    }

    const ClickAll = () => {
        let ReturnValue = ItemList.map((item) => {
            return {...item,isActive : !IsAllCheck()}
        })
        clickItem(ReturnValue)
    }
    return (
    <div>
        <br/><br/><br/><br/><br/>
        <Table>
            <TableRow>
                    <Checkbox checked={IsAllCheck()} 
                    onClick = {ClickAll}
                    />
                     Select All
            </TableRow>
        {ItemList.map((item) => (
            <TableRow 
            // onClick = {() => {onClick(item.Value)}}
            sx={{background :item.isActive ? "Grey" : ""}}
            >
                <TableCell>
                    <Checkbox checked={item.isActive}  onClick = {() => {return onClick(item.Value);}}
                    />
                </TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Value}</TableCell>
            </TableRow>
        ))}</Table>
    </div>
  );
};

export default LeaveDetailComp;
