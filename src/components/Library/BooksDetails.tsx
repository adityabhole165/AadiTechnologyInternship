import  React from 'react';
import Accordion4 from 'src/libraries/accordion/accordion4';
import {GetBooksDetailsResult,} from 'src/interfaces/Student/Library';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
function BooksDetails({GetBookList}) {
const [expanded, setExpanded] = React.useState<string | false>(false);
   const handleChange = (panel) => (event, isExpanded) => {
     setExpanded(isExpanded ? panel : false);
   };

 const confirmsg = () =>{
  if (confirm('Do you want to claim this book for Parent?')) {
              console.log('');
        } else {
      
  }
 
}
  return (
    <>
 
      <div>
     
        {GetBookList.length === 0 ? (
          <ErrorMessages Error={'No records found'} />
        ) : (
          <>
            {GetBookList.map((items: GetBooksDetailsResult, i) => {
              return (
                <Accordion4
                  key={i}
                  index={i}
                  Bookk={GetBookList}
                  author={items.Author_Name}
                  publisher={items.Published_By}
                  standard={items.Standards}
                  language={items.Language}
                  available={items.Available_Books}
                  total={items.Total_Book_Quantity}
                  title={items.Book_Title}
                  conformMsg={confirmsg}
                  no={items.Book_No}
                  Collapse={handleChange}
                  expand={expanded}
                />
              );
            })}
          </>
        )}

      </div>
    </>
  );
}
export default BooksDetails;
