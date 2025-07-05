export const defaultProduction = (data) => {
  const defaultData = {
    id: data?.id || '',
    name: data?.name || '',
    internalNotes: data?.internalNotes || '',
    status: data?.status?.length > 0 ? data?.status.map((item) => ({ value: item, label: item })) : [],
    totalExpense: data?.totalExpense || '',
    cardsUsed: data?.cardsUsed?.length > 0 ? data?.cardsUsed.map((item) => ({ value: item, label: item })) : [],
    proposedDate: data?.proposedDate ? data?.proposedDate : null,
    recordShootDate: data?.recordShootDate ? data?.recordShootDate : null,
    spaceExpense: data?.spaceExpense || '',
    talentExpense: data?.talentExpense || '',
    crewExpense: data?.crewExpense || '',
    foodExpense: data?.foodExpense || '',
    equipmentRentals: data?.equipmentRentals?.map((item) => ({ value: item, label: item })) || [],
    equipmentExpense: data?.equipmentExpense || '',
    reimbursments: data?.reimbursments || '',
    wardrobeExpense: data?.wardrobeExpense || '',
    playbookLink: data?.playbookLink || '',
    productionUsage: data?.productionUsage.map((item) => ({ value: item, label: item })) || [],
    directorExpense: data?.directorExpense || '',
    producerExpense: data?.producerExpense || '',

    //relations
    spaces: data?.spaces?.map((item) => ({ value: item?.id, label: item?.name })) || [],
    stakeholders: data?.stakeholders?.map((item) => ({ value: item?.id, label: item?.name })) || [],
    products: data?.products?.map((item) => ({ value: item?.id, label: item?.name })) || [],
    contributingPartners: data?.contributingPartners?.map((item) => ({ value: item?.id, label: item?.name })) || [],
    proposedPartners: data?.proposedPartners?.map((item) => ({ value: item?.id, label: item?.name })) || [],
    proposedSpaces: data?.proposedSpaces?.map((item) => ({ value: item?.id, label: item?.name })) || [],
    campaigns: data?.campaigns?.map((item) => ({ value: item?.id, label: item?.name })) || [],

    // images
    receipts: data?.receipts || [],
    contracts: data?.contracts || [],
    shotlist: data?.shotlist || [],
    callSheet: data?.callSheet || [],
    proofingLibrary: data?.proofingLibrary || [],
    imageInspiration: data?.imageInspiration || [],
  };

  return defaultData;
};
