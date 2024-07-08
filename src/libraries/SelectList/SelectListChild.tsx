import { Box, Checkbox, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const SelectListChild = () => {
    // Simulated data
    const [ParentList, setParentList] = useState([
        { Id: 1, Name: 'Parent 1' },
        { Id: 2, Name: 'Parent 2' },
    ]);

    const [ItemList, setItemList] = useState([
        { Id: 1, Name: 'Child 1', ParentId: 1, IsActive: false },
        { Id: 2, Name: 'Child 2', ParentId: 1, IsActive: false },
        { Id: 3, Name: 'Child 3', ParentId: 2, IsActive: false },
    ]);

    // State to manage checked status
    const [checkedState, setCheckedState] = useState({});

    useEffect(() => {
        // Initialize checked state based on ItemList
        const initialCheckedState = {};
        ItemList.forEach((item) => {
            initialCheckedState[item.Id] = item.IsActive;
        });
        setCheckedState(initialCheckedState);
    }, [ItemList]);

    const getIsParentCheckedAll = () => {
        // Check if all items are checked
        return ItemList.every((item) => item.IsActive);
    };

    const getIsCheckedAll = (parentId) => {
        // Check if all children of a parent are checked
        return ItemList.filter((item) => item.ParentId === parentId).every((item) => item.IsActive);
    };

    const CheckParentAll = (checked) => {
        // Set all items to checked or unchecked
        const updatedItemList = ItemList.map((item) => ({ ...item, IsActive: checked }));
        setItemList(updatedItemList);
    };

    const ClickParentCheckbox = (parentId) => {
        // Toggle all children of a parent
        const updatedItemList = ItemList.map((item) => {
            if (item.ParentId === parentId) {
                return { ...item, IsActive: !getIsCheckedAll(parentId) };
            }
            return item;
        });
        setItemList(updatedItemList);
    };

    const ClickChildCheckbox = (itemId) => {
        // Toggle individual item
        const updatedItemList = ItemList.map((item) => {
            if (item.Id === itemId) {
                return { ...item, IsActive: !item.IsActive };
            }
            return item;
        });
        setItemList(updatedItemList);
    };

    return (
        <>
            <Box sx={{ backgroundColor: 'lightgrey' }}>
                <Checkbox
                    checked={getIsParentCheckedAll()}
                    onChange={(e) => {
                        CheckParentAll(e.target.checked);
                    }}
                />
                Associated Class(es)
            </Box>
            <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                {ParentList.map((ParentItem, index) => (
                    <Box key={index}>
                        <Box sx={{ borderBottom: `1px solid grey`, fontWeight: 'bold' }}>
                            <Checkbox
                                checked={getIsCheckedAll(ParentItem.Id)}
                                onChange={() => {
                                    ClickParentCheckbox(ParentItem.Id);
                                }}
                            ></Checkbox>
                            {ParentItem.Name}
                        </Box>
                        {ItemList.filter((obj) => obj.ParentId === ParentItem.Id).map((item, index) => (
                            <Box key={index}>
                                <Checkbox
                                    checked={item.IsActive}
                                    onChange={() => {
                                        ClickChildCheckbox(item.Id);
                                    }}
                                ></Checkbox>
                                {item.Name}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Stack>
        </>
    );
};

export default SelectListChild;
