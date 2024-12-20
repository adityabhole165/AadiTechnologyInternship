import ChevronRightTwoTone from "@mui/icons-material/ChevronRightTwoTone";
import HomeTwoTone from "@mui/icons-material/HomeTwoTone";
import { Breadcrumbs, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const BreadCrumbs = ({ ItemList }) => {
    return (<>
        <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRightTwoTone />}>
            <Link to={'/RITeSchool/landing/landing'} color="inherit"
                style={{ textDecoration: 'none' }}
            >
                <IconButton
                    sx={{
                        background: (theme) => theme.palette.common.white,
                        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                    }}
                >
                    <HomeTwoTone color="primary" />
                </IconButton>
            </Link>
            {ItemList
                .filter((Item) => { return !Item.IsActive })
                .map((Item, i) => {
                    return (
                        <Link to={Item.Value} style={{ textDecoration: 'none' }} key={i}>
                            <Typography variant={'h3'} fontSize={'23px'}
                                fontWeight={'normal'} color={'text.primary'}
                                sx={{ '&:hover': { fontWeight: 'bold' } }}
                            >
                                {Item.Name}
                            </Typography>
                        </Link>
                    )
                })
            }

            {ItemList
                .filter((Item, i) => { return Item.IsActive })
                .map((Item, i) => {
                    return (
                        <Typography variant={'h3'} fontSize={'23px'}
                            color="text.primary" key={i}>
                            {Item.Name}
                        </Typography>)
                })
            }
        </Breadcrumbs>
    </>)
}

export default BreadCrumbs