export const defaultCampaign = (data) => {
  const defaultData = {
    id: data?.id || null,
    name: data?.name || '',
    client: data?.client || '',
    guidelines: data?.guidelines || '',
    campaignGoals: data?.campaignGoals.join(',') || [],
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
        value: item?.ContentHQ?.id,
        label: item?.ContentHQ?.Name,
      })) || [],
    stakeholders:
      data?.stakeholders?.map((item) => ({
        value: item?.Stakeholders?.id,
        label: item?.Stakeholders?.Name,
      })) || [],
    retailPartners:
      data?.retailPartners?.map((item) => ({
        value: item?.RetailPartners?.id,
        label: item?.RetailPartners?.Name,
      })) || [],
    proposedPartners:
      data?.proposedPartners?.map((item) => ({
        value: item?.ProposedPartners?.id,
        label: item?.ProposedPartners?.Name,
      })) || [],
    contributedPartners:
      data?.contributedPartners?.map((item) => ({
        value: item?.ContributedPartners?.id,
        label: item?.ContributedPartners?.Name,
      })) || [],
    spaces:
      data?.spaces?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
    productionHQ: data?.productionHQ?.map((item) => ({
      value: item?.id,
      label: item?.Name,
    })) || [],
    products: data?.product?.map((item) => ({
      value: item?.id,
      label: item?.Name,
    })) || [],
    retailPartners2: data?.retailPartners2?.map((item) => ({
      value: item?.id,
      label: item?.Name,
    })) || [],
    retailPartners3: data?.retailPartners3?.map((item) => ({
      value: item?.id,
      label: item?.Name,
    })) || [],
  };

  return defaultData;
};
