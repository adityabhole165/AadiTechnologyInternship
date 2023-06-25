import { useRef } from 'react';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import TopScroll from './TopScroll';
import CardText3 from './CardText3';
import { Box } from '@mui/material';
const CardListText3 = ({itemList,executeScroll}) => {
  return (
    <div>
      {(itemList.length == 0) ?
     <Box sx={{alignItems:'center',mt:'10px'}}><ErrorMessages Error={'No records found'} /></Box> 
          :
          <>
            {itemList.map((item,i)=>(
            <CardText3 item={item} key={i}/>
          ))}
           <TopScroll executeScroll={executeScroll}/>
          </>
          }
    </div>
  )
}

export default CardListText3
