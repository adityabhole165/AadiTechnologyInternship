import { useState } from 'react'
import { Card, Typography } from '@mui/material';

export const Card30 = ({ header }) => {
    const [enableRow, setEnableRow] = useState(-1)
    const expand = (index) => {
        if (enableRow === index)
            setEnableRow(-1)
        else
            setEnableRow(index)
    }
    return (
        <>
            {
                header.map((Header) => (
                    <Card key={Header.Id}>
                        <Typography
                            onClick={() => expand(Header.Id)}>
                            {Header.Name}
                        </Typography>
                        {
                            Header.Child.map((Detail) => (
                                enableRow === Header.Id &&
                                <Card key={Detail.Id}>
                                    <Typography>{Detail.Name}</Typography>
                                    <Typography>{Detail.Value}</Typography>
                                </Card>
                            ))
                        }
                    </Card>
                ))
            }
        </>
    )
}
export default Card30;