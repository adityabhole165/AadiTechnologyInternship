import ListCard4ColSel from '../card/ListCard4ColSel';
const SelectList3Col = ({ Itemlist, refreshData, ActiveTab, DeleteDraft }) => {
  const clickSingle = (value) => {
    Itemlist = Itemlist.map((obj) =>
      obj.Id === value.name ? { ...obj, isActive: value.checked } : obj
    );
    refreshData(Itemlist);
  };

  return (
    <div>
      {Itemlist.map((item, index) => (
        <ListCard4ColSel
          key={index}
          Item={item}
          onChange={clickSingle}
          ActiveTab={ActiveTab}
          DeleteDraft={DeleteDraft}
        />
      ))}
    </div>
  );
};

export default SelectList3Col;
