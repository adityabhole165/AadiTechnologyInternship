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
    IsConfirm;
    onTemplateSelect: (id: string) => void;
}

const UserTemplateIdForm: React.FC<UserTemplateIdFormProps> = ({ rows, onTemplateSelect, IsConfirm }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Sorting state
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<string | null>('Name');
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    // Handle sorting by toggling between asc and desc
    const handleSortDirectionChange = (field: string) => {
        setOrderBy(field);
        setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    };

    // Sort rows based on the current sort direction
    const handleRadioChange = (id) => {
        setSelectedRow(id);
        onTemplateSelect(id);
    };


    const sortedRows = [...rows]
        .sort((a, b) => {
            const comparison = a.Name.localeCompare(b.Name); // Sorting only by Name
            return sortDirection === 'asc' ? comparison : -comparison; // Respecting sortDirection
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
                        <Card key={row.Id} sx={{ mb: 2, backgroundColor: blue[50] }}>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <TableCell>
                                        <Radio
                                            color="primary"
                                            checked={selectedRow === row.Id}
                                            value={row.Id}
                                            onChange={() => handleRadioChange(row.Id)}
                                        />
                                    </TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                        Registration No.: {row.Id}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    Name:
                                </Typography>
                                <Typography variant="body2">{row.Name}</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    Template:
                                </Typography>
                                <Typography variant="body2">{row.Value}</Typography>
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
                                    <strong>  Registration No.   </strong>
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    <b
                                        onClick={() => handleSortDirectionChange("Name")}
                                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                                    >
                                        Name {orderBy === "Name" && (sortDirection === "asc" ? <ArrowCircleUpIcon /> : <ArrowCircleDownIcon />)}
                                    </b>
                                </TableCell>
                                <TableCell sx={{ color: "white", textAlign: "left" }}>
                                    <strong>  Template</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Radio
                                            color="primary"
                                            checked={selectedRow === row.Id}
                                            onChange={() => handleRadioChange(row.Id)}
                                        />
                                    </TableCell>
                                    <TableCell>{row.Id}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.Value}</TableCell>
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
