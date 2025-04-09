// export const defaultPortfolio = {
//   id: '',
//   projectTitle: '',
//   portfolioCategories: [],
//   date: null,
//   shortDescription: '',
//   fullDescription: '',
//   states: [],
//   countries: [],
//   partnerHQ: [],

//   slug: '',
//   video_url: '',
//   singlePageHeroImage: [],
//   imagefield: [],
//   thumbnailImage: [],
//   verticalImageGallery: [],
//   horizontalImageGallery: [],
//   user_id: '',
//   created_by: '',
//   updated_at: '',
// };

export const defaultPortfolio = (data) => {
  const defaultData = {
    projectTitle: data?.ProjectTitle || '',
    date: data?.Date ? new Date(data?.Date) : null,
    shortDescription: data?.Projectshortdescription || '',
    fullDescription: data?.Projectsinglepagefulldescription || '',
    portfolioCategories: data?.PortfolioCategoriesPortfolios?.map((item) => ({
      value: item?.PortfolioCategories?.id,
      label: item?.PortfolioCategories?.Name
    })) || [],
    states: data?.ByStatesPortfolios?.map((item) => ({
      value: item?.ByStates?.id,
      label: item?.ByStates?.Name
    })) || [],
    countries: data?.ByCountryPortfolios?.map((item) => ({
      value: item?.ByCountry?.id,
      label: item?.ByCountry?.Name
    })) || [],
    partnerHQ: data?.PartnerHQPortfolios?.map((item) => ({
      value: item?.PartnerHQ?.id,
      label: item?.PartnerHQ?.Name
    })) || [],
    video_url: data?.VideoLink || '',
    singlePageHeroImage: data?.SinglePageHeroImage?.[0] || [],
    imagefield: data?.Imagefield?.[0] || [],
    thumbnailImage: data?.ThumbnailImage?.[0] || [],
    verticalImageGallery: data?.VerticalImageGallery || [],
    horizontalImageGallery: data?.HorizontalImageGallery || [],
  }

  return defaultData;
}