import { Grid } from "@mui/material"
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
        <Grid container><Grid xs={3}>
            <Dropdown Array={ItemList.StandardList} label={'Standard'}
                defaultValue={DefaultValue.Standard}
                handleChange={(value) => { handleChange(value, "Standard") }}
            ></Dropdown>
        </Grid><Grid xs={3}>
                <Dropdown Array={ItemList.StandardDivisionList}
                    label={'Standard Division'} defaultValue={DefaultValue.StandardDivision}
                    handleChange={(value) => { handleChange(value, "StandardDivision") }}
                ></Dropdown>
            </Grid><Grid xs={3}>
                <Dropdown Array={ItemList.MonthList}
                    label={'Month'} defaultValue={DefaultValue.Month}
                    handleChange={(value) => { handleChange(value, "Month") }}
                ></Dropdown>
            </Grid><Grid xs={3}>
                <Dropdown Array={ItemList.YearList}
                    label={'Year'} defaultValue={DefaultValue.Year}
                    handleChange={(value) => { handleChange(value, "Year") }}
                ></Dropdown>
            </Grid>
        </Grid>
    )
}

export default SearchAnnualPlanner