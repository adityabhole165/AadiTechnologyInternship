import ErrorMessages from '../ErrorMessages/ErrorMessages';
import ListCard4ColSel from '../card/ListCard4ColSel';
import { Box, Stack } from '@mui/material';
import { MessageStyle } from '../styled/CommonStyle';
const SelectList3Col = ({ Itemlist, refreshData, ActiveTab }) => {
  const clickSingle = (value) => {
    Itemlist = Itemlist.map((obj) =>
      obj.Id === value.name ? { ...obj, isActive: value.checked } : obj
    );
    refreshData(Itemlist);
  };

  return (
    <div>
      {Itemlist?.length === 0 ?
       (
        <Stack sx={MessageStyle}>
            <ErrorMessages Error="No records found"></ErrorMessages>
        </Stack>
    
      ) : (
    
        Itemlist.map((item, index) => (
          <ListCard4ColSel key={index} Item={item} onChange={clickSingle} ActiveTab={ActiveTab} />
        ))  
     ) }
    </div>
  );
};

export default SelectList3Col;
