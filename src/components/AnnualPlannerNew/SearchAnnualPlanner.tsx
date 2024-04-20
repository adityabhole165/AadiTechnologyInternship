import { Box, Stack } from "@mui/material"
import Dropdown from "src/libraries/dropdown/Dropdown"

const SearchAnnualPlanner = ({ ItemList, ClickItem, DefaultValue }) => {

    const handleChange = (value, selectedItem) => {
        ClickItem({
            Standard: selectedItem == "Standard" ? value : DefaultValue.Standard,
            StandardDivision: selectedItem == "StandardDivision" ? value : DefaultValue.StandardDivision,
            Month: selectedItem == "Month" ? value : DefaultValue.Month,
            Year: selectedItem == "Year" ? value : DefaultValue.Year
        })
    }
    return (
        <Stack direction={'row'} gap={1}>
            <Box sx={{ minWidth: 130 }}>
                <Dropdown size={"small"} variant={"outlined"}
                    Array={ItemList.StandardList}
                    label={'Select Standard'}
                    defaultValue={DefaultValue.Standard}
                    handleChange={(value) => { handleChange(value, "Standard") }}
                ></Dropdown>
            </Box>
            <Box sx={{ minWidth: 130 }}>
                <Dropdown size={"small"} variant={"outlined"}
                    Array={ItemList.StandardDivisionList}
                    label={'Select Division'} defaultValue={DefaultValue.StandardDivision}
                    handleChange={(value) => { handleChange(value, "StandardDivision") }}
                ></Dropdown>

            </Box>
            <Box sx={{ minWidth: 130 }}>
                <Dropdown size={"small"} variant={"outlined"}
                    Array={ItemList.MonthList}
                    label={'Select Month'} defaultValue={DefaultValue.Month}
                    handleChange={(value) => { handleChange(value, "Month") }}
                ></Dropdown>

            </Box>
            <Box sx={{ minWidth: 130 }}>
                <Dropdown size={"small"} variant={"outlined"}
                    Array={ItemList.YearList}
                    label={'Select Year'} defaultValue={DefaultValue.Year}
                    handleChange={(value) => { handleChange(value, "Year") }}
                ></Dropdown>
            </Box>
        </Stack>
    )
}

export default SearchAnnualPlanner