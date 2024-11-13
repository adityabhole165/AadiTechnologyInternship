import ListHeaderCard3ColSel from 'src/libraries/card/ListHeaderCard3ColSel';
import CheckboxCard from 'src/libraries/list/CheckboxCard';
import ContactGroupCheckboxCard from 'src/libraries/list/ContactGroupCheckboxCard';
const SelectallAddrecipents = ({
  Itemlist,
  onChange,
  isSingleSelect = false,
  ContactGP = '0'
}) => {

  const onClick = (value) => {
    Itemlist = Itemlist.map((obj) =>
      obj.Id === value.Id
        ? { ...obj, isActive: value.isActive }
        : { ...obj, isActive: isSingleSelect ? false : obj.isActive }
    );
    onChange(Itemlist);
  };

  let isCheckAll = !Itemlist.some((obj) => obj.isActive === false)
    ? 1
    : !Itemlist.some((obj) => obj.isActive === true)
      ? 0
      : 2;

  const ClickAll = (value) => {
    Itemlist = Itemlist.map((obj) => {
      return { ...obj, isActive: value };
    });
    onChange(Itemlist);
  };
  return (
    <>
      <ListHeaderCard3ColSel
        Item={{ text1: '', text2: 'Select All', isActive: isCheckAll, text3: ContactGP === '9' ? 'Edit' : '', text4: ContactGP === '9' ? 'Delete' : '' }}
        onChange={ClickAll}
      />

      {Itemlist?.map((item, index) => (
        <>
          {ContactGP === '9' ? (
            <ContactGroupCheckboxCard Item={item} onClick={onClick} key={index} />)
            : (
              <CheckboxCard Item={item} onClick={onClick} key={index} />)}


        </>
      ))}
    </>
  );
};

export default SelectallAddrecipents;
