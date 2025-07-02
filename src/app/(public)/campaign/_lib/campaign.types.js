export const defaultCampaign = (data) => {

  const defaultData = {
    id: data?.id || null,
    name: data?.name || '',
    client: data?.client || '',
    guidelines: data?.guidelines || '',
    campaignGoals: data?.campaignGoals?.join(',') || [],
    campaignDescription: data?.campaignDescription || '',
    totalContentEngagement: data?.totalContentEngagement || 0,
    campaignStatus: data?.campaignStatus || '',
    budget: data?.budget || 0,
    totalExpense: data?.totalExpense || 0,
    campaignROI: data?.campaignROI || 0,
    startDate: data?.startDate ? new Date(data?.startDate) : new Date(),
    endDate: data?.endDate ? new Date(data?.endDate) : new Date(),
    productExpense: data?.productExpense || 0,
    notes: data?.notes || '',
    imageInspirationGallery: data?.imageInspirationGallery || [],
    videoInspirationGallery: data?.videoInspirationGallery || [],
    campaignImage: data?.campaignImage?.[0] || [],
    contentHQ:
      data?.contentHQ?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    stakeholders:
      data?.stakeholders?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    retailPartners:
      data?.retailPartners?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    proposedPartners:
      data?.proposedPartners?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    contributedPartners:
      data?.contributedPartners?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    spaces:
      data?.spaces?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    productionHQ: data?.productionHQ?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    products: data?.product?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    retailPartners2: data?.retailPartners2?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
    retailPartners3: data?.retailPartners3?.map((item) => ({
      value: item?.id,
      label: item?.name,
    })) || [],
  };

  return defaultData;
};
