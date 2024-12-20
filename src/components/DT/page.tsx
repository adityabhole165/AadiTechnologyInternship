import { Column } from "./DT";

const page = () => {
    const columns: Column[] = [
        {
            id: 'Name',
            label: "Name",
            renderCell: (rowData) => rowData.Name,
        },
    ]
    return (
        <div>
            {/* <DT columns={columns} data={[]}></DT> */}
        </div>
    )
}

export default page