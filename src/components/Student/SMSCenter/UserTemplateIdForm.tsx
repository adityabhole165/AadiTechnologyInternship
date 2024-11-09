import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Radio,
    Box,
    Typography,
    TableSortLabel,
    Card,
    CardContent,
    Divider,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

// Define props interface
interface TemplateRow {
    registrationNo: string;
    name: string;
    template: string;
}

interface UserTemplateIdFormProps {
    rows: TemplateRow[];
}

const UserTemplateIdForm: React.FC<UserTemplateIdFormProps> = ({ rows }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Sorting state
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<string | null>(null);

    // Handle sorting by toggling between asc and desc
    const handleSortDirectionChange = (field: string) => {
        setOrderBy(field);
        setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    };

    // Sort rows based on the current sort direction
    const sortedRows = [...rows].sort((a, b) => {
        if (orderBy === "name") {
            if (a.name < b.name) return sortDirection === "asc" ? -1 : 1;
            if (a.name > b.name) return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
    });

    return (
        <Box>
            {/* Legend */}
            <Box display="flex" alignItems="center" sx={{ mb: 2, backgroundColor: "white" }}>
                <Typography variant="body2" sx={{ mr: 1, fontWeight: "bold" }}>
                    Legend
                </Typography>
                <Box
                    sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: blue[50],
                        border: "1px solid #ddd",
                        mr: 1,
                    }}
                />
                <Typography variant="body2">System Template</Typography>
            </Box>

            {/* Conditional Rendering for Mobile (Card View) and Desktop (Table View) */}
            {isMobile ? (
                // Card view for mobile
                <Box>
                    {sortedRows.map((row) => (
                        <Card key={row.registrationNo} sx={{ mb: 2, backgroundColor: blue[50] }}>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <Radio color="primary" />
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                        Registration No.: {row.registrationNo}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    Name:
                                </Typography>
                                <Typography variant="body2">{row.name}</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    Template:
                                </Typography>
                                <Typography variant="body2">{row.template}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                // Table view for desktop
                <TableContainer component={Box}>
                    <Table
                        aria-label="simple table"
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                            overflow: "hidden",
                        }}
                    >
                        <TableHead>
                            <TableRow
                                sx={{
                                    background: theme.palette.secondary.main,
                                    color: theme.palette.common.white,
                                }}
                            >
                                <TableCell></TableCell>
                                <TableCell sx={{ color: "white", textAlign: "left" }}>
                                    Registration No.
                                </TableCell>
                                <TableCell sx={{ color: "white", textAlign: "left" }}>
                                    <TableSortLabel
                                        active={orderBy === "name"}
                                        direction={sortDirection}
                                        onClick={() => handleSortDirectionChange("name")}
                                        IconComponent={
                                            sortDirection === "asc"
                                                ? ArrowCircleUpIcon
                                                : ArrowCircleDownIcon
                                        }
                                        sx={{
                                            color: "white !important", // Text color
                                            "& .MuiTableSortLabel-icon": {
                                                color: "white !important", // Arrow icon color
                                            },
                                        }}
                                    >
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ color: "white", textAlign: "left" }}>
                                    Template
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows.map((row) => (
                                <TableRow key={row.registrationNo}>
                                    <TableCell>
                                        <Radio color="primary" />
                                    </TableCell>
                                    <TableCell>{row.registrationNo}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.template}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default UserTemplateIdForm;
