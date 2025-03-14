import { Box } from '@mui/material';
import CheckboxCard from './CheckboxCard';

const ListSelect = ({ Itemlist, onChange, isSingleSelect = false, ClickGroupRadio }) => {
  const onClick = (value) => {
    ClickGroupRadio(value);
    Itemlist = Itemlist.map((obj) =>
      obj.Id === value.Id
        ? { ...obj, isActive: value.isActive }
        : { ...obj, isActive: isSingleSelect ? false : obj.isActive }
    );
    onChange(Itemlist);
  };
  return (
    <>
      <Box mb={0.5} >
        {Itemlist?.map((item, index) => (
          <CheckboxCard Item={item} onClick={onClick} key={index} />
        ))}
      </Box>
    </>
  );
};

export default ListSelect;
