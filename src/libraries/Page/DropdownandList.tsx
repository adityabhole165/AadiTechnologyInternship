import React from 'react'
import PageHeader from 'src/libraries/heading/PageHeader';
import DropdownNew from '../dropdown/DropdownNew';
import CardItemList from './CardItemList';
const DropdownandList = ({ heading, Itemlist, onChange, Label, DefaultValue, CardItemlist }) => {

  return (
    <div>
      <PageHeader heading={heading} />
      <DropdownNew Itemlist={Itemlist} onChange={onChange} Label={Label} DefaultValue={DefaultValue} />
      <CardItemList CardItemList={CardItemlist} />
    </div>
  )
}

export default DropdownandList
