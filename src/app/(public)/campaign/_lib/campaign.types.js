export const defaultCampaign = (data) => {
  const defaultData = {
    id: data?.id || null,
    name: data?.name || '',
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,
    client: data?.client || '',
    guidelines: data?.guidelines || '',
    currentGoals: '',
    campaignGoals: Array.isArray(data?.campaignGoals) ? data.campaignGoals : [],
    campaignDescription: data?.campaignDescription || '',
    totalContentEngagement: Number(data?.totalContentEngagement) || 0,
    campaignStatus: data?.campaignStatus || '',
    budget: Number(data?.budget) || 0,
    totalExpense: Number(data?.totalExpense) || 0,
    campaignROI: Number(data?.campaignROI) || 0,
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    productExpense: Number(data?.productExpense) || 0,
    notes: data?.notes || '',
    imageInspirationGallery: Array.isArray(data?.imageInspirationGallery) ? data.imageInspirationGallery : [],
    videoInspirationGallery: Array.isArray(data?.videoInspirationGallery) ? data.videoInspirationGallery : [],
    campaignImage: Array.isArray(data?.campaignImage) ? data.campaignImage : [],

    contentHQ: Array.isArray(data?.contentHQ)
      ? data.contentHQ.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    stakeholders: Array.isArray(data?.stakeholders)
      ? data.stakeholders.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    retailPartners: Array.isArray(data?.retailPartners)
      ? data.retailPartners.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    proposedPartners: Array.isArray(data?.proposedPartners)
      ? data.proposedPartners.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],

    contributedPartners: Array.isArray(data?.contributedPartners)
      ? data.contributedPartners.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],

    spaces: Array.isArray(data?.spaces)
      ? data.spaces.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    productionHQ: Array.isArray(data?.productionHQ)
      ? data.productionHQ.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    products: Array.isArray(data?.products)
      ? data.products.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    retailPartners2: Array.isArray(data?.retailPartners2)
      ? data.retailPartners2.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    retailPartners3: Array.isArray(data?.retailPartners3)
      ? data.retailPartners3.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
  };

  return defaultData;
};
