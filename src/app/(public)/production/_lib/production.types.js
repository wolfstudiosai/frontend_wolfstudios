export const defaultProduction = (data) => {
  const defaultData = {
    id: data?.id || '',
    name: data?.name || '',
    internalNotes: data?.internalNotes || '',
    status: Array.isArray(data?.status) ? data.status : [],
    totalExpense: Number(data?.totalExpense) || 0,
    cardsUsed: Array.isArray(data?.cardsUsed) ? data.cardsUsed : [],
    proposedDate: data?.proposedDate || '',
    recordShootDate: data?.recordShootDate || '',
    spaceExpense: Number(data?.spaceExpense) || 0,
    talentExpense: Number(data?.talentExpense) || 0,
    crewExpense: Number(data?.crewExpense) || 0,
    foodExpense: Number(data?.foodExpense) || 0,
    equipmentRentals: Array.isArray(data?.equipmentRentals) ? data.equipmentRentals : [],
    equipmentExpense: Number(data?.equipmentExpense) || 0,
    reimbursments: Number(data?.reimbursments) || 0,
    wardrobeExpense: Number(data?.wardrobeExpense) || 0,
    playbookLink: data?.playbookLink || '',
    productionUsage: Array.isArray(data?.productionUsage) ? data.productionUsage : [],
    directorExpense: Number(data?.directorExpense) || 0,
    producerExpense: Number(data?.producerExpense) || 0,

    contracts: Array.isArray(data?.contracts) ? data?.contracts : [],
    receipts: Array.isArray(data?.receipts) ? data?.receipts : [],
    shotlist: Array.isArray(data?.shotlist) ? data?.shotlist : [],
    callSheet: Array.isArray(data?.callSheet) ? data?.callSheet : [],
    proofingLibrary: Array.isArray(data?.proofingLibrary) ? data?.proofingLibrary : [],
    imageInspiration: Array.isArray(data?.imageInspiration) ? data?.imageInspiration : [],
    videoInspiration: Array.isArray(data?.videoInspiration) ? data?.videoInspiration : [],
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,

    spaces: Array.isArray(data?.spaces)
      ? data.spaces.map((item) => ({
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
    contributingPartners: Array.isArray(data?.contributingPartners)
      ? data.contributingPartners.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    campaigns: Array.isArray(data?.campaigns)
      ? data.campaigns.map((item) => ({
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
    proposedSpaces: Array.isArray(data?.proposedSpaces)
      ? data.proposedSpaces.map((item) => ({
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
  };

  return defaultData;
};
