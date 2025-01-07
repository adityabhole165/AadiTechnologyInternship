import { Box, Checkbox, Stack } from "@mui/material";
import React, { useState } from "react";

type ClassSectionSelectorProps = {
    classes: string[];
    getSectionsForClass: (className: string) => string[];
};

const ClassSectionSelector: React.FC<ClassSectionSelectorProps> = ({ classes, getSectionsForClass }) => {

    const [classList, setClassList] = useState(
        classes.map((className) => ({
            Name: className,
            Id: className,
            IsActive: false,
        }))
    );

    const [sectionList, setSectionList] = useState(
        classes.flatMap((className) =>
            getSectionsForClass(className).map((section) => ({
                Id: `${className}-${section}`,
                ParentId: className,
                Name: `${section}`,
                IsActive: false,
            }))
        )
    );

    const handleParentCheckbox = (parentId: string) => {
        const updatedClassList = classList.map((cls) =>
            cls.Id === parentId ? { ...cls, IsActive: !cls.IsActive } : cls
        );
        setClassList(updatedClassList);

        const updatedSectionList = sectionList.map((section) =>
            section.ParentId === parentId ? { ...section, IsActive: !classList.find((cls) => cls.Id === parentId)?.IsActive } : section
        );
        setSectionList(updatedSectionList);
    };

    const handleChildCheckbox = (childId: string) => {
        const updatedSectionList = sectionList.map((section) =>
            section.Id === childId ? { ...section, IsActive: !section.IsActive } : section
        );
        setSectionList(updatedSectionList);
    };

    const handleParentAllCheckbox = (isChecked: boolean) => {
        const updatedClassList = classList.map((cls) => ({ ...cls, IsActive: isChecked }));
        setClassList(updatedClassList);

        const updatedSectionList = sectionList.map((section) => ({ ...section, IsActive: isChecked }));
        setSectionList(updatedSectionList);
    };

    const getIsParentCheckedAll = () => classList.every((cls) => cls.IsActive);

    const getIsCheckedAll = (parentId: string) =>
        sectionList.filter((section) => section.ParentId === parentId).every((section) => section.IsActive);

    return (
        <Box>
            <Box sx={{ backgroundColor: "lightgrey", padding: 0 }}>
                <Checkbox
                    checked={getIsParentCheckedAll()}
                    onChange={(e) => handleParentAllCheckbox(e.target.checked)}
                />
                <strong>Applicable to selected Class(es) :</strong>


            </Box>
            <Stack direction="row" gap={0.7} flexWrap="wrap">
                {classList.map((classItem) => (
                    <Box key={classItem.Id}>
                        <Box sx={{ borderBottom: `1px solid grey`, fontWeight: "bold", padding: 0 }}>
                            <Checkbox
                                checked={classItem.IsActive}
                                onChange={() => handleParentCheckbox(classItem.Id)}
                            />
                            {classItem.Name}
                        </Box>
                        {sectionList
                            .filter((section) => section.ParentId === classItem.Id)
                            .map((section) => (
                                <Box key={section.Id} sx={{ paddingLeft: 0 }}>
                                    <Checkbox
                                        checked={section.IsActive}
                                        onChange={() => handleChildCheckbox(section.Id)}
                                    />
                                    {section.Name}
                                </Box>
                            ))}
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default ClassSectionSelector;
