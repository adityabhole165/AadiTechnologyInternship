import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const TimeField = ({ Item, ClickItem, label, size, isMandatory = true }) => {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
    }, []);

    useEffect(() => {
        ClickItem(currentTime);
    }, [currentTime, ClickItem]);

    const handleChange = (e) => {
        setCurrentTime(e.target.value);
    };

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
                value={currentTime}
                onChange={handleChange}
                fullWidth
                size={size || 'medium'}
            />

        </div>
    );
};

export default TimeField;
