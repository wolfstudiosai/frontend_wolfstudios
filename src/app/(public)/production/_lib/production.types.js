export const defaultProduction = (data) => {
  const defaultData = {
    id: data?.id || '',
    name: data?.Name || '',
    internalNotes: data?.InternalNotes || '',
    status: data?.Status || [],
    totalExpense: data?.TotalExpense || '',
    cardsUsed: data?.CardsUsed || [],
    proposedDate: data?.ProposedDate ? data?.ProposedDate : null,
    recordShootDate: data?.RecordShootDate ? data?.RecordShootDate : null,
    spaceExpense: data?.SpaceExpense || '',
    talentExpense: data?.TalentExpense || '',
    crewExpense: data?.CrewExpense || '',
    foodExpense: data?.FoodExpense || '',
    equipmentRentals: data?.EquipmentRentals || [],
    equipmentExpense: data?.EquipmentExpense || '',
    googleDriveFiles: data?.GoogleDriveFiles || '',
    productionUsage: data?.ProductionUsage || [],
    directorExpense: data?.DirectorExpense || '',
    producerExpense: data?.ProducerExpense || '',

    //relations
    spaces: data?.ByProductionsSpaces || [],
    stakeholders: data?.ByProductionsStakeholders || [],
    partners: data?.ByProductionsPartners || []
  }

  return defaultData
}