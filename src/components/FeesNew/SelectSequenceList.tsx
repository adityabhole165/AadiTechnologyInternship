import { useState } from 'react';
import PaidFeesDetailsCard from './PaidFeesDetailsCard';

const SelectSequenceList = ({
  Itemlist,
  RefreshData,
  FeesCard,
  isSingleSelect = false,
  IsSequenceSelect = false,
  IsNotDisabled = true,
  InternalOrSchool
}) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const IsAllDisabled = () => {
    let bIsAllDisabled = true;
    Itemlist.map((item) => {
      if (item.IsEnabled) bIsAllDisabled = false;
    });
    return bIsAllDisabled;
  };
  if (isFirstTime || IsAllDisabled()) {
    Itemlist = Itemlist.map((Item, Index) => ({
      ...Item,
      IsEnabled:
        (IsSequenceSelect && Index === 0) || !IsSequenceSelect ? true : false
    }));
  }

  const onChange = (value) => {
    setIsFirstTime(false);
    Itemlist = Itemlist.map((obj) =>
      obj.Id === value.Id || obj.ParentId === value.Id
        ? { ...obj, IsActive: value.IsActive }
        : { ...obj, IsActive: isSingleSelect ? false : obj.IsActive }
    );
    SequenceSelect();
    MarkChildActiveFlag();
    RefreshData(Itemlist);
  };

  const MarkChildActiveFlag = () => {
    Itemlist = Itemlist.map((obj) => {
      return obj.ParentId !== '0'
        ? { ...obj, IsActive: getParentActiveStatus(obj.ParentId) }
        : obj;
    });
  };

  const getParentActiveStatus = (Id) => {
    let IsActive = false;
    Itemlist.filter((item) => {
      return item.Id === Id;
    }).map((obj) => {
      IsActive = obj.IsActive;
    });
    return IsActive;
  };

  const SequenceSelect = () => {
    if (IsSequenceSelect) {
      let enableCheck = true;
      let activeCheck = true;
      Itemlist = Itemlist.map((obj) => {
        if (obj.ParentId === '0') {
          if (obj.IsActive && activeCheck) {
            return { ...obj, IsEnabled: true };
          } else {
            activeCheck = false;
            if (enableCheck) {
              enableCheck = false;
              return { ...obj, IsEnabled: true, IsActive: false };
            } else return { ...obj, IsEnabled: false, IsActive: false };
          }
        } else return obj;
      });
    }
  };
  return (
    <div>
      {Itemlist.map((item, index) => (
        <PaidFeesDetailsCard
          FeesCard={FeesCard}
          item={item}
          onChange={onChange}
          key={index}
          IsNotDisabled={IsNotDisabled}
          InternalOrSchool={InternalOrSchool}
        />
      ))}
    </div>
  );
};

export default SelectSequenceList;
