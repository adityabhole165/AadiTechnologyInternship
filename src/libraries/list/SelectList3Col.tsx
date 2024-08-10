import { Box } from '@mui/material';
import ListCard4ColSel from '../card/ListCard4ColSel';
const SelectList3Col = ({ Itemlist, refreshData, ActiveTab, DeleteDraft }) => {
  const clickSingle = (value) => {
    Itemlist = Itemlist.map((obj) =>
      obj.Id === value.name ? { ...obj, isActive: value.checked } : obj
    );
    refreshData(Itemlist);
  };

  return (
    <Box sx={{textAlign:'center'}}>
      {Itemlist.map((item, index) => (
        <ListCard4ColSel
          key={index}
          Item={item}
          onChange={clickSingle}
          ActiveTab={ActiveTab}
          DeleteDraft={DeleteDraft}
        />
      ))}
    </Box>
  );
};

export default SelectList3Col;
