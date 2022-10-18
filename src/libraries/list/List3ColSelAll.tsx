import ListHeaderCard3ColSel from '../card/ListHeaderCard3ColSel'
import ListCard3ColSel from '../card/ListCard3ColSel'
import { Box, Card } from '@mui/material';


const List3ColSelAll = ({ Itemlist, refreshData ,assignedDate}) => {
    
    let isCheckAll =
        (!Itemlist.some(obj => obj.isActive === false)) ?
            1 :
            (!Itemlist.some(obj => obj.isActive === true)) ?
                0 :
                2;

    const ClickAll = (value) => {
        Itemlist =
            Itemlist.map((obj) => {
                return { ...obj, isActive: value }
            })
        refreshData(Itemlist)
    }
    const clickSingle = (value) => {
        Itemlist =
            Itemlist.map((obj) =>
                obj.text1 === value.name ?
                    { ...obj, isActive: value.checked } :
                    obj
            )
        refreshData(Itemlist)
    }
    return (
        <div>
            <Box sx={{mt:"10px"}}>
            <ListHeaderCard3ColSel
                Item={{ text1: 'Roll No.', text2: 'Student Name', isActive: isCheckAll }}
                onChange={ClickAll}
            />
            </Box>
            
           
            {
                Itemlist.map((item, index) => (
                    <Card sx={{mt:"10px", boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"}}  key={index}>
                    <ListCard3ColSel 
                       assignedDate={assignedDate}
                        Item={item}
                        onChange={clickSingle}
                    />
                     </Card>
                ))
            }
           
            
        </div>
    )
}

export default List3ColSelAll