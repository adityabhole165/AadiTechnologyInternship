import Card12 from './Card12';
function List2({ itemList, clickItem }) {
  const onClick = (value) => {
    itemList = itemList.map((item) => {
      return item.Id === value
        ? { ...item, IsActive: !item.IsActive }
        : { ...item, IsActive: false };
    });
    clickItem(itemList);
  };
  return (
    <>
      {itemList.map((item, i) => (
        <Card12 key={i} item={item} clickItem={() => onClick(item.Id)} />
      ))}
    </>
  );
}

export default List2;
