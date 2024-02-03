import { Box } from '@mui/material';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import PageHeader from 'src/libraries/heading/PageHeader';
import DropdownNew from '../dropdown/DropdownNew';
import CardItemList from './CardItemList';
const DropdownandList = ({
  heading,
  Itemlist,
  onChange,
  Label,
  DefaultValue,
  CardItemlist,
  getExamDetailslist
}) => {
  return (
    <div>
      <PageHeader heading={heading} />
      <DropdownNew
        Itemlist={Itemlist}
        onChange={onChange}
        Label={Label}
        DefaultValue={DefaultValue}
      />
      <Box sx={{ mt: '12px' }}>
        {CardItemlist.length === 0 ? (
          DefaultValue !== '' && (
            <ErrorMessages Error={'Exam is not available'} />
          )
        ) : (
          <CardItemList CardItemList={CardItemlist} />
        )}
      </Box>
    </div>
  );
};

export default DropdownandList;
