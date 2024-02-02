import { FormControl, InputLabel, NativeSelect } from '@mui/material';

const DropdownNew = ({ Itemlist, onChange, Label, DefaultValue }) => {
  const onClick = (value) => {
    onChange(
      Itemlist.map((item) => {
        return { ...item, IsActive: item.Value === value ? true : false };
      })
    );
  };
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="select">{Label}</InputLabel>
      <NativeSelect
        fullWidth
        value={DefaultValue}
        onChange={(e) => onClick(e.target.value)}
        id="select"
      >
        {Itemlist.map((Item, i) => {
          return (
            <option value={Item.Value} key={i}>
              {Item.Name}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
};

export default DropdownNew;
