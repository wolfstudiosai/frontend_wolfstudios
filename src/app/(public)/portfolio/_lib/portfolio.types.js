
export const defaultPortfolio = (data) => {
  const defaultValue = {
    id: data?.id || null,
    projectTitle: data?.ProjectTitle || '',
    shortDescription: data?.Projectshortdescription || '',
    fullDescription: data?.Projectsinglepagefulldescription || '',
    videoLink: data?.VideoLink || '',
    date: data?.Date ? data?.Date : null,
    horizontalImageGallery: data?.HorizontalImageGallery || [],
    verticalImageGallery: data?.VerticalImageGallery || [],
    singlePageHeroImage: data?.SinglePageHeroImage || [],
    thumbnailImage: data?.ThumbnailImage || [],
    imagefield: data?.Imagefield || [],
    isFeatured: data?.IsFeatured || false,
    portfolioCategories: data?.PortfolioCategoriesPortfolios?.map((item) => ({
      value: item?.PortfolioCategories?.id,
      label: item?.PortfolioCategories?.Name
    })) || [],
    partnerHQ: data?.PartnerHQPortfolios?.map((item) => ({
      value: item?.PartnerHQ?.id,
      label: item?.PartnerHQ?.Name
    })) || [],
    states: data?.ByStatesPortfolios?.map((item) => ({
      value: item?.ByStates?.id,
      label: item?.ByStates?.Name
    })) || [],
    countries: data?.ByCountryPortfolios?.map((item) => ({
      value: item?.ByCountry?.id,
      label: item?.ByCountry?.Name
    })) || [],
    caseStudies: data?.CaseStudiesPortfolios?.map((item) => ({
      value: item?.CaseStudies?.id,
      label: item?.CaseStudies?.Name
    })) || [],
  }


  return defaultValue;
}