import { useTheme, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Styles } from 'src/assets/style/student-style';
import Card1 from 'src/libraries/mainCard/Card1';
import { Link, useLocation } from 'react-router-dom';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

function List1({ items }) {
  
  const classes = Styles();
  const maxLength = 1;
  let text1Length = Math.max(...items.map((o) => o.text1.length));
  let headerLength = Math.max(...items.map((o) => o.header.length));
  let rowWidth = 12;
  {
    items.map((item, index) => {
      if(item.header.toString().length > headerLength)
      headerLength = item.header.toString().length
      if(item.text1.toString().length > text1Length)
      text1Length = item.text1.toString().length
    })
    items.map((item, index) => {
        if (item.text2 === undefined && item.text3 === undefined) {
          if (!(headerLength > maxLength || text1Length > maxLength)) 
          {
            rowWidth = 6;
          }
        }
    });
  }
  return (
    <>

    {
      (items.length == 0)
      ?
      <ErrorMessages Error={'No records found'} />
      :
      <Grid container >
        {items.map((items, index) => (
          <Grid xs={rowWidth} key={index}>
            
          {(items.linkPath === '' || items.linkPath === undefined)? 
          
          <Card1 
          header={items.header}
          text1={items.text1}
          text2={items.text2}
          text3={items.text3}
          isSelected={items.isSelected}
          Color={items.backgroundColor}
          margin={items.mx}
           RealatedSection={items.RealatedSection}
          FileName={items.FileName}
          key={items.id}
        />
          : (
             <Link style={{ color:"#424242",textDecoration:"none" }}
                  to={
                    `/${
                     location.pathname.split('/')[1]
                  }` + items.linkPath
                 }
                >
            <Card1
              header={items.header}
              text1={items.text1}
              text2={items.text2}
              text3={items.text3}
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