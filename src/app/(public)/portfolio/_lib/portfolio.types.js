
export const defaultPortfolio = (data) => {
  const defaultData = {
    id: data?.id || null,
    projectTitle: data?.ProjectTitle || '',
    date: data?.Date ? data?.Date : null,
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
    videoLink: data?.VideoLink || '',
    singlePageHeroImage: data?.SinglePageHeroImage || [],
    imagefield: data?.Imagefield || [],
    thumbnailImage: data?.ThumbnailImage || [],
    verticalImageGallery: data?.VerticalImageGallery || [],
    horizontalImageGallery: data?.HorizontalImageGallery || [],
  }

  return defaultData;
}