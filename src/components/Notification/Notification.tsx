import React from 'react'
import PageHeader from 'src/libraries/heading/PageHeader'
import Card4 from 'src/libraries/mainCard/Card4';
import Card1 from 'src/libraries/mainCard/Card1';
import { Container } from '@mui/system';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import List1 from 'src/libraries/mainCard/List1';


const Notification = () => {

    const notification = [
        {
            header: "homework assigned to class 2",
            text3: "19-Oct-2022",
            text2: "03:30pm"
        },
        {
            header: "homework assigned to class 4",
            text3: "16-Oct-2022",
            text2: "04:30pm"
        },
        {
            header: "Fees page change  ",
            text3: "13-Oct-2022",
            text2: "05:30pm"
        },
        
    ]
    return (
        <>
        <Container>
        <PageHeader heading={'Notification'} subheading={''} />
         <List1 items={notification} />
        </Container>
        </>
    )
}

export default Notification