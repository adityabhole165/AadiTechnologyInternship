import { TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

// Format time to 24-hour format (HH:mm)
const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export const TimepickerTwofields1 = ({
    Item,
    ClickItem,
    label,
    size,
    isMandatory = true,
   
    isStartTime = false,
    isEndTime = false,
}) => {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        if (isStartTime) {
            setCurrentTime("00:00");
        } else if (isEndTime) {
            setCurrentTime("23:59");
        } else {
            const now = new Date();
            setCurrentTime(formatTime(now));
        }
    }, [isStartTime, isEndTime]);

    useEffect(() => {
        if (!Item) {
            ClickItem(currentTime);
        }
    }, [currentTime, Item, ClickItem]);

    return (
        <div>
            
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
                    value={Item || currentTime}
                    onChange={(e) => ClickItem(e.target.value)}
                    fullWidth
                    size={size || 'medium'}
                />
            
        </div>
    );
};