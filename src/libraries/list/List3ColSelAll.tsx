import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import ListCard3ColSel from '../card/ListCard3ColSel';
import ListHeaderCard3ColSel from '../card/ListHeaderCard3ColSel';

const List3ColSelAll = ({ Itemlist, refreshData, assignedDate, setIsDirty }) => {
  let isCheckAll = !Itemlist
    .filter((obj) => { return !obj.IsExamSubmitted })
    .some((obj) => obj.isActive === false)
    ? 1
    : !Itemlist
      .filter((obj) => { return !obj.IsExamSubmitted })
      .some((obj) => obj.isActive === true)
      ? 0
      : 2;

  const ClickAll = (value) => {
    Itemlist = Itemlist.map((obj) => {
      return { ...obj, isActive: (!obj.IsExamSubmitted ? value : false) }
    });
    refreshData(Itemlist);
    setIsDirty(true);
  };
  const clickSingle = (value) => {
    Itemlist = Itemlist.map((obj) =>
      obj.text1 === value.name ? { ...obj, isActive: value.checked } : obj
    );
    refreshData(Itemlist);
    setIsDirty(true);
  };
  return (
    <div>
      <Box
        sx={{ height: '50px' }}

      >
        <ListHeaderCard3ColSel
          Item={{
            text1: 'Roll No.',
            text2: 'Student Name',
            isActive: isCheckAll
          }}
          onChange={ClickAll}
        />
      </Box>

      {Itemlist.map((item, index) => (
        <Box
          sx={{
            pb: 0.4,
            border: `1px solid ${grey[300]}`,
            backgroundColor: 'white',

          }}
          key={index}
        >
          <ListCard3ColSel
            assignedDate={assignedDate}
            Item={item}
            onChange={clickSingle}
          />
        </Box>
      ))}
    </div>
  );
};

export default List3ColSelAll;
