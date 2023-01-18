import { useRef } from 'react';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import TopScroll from './TopScroll';
import CardText3 from './CardText3';
const CardListText3 = ({itemList,executeScroll}) => {
  return (
    <div>
      {(itemList.length == 0) ?
          <ErrorMessages Error={'No records found'} /> :
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
