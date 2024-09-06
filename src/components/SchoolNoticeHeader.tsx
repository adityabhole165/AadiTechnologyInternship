import ChevronRightTwoTone from "@mui/icons-material/ChevronRightTwoTone"
import HomeTwoTone from "@mui/icons-material/HomeTwoTone"
import { Box, Breadcrumbs, IconButton, Stack, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

type Props = {
    navLinks: {
        title: string;
        path: string;
    }[];
    rightActions?: React.ReactNode;
}

const SchoolNoticeHeader = ({ navLinks, rightActions }: Props) => {
    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
                pt: 2,
                pb: 2
            }}
        >
            <Box>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<ChevronRightTwoTone fontSize="small" />}
                    sx={{
                        '& .MuiBreadcrumbs-separator': {
                            marginLeft: '4px',
                            marginRight: '4px'
                        }
                    }}
                >
                    <Link
                        to={'/schoolList'}
                        color="inherit"
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
                    {navLinks.slice(0, navLinks.length - 1).map((navLink, index) => (
                        <Link
                            key={index}
                            to={navLink.path}
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            <Typography
                                variant={'h3'}
                                fontSize={'18px'}
                                fontWeight={'normal'}
                                color={'text.primary'}
                                sx={{
                                    '&:hover': {
                                        fontWeight: 'bold'
                                    }
                                }}
                            >
                                {navLink.title}
                            </Typography>
                        </Link>
                    ))}
                    {navLinks[navLinks.length - 1] && (
                        <Typography variant={'h3'} fontSize={'18px'} color="text.primary">
                            {navLinks[navLinks.length - 1].title}
                        </Typography>
                    )}
                </Breadcrumbs>
            </Box>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
                {rightActions}
            </Stack>
        </Stack>
    )
}

export default SchoolNoticeHeader