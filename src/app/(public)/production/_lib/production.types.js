export const defaultProduction = (data) => {
  const defaultData = {
    id: data?.id || '',
    name: data?.name || '',
    internalNotes: data?.internalNotes || '',
    status: data?.status || [],
    totalExpense: data?.totalExpense || '',
    cardsUsed: data?.cardsUsed || [],
    proposedDate: data?.proposedDate ? new Date(data?.proposedDate) : null,
    recordShootDate: data?.recordShootDate ? new Date(data?.recordShootDate) : null,
    spaceExpense: data?.spaceExpense || '',
    talentExpense: data?.talentExpense || '',
    crewExpense: data?.crewExpense || '',
    foodExpense: data?.foodExpense || '',
    equipmentRentals: data?.equipmentRentals || '',
    googleDriveFiles: data?.googleDriveFiles || '',
    productionUsage: data?.productionUsage || [],
    directorExpense: data?.directorExpense || '',
    producerExpense: data?.producerExpense || '',

    //relations
    spaces: data?.spaces || [],
    stakeholders: data?.stakeholders || [],
    partners: data?.partners || []
  }

  return defaultData
}