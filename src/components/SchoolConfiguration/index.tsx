import CheckTwoTone from "@mui/icons-material/CheckTwoTone";
import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CommonPageHeader from "../CommonPageHeader";
import DataTable, { Column } from "../DataTable";

type Props = {}

const SchoolConfiguration = (props: Props) => {
    const [selectedTabValue, setSelectedTabValue] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [configurationOptions, setConfigurationOptions] = React.useState([
        {
            id: 0,
            title: 'Attendance Related',
            configurations: [
                {
                    id: 0,
                    title: 'Weekdays',
                    link: '/RITeSchool/Admin/SchoolConfiguration/Weekdays',
                    status: true
                },
                {
                    id: 1,
                    title: 'Holidays',
                    link: '/RITeSchool/Admin/SchoolConfiguration/Holidays',
                    status: true
                },
                {
                    id: 2,
                    title: 'Missing Attendance Alert Configuration',
                    link: '/RITeSchool/Admin/SchoolConfiguration/MissingAttendanceAlertConfiguration',
                    status: true
                }
            ]
        }
    ]);
    const configurationColumns: Column[] = [
        {
            id: 'status',
            label: 'Status',
            renderCell: (rowData) => (
                <Box>
                    {rowData.status ? <CheckTwoTone color={"success"} /> : <CloseTwoTone color={"error"} />}
                </Box>
            )
        },
        {
            id: 'configuration',
            label: 'Configuration',
            renderCell: (rowData) => <Link to={rowData.link}>
                <Typography variant={"h4"}>
                    {rowData.title}
                </Typography>
            </Link>
        }
    ]

    const handleTabSelectionChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTabValue(newValue);
    };


    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'School Configuration',
                        path: ''
                    }
                ]}
            />
            <Box sx={{ backgroundColor: 'white', p: 2, }} ref={containerRef}>
                <Box sx={{
                    overflowX: 'auto'
                }}>
                    <Tabs
                        value={selectedTabValue}
                        onChange={handleTabSelectionChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {configurationOptions.map((option, index) => (
                            <Tab key={option.id} label={option.title} />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <DataTable
                        columns={configurationColumns}
                        data={configurationOptions[selectedTabValue].configurations}
                    />
                </Box>
            </Box>
        </Box >
    )
}

export default SchoolConfiguration