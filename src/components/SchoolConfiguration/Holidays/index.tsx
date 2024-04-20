import Add from "@mui/icons-material/Add"
import Delete from "@mui/icons-material/Delete"
import Edit from "@mui/icons-material/Edit"
import QuestionMark from "@mui/icons-material/QuestionMark"
import { Box, IconButton, Tooltip } from "@mui/material"
import React from "react"
import CommonPageHeader from "src/components/CommonPageHeader"
import DataTable, { Column, RowData } from "src/components/DataTable"

type Props = {}

const Holidays = (props: Props) => {
    const [holidayColumns, setHolidayColumns] = React.useState<Column[]>([
        {
            id: 'startDate',
            label: 'Start Date',
            renderCell: (rowData) => rowData.startDate,
        },
        {
            id: 'endDatte',
            label: 'End Date',
            renderCell: (rowData) => rowData.endDate,
        },
        {
            id: 'name',
            label: 'Name',
            renderCell: (rowData) => rowData.name,
        },
        {
            id: 'associatedClasses',
            label: 'Associated Classes',
            renderCell: (rowData) => rowData.associatedClasses,
        },
        {
            id: 'totalDays',
            label: 'Total Days',
            renderCell: (rowData) => rowData.totalDays,
            cellProps: {
                align: 'center'
            },
            headerCellProps: {
                align: 'center'
            }
        }])
    if (true) {
        holidayColumns.push(
            {
                id: 'edit',
                label: 'Edit',
                renderCell: (rowData) => <Box>
                    <IconButton sx={{ p: 0 }} color={"primary"}
                        onClick={() => {
                            handleDelete(rowData);
                        }}>
                        <Edit />
                    </IconButton>
                </Box>,
                cellProps: {
                    align: 'center'
                },
                headerCellProps: {
                    align: 'center'
                }
            },
            {
                id: 'delete',
                label: 'Delete',
                renderCell: (rowData) => <Box>
                    <IconButton sx={{ p: 0 }} color={"error"}
                        onClick={() => {
                            handleEdit(rowData);
                        }}>
                        <Delete />
                    </IconButton>
                </Box>,
                cellProps: {
                    align: 'center'
                },
                headerCellProps: {
                    align: 'center'
                }
            })
    }
    const [holidays, setHolidays] = React.useState<RowData[]>([
        {
            startDate: '2021-01-01',
            endDate: '2021-01-01',
            name: 'Navratri',
            associatedClasses: 'Nursery(A)',
            totalDays: 1,
        },
        {
            startDate: '2021-01-01',
            endDate: '2021-01-01',
            name: 'Navratri',
            associatedClasses: 'Nursery(B)',
            totalDays: 4,
        },
        {
            startDate: '2021-01-01',
            endDate: '2021-01-01',
            name: 'Navratri',
            associatedClasses: 'Nursery(C)',
            totalDays: 3,
        }
    ]);

    const handleDelete = (holidays) => {

    }
    const handleEdit = (holidays) => {

    }
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'School Configuration',
                        path: '/extended-sidebar/Admin/SchoolConfiguration'
                    },
                    {
                        title: 'Holidays',
                        path: ''
                    }
                ]}
                rightActions={<>
                    <Box>
                        <Tooltip title={"Holiday list for the current year declared by your school."}>
                            <IconButton sx={{
                                bgcolor: 'grey.500',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'grey.600'
                                }
                            }}>
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title={"Add new"}>
                            <IconButton sx={{
                                bgcolor: 'grey.500',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'grey.600'
                                }
                            }}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>}
            />
            {/* Content */}
            <Box sx={{ background: 'white', p: 2 }}>
                <DataTable
                    columns={holidayColumns}
                    data={holidays}
                    isLoading={false}
                />
            </Box>
        </Box>
    )
}

export default Holidays