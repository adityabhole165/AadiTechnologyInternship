import { TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const TimepickerTwofields = ({
    Item,
    ClickItem,
    label,
    size,
    isMandatory = true,
    tooltipMessage,
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
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        }
    }, [isStartTime, isEndTime]);

    useEffect(() => {
        if (!Item) {
            ClickItem(currentTime);
        }
    }, [currentTime, Item, ClickItem]);

    return (
        <div>
            <Tooltip title={tooltipMessage}>
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
            </Tooltip>
        </div>
    );
};

export default TimepickerTwofields;
