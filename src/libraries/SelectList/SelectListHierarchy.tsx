import { Box, Checkbox, Stack } from '@mui/material';

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

  return (
    <>
      <Box sx={{ backgroundColor: 'lightgrey', pl: 1 }}>
        <Checkbox
          checked={getIsParentCheckedAll()}
          onChange={(e) => {
            CheckParentAll(e.target.checked);
          }}
        />
        Associated Class(es)
      </Box>
      <Stack direction={'row'} gap={0.7} flexWrap={'wrap'}>
        {ParentList.map((ParentItem, index) => {
          return (
            <Box key={index}>
              <Box sx={{ borderBottom: `1px solid grey`, fontWeight: 'bold', pl: 1 }}>
                <Checkbox
                  checked={getIsCheckedAll(ParentItem.Id)}
                  onChange={() => {
                    ClickParentCheckbox(ParentItem.Id);
                  }}
                ></Checkbox>
                {ParentItem.Name}
              </Box>
              {ItemList.filter((obj) => {
                return obj.ParentId == ParentItem.Id;
              }).map((item, index) => {
                return (
                  <Box key={index} sx={{ pl: 1 }}>
                    <Checkbox
                      checked={item.IsActive}
                      onChange={() => {
                        ClickChildCheckbox(item.Id);
                      }}
                    ></Checkbox>
                    {item.Name}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default SelectListHierarchy;
