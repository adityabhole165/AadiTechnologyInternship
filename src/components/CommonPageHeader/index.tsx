import { ChevronRightTwoTone, HomeTwoTone } from "@mui/icons-material";
import { Box, Breadcrumbs, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
    navLinks: {
        title: string;
        path: string;
    }[];
    rightActions?: React.ReactNode;
};

const CommonPageHeader = ({ navLinks, rightActions }: Props) => {
    const navigate = useNavigate();  // Hook to use navigate

    // Function to handle internal navigation
    const handleNavigation = (path: string) => {
        navigate(path, { state: { fromInternal: true } }); // Passing the state
    };

    return (
        <Box sx={{ pt: 4, pb: 2 }}>
            <Grid container spacing={2} alignItems="center">
                {/* Left Section */}
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        separator={<ChevronRightTwoTone fontSize="small" />}
                        sx={{
                            '& .MuiBreadcrumbs-separator': {
                                marginLeft: '4px',
                                marginRight: '4px',
                            },
                        }}
                    >
                        <Link
                            to={'/RITeSchool/landing/landing'}
                            color="inherit"
                            style={{ textDecoration: 'none' }}
                        >
                            <IconButton
                                sx={{
                                    background: (theme) => theme.palette.common.white,
                                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)',
                                }}
                            >
                                <HomeTwoTone color="primary" />
                            </IconButton>
                        </Link>
                        {navLinks.slice(0, navLinks.length - 1).map((navLink, index) => (
                            <Typography
                                key={index}
                                variant={'h3'}
                                fontSize={{
                                    xs: '12px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                }}
                                fontWeight={'normal'}
                                color={'text.primary'}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        fontWeight: 'bold',
                                    },
                                }}
                                onClick={() => handleNavigation(navLink.path)}  // Handle navigation on click
                            >
                                {navLink.title}
                            </Typography>
                        ))}
                        {navLinks[navLinks.length - 1] && (
                            <Typography
                                variant={'h3'}
                                fontSize={{
                                    xs: '12px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                }}
                                color="text.primary"
                            >
                                {navLinks[navLinks.length - 1].title}
                            </Typography>
                        )}
                    </Breadcrumbs>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} sm={6} md={6} lg={6} display="flex" justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                    <Stack direction="row" alignItems="right" gap={1}>
                        {rightActions}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CommonPageHeader;
