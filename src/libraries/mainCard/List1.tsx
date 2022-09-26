import { Grid } from '@mui/material';
import Card1 from 'src/libraries/mainCard/Card1';
import { Link } from 'react-router-dom';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

function List1({ items }) {

  return (
    <>

      {
        (items.length == 0)
          ?
          <ErrorMessages Error={'No records found'} />
          :
          <Grid container >
            {items.map((items, index) => (
              <Grid item xs={12} key={index}>

                {(items.linkPath === '' || items.linkPath === undefined) ?

                  <Card1
                    header={items.header}
                    text1={items.text1} text2={items.text2} text3={items.text3} text5={items.text5}
                    isSelected={items.isSelected}
                    Color={items.backgroundColor}
                    margin={items.mx}
                    RealatedSection={items.RealatedSection}
                    FileName={items.FileName}
                    key={items.id}
                  />
                  : (
                    <Link style={{ color: "#424242", textDecoration: "none" }}
                      to={
                        `/${location.pathname.split('/')[1]
                        }` + items.linkPath
                      }
                    >
                      <Card1
                        header={items.header}
                        text1={items.text1} text2={items.text2} text3={items.text3} text5={items.text5}
                        isSelected={items.isSelected}
                        Color={items.backgroundColor}
                        margin={items.mx}
                        FileName={items.FileName}
                        key={items.id}
                      />
                    </Link>
                  )}
              </Grid>
            ))}
          </Grid>
      }
    </>
  );
}

export default List1;