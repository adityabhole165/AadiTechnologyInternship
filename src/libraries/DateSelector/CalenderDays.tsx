
const CalenderDays = ({ ItemList, DefaultDate, ClickDate }) => {
  return (
    <div>
      {ItemList?.map((Item) => {
        // <CardCal item={Item} clickItem={ClickDate} />;
      })}
    </div>
  );
};

export default CalenderDays;
