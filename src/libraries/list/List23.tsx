import React from 'react'
import Card31 from '../card/Card31'
const List23 = ({data}) => {
  return (<>
    {
        data.map((Detail) => (

            <Card31 key={Detail.Id}
                Name={Detail.Name}
                Value={Detail.Value} />

        ))
    }
  </>)
}
export default List23;