import { Box, IconButton, Tooltip } from '@mui/material';
import { grey } from "@mui/material/colors";

const HeaderIcons = ({ IconList, ClickIcon }) => {
    return (
        <>
            {IconList.map((Item, i) => {
                return (
                    <Box key={i}>
                        <Tooltip title={Item.Title}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': { backgroundColor: grey[700] }
                                }}
                                onClick={() => { ClickIcon(Item.Action); }}
                            >
                                {Item.Icon}
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            })}

        </>
    )
}

export default HeaderIcons