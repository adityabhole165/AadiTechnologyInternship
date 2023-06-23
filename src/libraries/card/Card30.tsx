import { useState } from 'react';
import Card32 from './Card32';
import List23 from '../list/List23';
import { ListStyle } from '../styled/CardStyle';
import { Grow } from '@mui/material';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';

export const Card30 = ({ header, AssignedDate="" }) => {

    const [enableRow, setEnableRow] = useState(-1)
    const [checked, setChecked] = useState(true)
    
    const filterData = () =>{
        const arrParent = []
        header.map((item)=>{
        const arrChild = []
            
            item.Child.map((obj)=>{
                console.log(getDateMonthYearFormatted(obj.AssignedDate),"--",AssignedDate)
                if(getDateMonthYearFormatted(obj.AssignedDate) === AssignedDate){
                    arrChild.push(obj)
                }
            })
            if(arrChild.length>0){
                arrParent.push(
                    {Id: item.Id,
                        Name: item.Name,
                        AssignedDate: item.Value,
                        Child: arrChild
                    }
                )
            }
        })
        return arrParent;
    }
    return (<>

        {
            filterData().map((Header, index) => (
                <Grow key={index}
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                >
                    <ListStyle>
                        <Card32 Id={index} Name={Header.Name}
                            expand={() => setEnableRow(enableRow === index ? -1 : index)}
                            isActive={enableRow === index} />
                            {Header.Child !== undefined &&
                       <> {enableRow === index && 
                            <List23 data={Header.Child} />
                            // <List23 data={Header.Child.filter((item)=>{return getDateMonthYearFormatted(item.AssignedDate) === AssignedDate})} />
                        }</>}
                    </ListStyle>
                </Grow>
            ))
        }
    </>)
}
export default Card30;