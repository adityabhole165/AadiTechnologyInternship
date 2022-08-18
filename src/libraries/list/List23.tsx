import React from 'react'
import Card31 from '../card/Card31'
const List23 = ({ data }) => {
  return (<>
    {
      data.map((Detail, index) => (

        <Card31 
        Name={Detail.Name} 
        Value={Detail.Value} 
        key={index}/>

      ))
    }
  </>)
}
export default List23;