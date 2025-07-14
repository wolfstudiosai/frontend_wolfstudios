import { imageUploader } from '/src/utils/upload-file';

export const campaignPayload = async (values, isFileUpload = false) => {
    const finalData = { ...values };

    if (isFileUpload) {
        // Handle image fields
        const imageFields = ['imageInspirationGallery'];
        for (const field of imageFields) {
            const value = values[field];
            if (value instanceof File) {
                const uploaded = await imageUploader(
                    [
                        {
                            file: value,
                            fileName: value.name.split('.').slice(0, -1).join('.'),
                            fileType: value.type.split('/')[1],
                        },
                    ],
                    'campaigns'
                );
                finalData[field] = uploaded;
            } else if (typeof value === 'string') {
                finalData[field] = [value];
            }
        }
    }

    // Normalize array fields
    const arrayFields = [
        'contentHQ',
        'stakeholders',
        'retailPartners',
        'proposedPartners',
        'contributedPartners',
        'spaces',
        'productionHQ',
        'products',
        'retailPartners2',
        'retailPartners3',
    ];

    for (const field of arrayFields) {
        const value = values[field];
        if (Array.isArray(value) && value.length > 0) {
            finalData[field] = value.map((item) => item.value);
        }
    }


    const numericFields = ['totalContentEngagement', 'budget', 'totalExpense', 'campaignROI', 'productExpense'];
    for (const field of numericFields) {
        const value = values[field];
        if (value) {
            finalData[field] = Number(value);
        }
    }

    return finalData;
};
