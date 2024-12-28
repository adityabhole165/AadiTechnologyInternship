import { Box, Checkbox, Stack } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllClassesAndDivisionsBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { CDAGetAllClassesAndDivisions } from 'src/requests/AddSchoolNotice/ReqAllClassesAndDivisions';
import { RootState } from 'src/store';

const SelectListChild = ({ ISGetStandardDivisionsForSelectedNoticeId }) => {

    const [parentList, setParentList] = useState(null);
    const [isAssociateActive, setIsAssociateActive] = useState(false);
    const [itemList, SetItemList] = useState(null);
    const [divisionIDs, SetDivisionIDsd] = useState([]);
    const [, forceUpdate] = React.useState(0);
    // let divisionIDs = [];
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const GetAllClasseAndDivision: IGetAllClassesAndDivisionsBody = {
        "asSchoolId": 18,
        "asAcademicYearId": 54
    }

    const USGetAllCalssesAndDivision: any = useSelector((state: RootState) => state.GetAllClassesAndDivisions.ISGetAllClassesAndDevision);
    const USGetAllCalssesAndDivisionNewData = JSON.parse(JSON.stringify(USGetAllCalssesAndDivision));
    var itemListData = [];

    if (USGetAllCalssesAndDivisionNewData.length) {
        var Standard_IdArr = [];
        for (let index = 0; index < USGetAllCalssesAndDivisionNewData.length; index++) {
            Standard_IdArr.push(USGetAllCalssesAndDivisionNewData[index].Standard_Id);
        }
        var uniqueElement = [...new Set(Standard_IdArr)];
        for (let index = 0; index < uniqueElement.length; index++) {
            const findArr = USGetAllCalssesAndDivisionNewData.filter(item => item.Standard_Id === uniqueElement[index]).map(filteredItem => filteredItem && { ...filteredItem, isActive: false });
            if (findArr.length) {
                itemListData.push({ Standard_Id: findArr[0].Standard_Id, Standard_Name: findArr[0].Standard_Name, isActive: false, Division_Id: findArr[0].Division_Id, arr: findArr })
            }
        }
    }

    let newData = useMemo(() => itemListData, []);
    //console.log({ newData })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CDAGetAllClassesAndDivisions(GetAllClasseAndDivision))

    }, []);


    let updatedArr = null;

    const getIsCheckedAll = () => {
        // setIsAssociateActive(!isAssociateActive);

        updatedArr = applyCheckedToAllArray(newData, !isAssociateActive);
        if (updatedArr.length) {
            for (let index = 0; index < updatedArr.length; index++) {
                updatedArr[index].arr = applyCheckedToAllArray(updatedArr[index].arr, !isAssociateActive);
            }
        }
        newData = updatedArr;
        SetItemList(newData)
        forceUpdate(n => !n);

        //console.log("updatedArr 58", updatedArr);
    };

    const applyCheckedToAllArray = (arr, isActive = false) => {
        arr.map((item) => (
            item.isActive = isActive
        ));
        return arr;
    }

    const selecIndividualCheckedAll = (obj) => {
        //console.log("isAssociateActive 58", obj);
        // divisionIDs.push()

        SetDivisionIDsd(oldArray => [obj.Division_Id, ...oldArray]);
        const individualCheckedObj = newData.findIndex(item => item.Standard_Id === obj.Standard_Id);
        newData[individualCheckedObj].isActive = !newData[individualCheckedObj].isActive;
        if (newData[individualCheckedObj]) {
            newData[individualCheckedObj].arr = applyCheckedToAllArray(newData[individualCheckedObj].arr, newData[individualCheckedObj].isActive);
        }
        SetItemList(newData);
        //console.log("isAssociateActive 58", itemList);
        forceUpdate(n => !n);
    }

    const selecNestedIndividualCheckedAll = (obj, div) => {
        //console.log("isAssociateActive 58", obj, div);
        // divisionIDs.push(div.Division_Id)
        SetDivisionIDsd(oldArray => [div.Division_Id, ...oldArray]);

        const individualCheckedObj = newData.findIndex(item => item.Standard_Id === obj.Standard_Id);
        const individualCheckedNestedObj = newData[individualCheckedObj].arr.findIndex(item => item.Division_Id === div.Division_Id);
        if (individualCheckedObj > -1 && individualCheckedNestedObj > -1) {
            newData[individualCheckedObj].arr[individualCheckedNestedObj].isActive = !newData[individualCheckedObj].arr[individualCheckedNestedObj].isActive;
        }
        SetItemList(newData);
        forceUpdate(n => !n);
        //console.log("divisionIDs", divisionIDs);
    }


    return (
        <>
            <Box sx={{ backgroundColor: 'lightgrey' }}>
                <Checkbox
                    checked={isAssociateActive}
                    onChange={() => { setIsAssociateActive(!isAssociateActive); getIsCheckedAll(); forceUpdate(n => !n) }}
                />
                Associated Class(es)
            </Box>
            <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                {newData && newData.map((item, index) => (
                    <Box key={index}>
                        <Box sx={{ borderBottom: `1px solid grey`, fontWeight: 'bold' }}>
                            <Checkbox checked={item?.isActive}
                                onChange={() => {
                                    selecIndividualCheckedAll(item);
                                }}
                            ></Checkbox>
                            {/* {item && JSON.stringify(item.isActive)} */}
                            {item.Standard_Name}
                        </Box>
                        {item.arr.map((subItem, index) => (
                            <Box key={index}>
                                <Checkbox
                                    checked={subItem.isActive}
                                    onChange={() => {
                                        selecNestedIndividualCheckedAll(item, subItem);
                                    }}
                                ></Checkbox>
                                {subItem.Division_Name}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Stack>
        </>
    );
};

export default SelectListChild;
