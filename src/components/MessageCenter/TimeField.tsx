import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const TimepickerTwofields1 = ({
    Item,
    ClickItem,
    label,
    size,
    isMandatory = true,
    isStartTime = false,
    isEndTime = false,
}) => {
    // Local state to manage the input
    const [localTime, setLocalTime] = useState("");

    // Update local state when Item prop changes
    useEffect(() => {
        // If Item is null/undefined/empty, reset local state
        if (!Item) {
            setLocalTime("");
        } else {
            setLocalTime(Item);
        }
    }, [Item]);

    // Handle time change
    const handleTimeChange = (e) => {
        const newTime = e.target.value;

        // Update local state
        setLocalTime(newTime);

        // Notify parent component
        ClickItem(newTime);
    };

    return (
        <TextField
            label={
                label ? (
                    <>
                        {label} {isMandatory && <span style={{ color: 'red' }}>*</span>}
                    </>
                ) : (
                    "Select Time"
                )
            }
            type="time"
            value={localTime}
            onChange={handleTimeChange}
            fullWidth
            size={size || 'medium'}
        />
    );
};