import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
    useMediaQuery
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

// Define props interface
interface TemplateRow {
    Id: string;
    Name: string;
    Value: string;
}

interface UserTemplateIdFormProps {
    rows: TemplateRow[];

}

const UserTemplateIdForm: React.FC<UserTemplateIdFormProps> = ({ rows }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



    // // Sorting state
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<string | null>(null);

    // // Handle sorting by toggling between asc and desc
    // const handleSortDirectionChange = (field: string) => {
    //     setOrderBy(field);
    //     setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    // };

    // // Sort rows based on the current sort direction
    // const sortedRows = [...rows].sort((a, b) => {
    //     if (orderBy === "name") {
    //         if (a.Name < b.Name) return sortDirection === "asc" ? -1 : 1;
    //         if (a.Name > b.Name) return sortDirection === "asc" ? 1 : -1;
    //     }
    //     return 0;
    // });


    const sortedRows = [...rows].sort((a, b) => {
        if (!orderBy) return 0; // If no column is selected for sorting, do nothing

        const fieldA = a[orderBy]?.toString().toLowerCase(); // Ensure case-insensitive sorting
        const fieldB = b[orderBy]?.toString().toLowerCase();

        if (a.Name < b.Name) return sortDirection === "asc" ? -1 : 1;
        if (a.Name > b.Name) return sortDirection === "asc" ? 1 : -1;
        return 0; // If equal, no change in order
    });


    const handleSortDirectionChange = (field: string) => {
        setOrderBy(field);
        setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    };


    const [selectedRow, setSelectedRow] = useState(null);

    // Function to handle radio button selection
    const handleRadioChange = (Id) => {
        setSelectedRow(Id); // Set the selected row ID
    };


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
                    {sortedRows.map((rows) => (
                        <Card key={rows.Id} sx={{ mb: 2, backgroundColor: blue[50] }}>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <TableCell>
                                        <Radio color="primary"
                                            checked={selectedRow === rows.Id}
                                            onChange={() => handleRadioChange(rows.Id)} />
                                    </TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                        Registration No.: {rows.Id}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    Name:
                                </Typography>
                                <Typography variant="body2">{rows.Name}</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    Template:
                                </Typography>
                                <Typography variant="body2">{rows.Value}</Typography>
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
                            {sortedRows.map((rows) => (
                                <TableRow key={rows.Id}>
                                    <TableCell>
                                        <Radio color="primary" />
                                    </TableCell>

                                    {/* <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.Id}
                                    onClick={() => setSelectedTemplate(row)}
                                    selected={selectedTemplate?.Id === row.Id}
                                >
                                    <TableCell>
                                        <Radio
                                            checked={selectedTemplate?.Id === row.Id}
                                            onChange={() => setSelectedTemplate(row)}
                                        />
                                    </TableCell> */}
                                    <TableCell>{rows.Id}</TableCell>
                                    <TableCell>{rows.Name}</TableCell>
                                    <TableCell>{rows.Value}</TableCell>
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





