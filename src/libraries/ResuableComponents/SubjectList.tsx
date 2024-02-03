import { Card, NativeSelect, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function SubjectList({
  ItemList,
  textHeader4,
  textHeader5,
  textHeader6,
  HeaderArray,
  onChange,
  clickchange,
  changetextHeader4,
  changetextHeader5,
  changetextHeader6,
  defaultValue,
  Array,
  // handleChange ,
  label
}) {
  const changevalue = (value) => {
    onChange(value);
  };
  const changeText = (value) => {
    console.log(value);
    ItemList = ItemList.map((item) => {
      return item.Id === value.Id ? { ...item, Text4: value.Value } : item;
    });
    onChange(ItemList);
  };
  const handleChange = (value) => {
    console.log(value);
    ItemList = ItemList.map((item) => {
      return item.Id === value.Id
        ? {
            ...item,
            Text3: value.Value,
            Text4: value.Value == '1' ? '' : item.Text4,
            IsActive: value.Value == '1' ? true : false,
            variant: value.Value == '1' ? 'filled' : 'standard'
          }
        : item;
    });
    onChange(ItemList);
  };

  const onClick = (value) => {
    ItemList = ItemList.map((item) => {
      return item.Id === value.Id
        ? { ...item, IsActive: !value.IsActive }
        : item;
    });
    onChange(ItemList);
  };
  const changeHeader4 = (value) => {
    ItemList = ItemList.map((item) => {
      return { ...item, Text4: value };
    });
    changetextHeader4(value, ItemList);
  };
  const changeHeader5 = (value) => {
    ItemList = ItemList.map((item) => {
      return { ...item, Text6: value };
    });
    changetextHeader5(value, ItemList);
  };

  const changeHeader6 = (value) => {
    ItemList = ItemList.map((item) => {
      return { ...item, Text6: value };
    });
    changetextHeader6(value, ItemList);
  };

  return (
    <div>
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#b3e5fc' }}>
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize' }}
                  align="center"
                >
                  <b>
                    {item.Header}
                    {i === 4 && (
                      <TextField
                        value={textHeader4}
                        onChange={(e) => {
                          changeHeader4(e.target.value);
                        }}
                        style={{ width: '70px' }}
                      />
                    )}
                    {i === 6 && (
                      <TextField
                        value={textHeader5}
                        onChange={(e) => {
                          changeHeader5(e.target.value);
                        }}
                        style={{ width: '70px' }}
                      />
                    )}

                    {i === 8 && (
                      <TextField
                        value={textHeader6}
                        onChange={(e) => {
                          changeHeader6(e.target.value);
                        }}
                        style={{ width: '70px' }}
                      />
                    )}
                  </b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i}>
                <TableCell></TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text1}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text2}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <NativeSelect
                    value={item.Text3}
                    onChange={(e) => {
                      handleChange({ Value: e.target.value, Id: item.Id });
                    }}
                    fullWidth
                  >
                    {defaultValue == '' && <option>{label}</option>}
                    {Array.map((items, i) => {
                      return (
                        <option value={items.Value} key={i}>
                          {items.Name}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <TextField
                    disabled={item.IsActive}
                    value={item.Text4}
                    onChange={(e) => {
                      changeText({ Value: e.target.value, Id: item.Id });
                    }}
                    style={{ width: '70px' }}
                    variant={item.variant}
                  />
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <NativeSelect
                    value={defaultValue}
                    onChange={(e) => handleChange(e.target.value)}
                    fullWidth
                  >
                    {defaultValue == '' && <option>{label}</option>}
                    {Array.map((items, i) => {
                      return (
                        <option value={items.Value} key={i}>
                          {items.Name}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <TextField
                    value={item.Text6}
                    onChange={(e) => {
                      changeText({ Value: e.target.value, Id: item.Id });
                    }}
                    style={{ width: '70px' }}
                  />
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <NativeSelect
                    value={defaultValue}
                    onChange={(e) => handleChange(e.target.value)}
                    fullWidth
                  >
                    {defaultValue == '' && <option>{label}</option>}
                    {Array.map((items, i) => {
                      return (
                        <option value={items.Value} key={i}>
                          {items.Name}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <TextField
                    value={item.Text6}
                    onChange={(e) => {
                      changeText({ Value: e.target.value, Id: item.Id });
                    }}
                    style={{ width: '70px' }}
                  />
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text9}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SubjectList;
