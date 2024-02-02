const MultiColumnList = ({ ItemList }) => {
  if (ItemList.length > 0)
    console.log(ItemList[0].DefaultDate, 'MultiColumnList - ItemList');
  return (
    <div>
      MultiColumnList
      {ItemList.map((Item) => {
        <div>{Item.DefaultDate}</div>;
      })}
    </div>
  );
};

export default MultiColumnList;
