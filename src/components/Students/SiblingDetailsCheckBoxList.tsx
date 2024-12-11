import { Box, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { useEffect, useState } from 'react';



const CheckboxList = ({ itemList, onItemsChange, resetTrigger }) => {
    const [items, setItems] = useState([]);
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        const initializedItems = itemList.map(item => ({ ...item, checked: item.checked || true }));
        setItems(initializedItems);
        setSelectAll(initializedItems);
        updateParent(initializedItems); // Notify parent Intial state
    }, [itemList]);

    // Reset items when resetTrigger changes
    useEffect(() => {
        const resetItems = itemList.map((item) => ({ ...item, checked: false })); // Uncheck all items
        setItems(resetItems);
        setSelectAll(false); // Ensure "Select All" is also unchecked
        updateParent(resetItems); // Notify parent of the reset state
    }, [resetTrigger]);

    const updateParent = (updatedItems) => {
        if (onItemsChange) {
            onItemsChange(updatedItems);
        }
    };

    // Handle individual checkbox change
    const handleCheckboxChange = (commonFieldId) => {
        const updatedItems = items.map(item =>
            item.CommonFieldId === commonFieldId
                ? { ...item, checked: !item.checked }
                : item
        );
        setItems(updatedItems);
        updateParent(updatedItems);

        // Uncheck "Select All" if any item becomes unchecked
        const allChecked = updatedItems.every(item => item.checked);
        setSelectAll(allChecked);
    };

    // Handle "Select All" checkbox change
    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedItems = items.map(item => ({ ...item, checked: newSelectAll }));
        setItems(updatedItems);
        updateParent(updatedItems);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', py: 0.5, pl: 1, background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                            // color="primary"
                            sx={{
                                color: (theme) => theme.palette.common.white, // Set label color to white
                            }}
                        />
                    }
                    label=" Update Details to Sibling"
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            color: 'white', // This targets the label text color specifically
                        },
                    }}
                />
            </Box>
            <FormGroup>
                <Grid container spacing={0} sx={{ my: 0, ml: 0, border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                    {items.map((item) => (
                        <Grid item xs={6} key={item.commonFieldId} sx={{ pl: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={item.checked}
                                        onChange={() => handleCheckboxChange(item.CommonFieldId)}
                                        color="primary"
                                    />
                                }
                                label={item.CommonFieldName}
                            />
                        </Grid>
                    ))}
                </Grid>
            </FormGroup>
        </Box>
    );
};

export default CheckboxList;
