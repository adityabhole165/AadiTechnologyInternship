import { Container } from '@mui/material';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Card13 from '../mainCard/Card13';
function List9({ itemList }) {
  return (
    <Container>
      {itemList.length === 0 ? (
        <ErrorMessages Error={'No records found'} />
      ) : (
        <>
          {itemList.map((item, i) => {
            return (
              <div key={i}>
                <Card13
                  Text1={item.Book_Title}
                  Text3={item.Issue_Date}
                  Text2={item.Return_Date}
                  Text4={item.IsForParent}
                  Text5={item.Book_No}
                />
              </div>
            );
          })}
        </>
      )}
    </Container>
  );
}

export default List9;
