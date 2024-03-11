import { Box, IconButton, Tooltip } from '@mui/material';

const HeaderIcons = ({ IconList, ClickIcon }) => {
    return (
        <>
            {IconList.map((Item, i) => {
                return (
                    <Box key={i}>
                        <Tooltip title={Item.Title}>
                            <IconButton
                                sx={Item.sx}
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