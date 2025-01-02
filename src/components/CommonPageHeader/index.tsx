import ChevronRightTwoTone from "@mui/icons-material/ChevronRightTwoTone";
import HomeTwoTone from "@mui/icons-material/HomeTwoTone";
import { Box, Breadcrumbs, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
    navLinks: {
        title: string;
        path: string;
    }[];
    rightActions?: React.ReactNode;
};


const CommonPageHeader = ({ navLinks, rightActions }: Props) => {
    return (
        <Box sx={{ pt: 4, pb: 2 }}>
            <Grid container spacing={2} alignItems="center">
                {/* Left Section */}
                <Grid item xs={12} sm={6}>
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
                            <Link
                                key={index}
                                to={navLink.path}
                                
                                style={{
                                    textDecoration: 'none',
                              }}
                            >
                                <Typography
                                    variant={'h3'}
                                    fontSize={{
                                        xs: '10px',
                                        sm: '12px',
                                        md: '16px',
                                        lg: '18px',
                                    }}
                                    fontWeight={'normal'}
                                    color={'text.primary'}
                                    sx={{
                                        '&:hover': {
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    {navLink.title}
                                </Typography>
                            </Link>
                        ))}
                        {navLinks[navLinks.length - 1] && (
                            <Typography
                                variant={'h3'}
                                fontSize={{
                                    xs: '12px',
                                    sm: '12px',
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
                <Grid item xs={12} sm={6} display="flex" justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                    <Stack direction="row" alignItems="right" gap={1}>
                        {rightActions}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CommonPageHeader;
