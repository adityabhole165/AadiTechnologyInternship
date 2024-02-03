import CalenderDays from './CalenderDays';
import MonthSelector from './MonthSelector';

const CalendarDetails = ({ ItemList, DefaultDate, ClickDate }) => {
  if (ItemList.length > 0)
    console.log(ItemList[0].DefaultDate, 'CalendarDetails - ItemList');
  return (
    <div>
      <MonthSelector DefaultDate={DefaultDate} ClickDate={ClickDate} />
      <CalenderDays
        ItemList={ItemList}
        DefaultDate={DefaultDate}
        ClickDate={ClickDate}
      />
    </div>
  );
};

export default CalendarDetails;
