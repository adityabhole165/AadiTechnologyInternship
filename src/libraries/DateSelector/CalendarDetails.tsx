import React from 'react'
import MonthSelector from './MonthSelector'
import CalenderDays from './CalenderDays'

const CalendarDetails = ({ ItemList, DefaultDate, ClickDate }) => {
  if (ItemList.length > 0)
    console.log(ItemList[0].DefaultDate, "CalendarDetails - ItemList")
  return (
    <div>
      <MonthSelector DefaultDate={DefaultDate} ClickDate={ClickDate} />
      <CalenderDays ItemList={ItemList} DefaultDate={DefaultDate} ClickDate={ClickDate}/>
    </div>
  )
}

export default CalendarDetails