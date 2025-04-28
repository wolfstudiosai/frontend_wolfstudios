export const defaultCampaign = (data) => {
  const defaultData = {
    name: data?.Name || '',
    client: data?.Client || '',
    guidelines: data?.Guidelines || '',
    goals: data?.CampaignGoals?.join(', ') || [],
    description: data?.CampaignDescription || '',
    totalContentEngagement: data?.TotalContentEngagement || 0,
    status: data?.CampaignStatus || '',
    budget: data?.Budget || 0,
    totalExpense: data?.TotalExpense || 0,
    campaignROI: data?.CampaignROI || 0,
    startDate: data?.StartDate ? new Date(data?.StartDate) : null,
    endDate: data?.EndDate ? new Date(data?.EndDate) : null,
    productExpense: data?.ProductExpense || 0,
    notes: data?.Notes || '',
    contentHQ:
      data?.ByCampaignsContentHQ?.map((item) => ({
        value: item?.ContentHQ?.id,
        label: item?.ContentHQ?.Name,
      })) || [],
    stakeholders:
      data?.ByCampaignsStakeholders?.map((item) => ({
        value: item?.Stakeholders?.id,
        label: item?.Stakeholders?.Name,
      })) || [],
    retailPartners:
      data?.ByCampaignsRetailPartners?.map((item) => ({
        value: item?.RetailPartners?.id,
        label: item?.RetailPartners?.Name,
      })) || [],
    proposedPartners:
      data?.ByCampaignsProposedPartners?.map((item) => ({
        value: item?.ProposedPartners?.id,
        label: item?.ProposedPartners?.Name,
      })) || [],
    spaces:
      data?.ByCampaignsSpaces?.map((item) => ({
        value: item?.Spaces?.id,
        label: item?.Spaces?.Name,
      })) || [],
    imageInspirationGallery: data?.ImageInspirationGallery || [],
    videoInspirationGallery: data?.VideoInspirationGallery || [],
    campaignImage: data?.CampaignImage?.[0] || [],
  };

  return defaultData;
};
