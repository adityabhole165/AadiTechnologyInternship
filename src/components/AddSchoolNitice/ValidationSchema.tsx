import * as Yup from 'yup';

const validationSchema = Yup.object({
    linkName: Yup.string().max(50, 'Link Name cannot exceed 50 characters').required('Link name should not be blank.'),
    NoticeName: Yup.string().required('Notice name should not be blank'),
    // displayLocation: Yup.string().required('Display Location is required'),
    startDate: Yup.date().nullable().required('Start date should not be blank'),
    endDate: Yup.date().nullable().required('End date should not be blank'),
    startTime: Yup.date().nullable().required('Start time should not be blank'),
    endTime: Yup.date().nullable().required('End time should not be blank'),
    sortOrder: Yup.number().typeError('Sort Order must be a number').required('Sort Order should not be blank'),
    noticeFile: Yup.mixed().required('Notice File is required'),
    // imageFile: Yup.mixed().required('Image is required'),
    // description: Yup.string().min(20).max(255).required('Description is required')
});

export default validationSchema;