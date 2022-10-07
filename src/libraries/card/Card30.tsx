import { useState } from 'react';
import Card32 from './Card32';
import List23 from '../list/List23';
import { ListStyle } from '../styled/CardStyle';

export const Card30 = ({ header }) => {

    const [enableRow, setEnableRow] = useState(-1)

    return (<>
        {
            header.map((Header, index) => (
                <ListStyle key={index}>
                    <Card32 Id={index} Name={Header.Name}
                        expand={() => setEnableRow(enableRow === index ? -1 : index)}
                        isActive={enableRow === index} />
                    {enableRow === index &&
                        <List23 data={Header.Child} />
                    }
                </ListStyle>
            ))
        }
    </>)
}
export default Card30;