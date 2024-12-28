import { useEffect, useState } from 'react';
import CalendarDetails from 'src/libraries/DateSelector/CalendarDetails';
import MultiColumnList from 'src/libraries/list/MultiColumnList';

const AttendanceCalendar = ({ DefaultDate, ClickDate }) => {
  const [ItemList, setItemList] = useState([]);
  useEffect(() => {
    //console.log('Call Dispatch', DefaultDate);
    setItemList([{ DefaultDate: DefaultDate }]);
  }, [DefaultDate]);
  return (
    <>
      <div>Attendance Calendar</div>
      <CalendarDetails
        ItemList={ItemList}
        DefaultDate={DefaultDate}
        ClickDate={ClickDate}
      />
      <MultiColumnList ItemList={ItemList} />
    </>
  );
};

export default AttendanceCalendar;
