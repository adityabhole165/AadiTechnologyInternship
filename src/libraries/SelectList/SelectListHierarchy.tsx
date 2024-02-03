import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const SelectListHierarchy = ({ ItemList, ParentList, ClickChild }) => {
  const ClickChildCheckbox = (value) => {
    let arr = [];
    arr = ItemList.map((Item) => {
      return Item.Id === value ? { ...Item, IsActive: !Item.IsActive } : Item;
    });
    ClickChild(arr);
  };
  const ClickParentCheckbox = (value) => {
    let arr = [];
    arr = ParentList.map((Item) => {
      return Item.Id === value ? { ...Item, IsActive: !Item.IsActive } : Item;
    });
    CheckChildAll(value);
  };
  const CheckParentAll = (value) => {
    let arr = [];
    arr = ItemList.map((Item) => {
      return { ...Item, IsActive: value };
    });
    ClickChild(arr);
  };
  const CheckChildAll = (value) => {
    let arr = [];
    arr = ItemList.map((Item) => {
      console.log(Item.ParentId, ' = ', value);
      return Item.ParentId == value
        ? { ...Item, IsActive: !getIsCheckedAll(value) }
        : Item;
    });
    ClickChild(arr);
  };
  const getIsCheckedAll = (value) => {
    let IsChecked = true;
    ItemList.map((Item) => {
      if (Item.ParentId == value && !Item.IsActive) {
        IsChecked = false;
      }
    });
    return IsChecked;
  };
  const getIsParentCheckedAll = () => {
    let IsChecked = true;
    ItemList.map((Item) => {
      if (!Item.IsActive) {
        IsChecked = false;
      }
    });
    return IsChecked;
  };
  console.log(ItemList, 'l');

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'lightgrey' }}>
              <Checkbox
                checked={getIsParentCheckedAll()}
                onChange={(e) => {
                  CheckParentAll(e.target.checked);
                }}
              />
              Select All
            </TableRow>
          </TableHead>
          <TableBody>
            {ParentList.map((ParentItem, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Checkbox
                      checked={getIsCheckedAll(ParentItem.Id)}
                      onChange={() => {
                        ClickParentCheckbox(ParentItem.Id);
                      }}
                    ></Checkbox>
                    {ParentItem.Name}
                  </TableCell>
                  {ItemList.filter((obj) => {
                    return obj.ParentId == ParentItem.Id;
                  }).map((item, index) => {
                    return (
                      <TableCell align="center" key={index}>
                        <Checkbox
                          checked={item.IsActive}
                          onChange={() => {
                            ClickChildCheckbox(item.Id);
                          }}
                        ></Checkbox>
                        {item.Name}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SelectListHierarchy;
