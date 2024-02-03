import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TimerCard from 'src/libraries/card/TimerCard';
import ListCard from 'src/libraries/list/ListCard';
import ListSelect from 'src/libraries/list/ListSelect';
const Exam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [listCardItems, setListCardItems] = useState([]);
  const [itemlist, setItemlist] = useState([
    {
      Parent: {
        Id: 1,
        Name: 'Are you Indian',
        isSingleSelect: true
      },
      Child: [
        {
          Id: 1,
          Name: 'True',
          Value: 1,
          isActive: false
        },
        {
          Id: 2,
          Name: 'False',
          Value: 2,
          isActive: false
        }
      ]
    },
    {
      Parent: {
        Id: 2,
        Name: 'where is pune',
        isSingleSelect: false
      },
      Child: [
        {
          Id: 1,
          Name: 'maharashtra',
          Value: 1,
          isActive: false
        },
        {
          Id: 2,
          Name: 'tamilnadu',
          Value: 2,
          isActive: false
        }
      ]
    },
    {
      Parent: {
        Id: 2,
        Name: 'who is prime minister',
        isSingleSelect: false
      },
      Child: [
        {
          Id: 1,
          Name: 'Modi',
          Value: 1,
          isActive: false
        },
        {
          Id: 2,
          Name: 'Ajit',
          Value: 2,
          isActive: false
        }
      ]
    }
  ]);
  useEffect(() => {
    setListCardItems(
      itemlist.map((item, index) => {
        return {
          Id: item.Parent.Id,
          Name: index,
          IsAnswered: false
        };
      })
    );
  }, []);
  let maxIndex = itemlist.length - 1;
  const onChange = (value) => {
    setItemlist((prev) =>
      prev.map((obj, i) => {
        if (i == currentIndex) return { Parent: obj.Parent, Child: value };
        else return obj;
      })
    );
    setListCardItems((prev) =>
      listCardItems.map((obj, i) => {
        if (i == currentIndex) {
          return { ...obj, IsAnswered: getIsAnswer(value) };
        } else return obj;
      })
    );
  };
  const getIsAnswer = (value) => {
    let returnValue = false;
    value.map((obj) => {
      if (obj.isActive) {
        returnValue = true;
      }
    });
    return returnValue;
  };
  const clickPrevNext = (counter) => {
    if (counter == 1) {
      if (currentIndex == maxIndex) {
        setCurrentIndex(0);
        return;
      }
    }
    if (counter == -1) {
      if (currentIndex == 0) {
        setCurrentIndex(maxIndex);
        return;
      }
    }
    setCurrentIndex((prev) => {
      return prev + counter;
    });
  };
  const clickItem = (value) => {
    setCurrentIndex(value);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <ListCard
            itemList={listCardItems}
            selectedItem={currentIndex}
            clickItem={clickItem}
          />
        </Grid>
        <Grid item xs={12}>
          <TimerCard></TimerCard>
        </Grid>
        <Grid item xs={12}>
          <Typography> {itemlist[currentIndex].Parent.Name}</Typography>
          <ListSelect
            Itemlist={itemlist[currentIndex].Child}
            onChange={onChange}
            isSingleSelect={itemlist[currentIndex].Parent.isSingleSelect}
          ></ListSelect>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => {
              clickPrevNext(-1);
            }}
          >
            Previous
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => {
              clickPrevNext(1);
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Exam;
