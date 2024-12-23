import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card1 from 'src/libraries/mainCard/Card1';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import { encodeURL } from 'src/components/Common/Util';
function List5({
  items,
  SelectedMonth = null,
  SelectedYear = null,
  linkParams = ''
}) {
  const navigate = useNavigate();
  const clickCard = (path) => {
    if (location.pathname.split('/')[1].toLocaleLowerCase() === 'schoolnotice')
      navigate('../' + path.replace('/Common/', ''));
    else if (path !== undefined) {
      if (SelectedMonth === null)
        navigate(
          '/RITeSchool/' +
          encodeURL(path.replace('%', encodeURIComponent('%'))) +
          encodeURL(linkParams)
        );
      else
        navigate(
          '/RITeSchool/' +
          encodeURL(path.replace('%', encodeURIComponent('%')) )+
          '/' +
          encodeURL(SelectedMonth) +
          '/' +
          encodeURL(SelectedYear)
        );
    }
  };
  return (
    <>
      {items.length == 0 ? (
        <ErrorMessages Error={'No records found'} />
      ) : (
        <Grid container>
          {items.map((items, index) => (
            <Grid item xs={12} key={index}>
              <Card1
                header={items.header}
                text1={items.text1}
                text2={items.text2}
                text3={items.text3}
                text4={items.text4}
                text5={items.text5}
                text6={items.text6}
                Color={items.backgroundColor}
                Textcolor={items.Textcolor}
                margin={items.mx}
                FileName={items.FileName}
                key={items.id}
                clickCard={() => {
                  clickCard(items.linkPath);
                }}
              />
              {/* {(items.linkPath === '' || items.linkPath === undefined) ?

                  <Card1
                    header={items.header}
                    text1={items.text1} text2={items.text2} text3={items.text3} text4={items.text4} text5={items.text5} text6={items.text6}
                    Color={items.backgroundColor}
                    margin={items.mx}
                    FileName={items.FileName}
                    key={items.id}
                    clickCard={clickCard}
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
                        text1={items.text1} text2={items.text2} text3={items.text3} text4={items.text4} text5={items.text5} text6={items.text6}
                        Color={items.backgroundColor}
                        margin={items.mx}
                        FileName={items.FileName}
                        key={items.id}
                      />
                    </Link>
                  )} */}
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default List5;
