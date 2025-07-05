
export const defaultPortfolio = (data) => {
  const defaultValue = {
    id: data?.id || null,
    projectTitle: data?.projectTitle || '',
    shortDescription: data?.shortDescription || '',
    fullDescription: data?.fullDescription || '',
    videoLink: data?.videoLink || '',
    date: data?.date ? new Date(`${data?.date} 1`).toString() : null,
    horizontalImageGallery: data?.horizontalImageGallery || [],
    verticalImageGallery: data?.verticalImageGallery || [],
    singlePageHeroImage: data?.singlePageHeroImage || [],
    thumbnailImage: data?.thumbnailImage || [],
    imagefield: data?.imagefield || [],
    isFeatured: data?.isFeatured || false,
    portfolioCategories: data?.portfolioCategoriesPortfolios?.map((item) => ({
      value: item?.portfolioCategories?.id,
      label: item?.portfolioCategories?.name
    })) || [],
    partnerHQ: data?.partnerHQPortfolios?.map((item) => ({
      value: item?.partnerHQ?.id,
      label: item?.partnerHQ?.name
    })) || [],
    states: data?.statesPortfolios?.map((item) => ({
      value: item?.states?.id,
      label: item?.states?.name
    })) || [],
    countries: data?.countriesPortfolios?.map((item) => ({
      value: item?.countries?.id,
      label: item?.countries?.name
    })) || [],
    caseStudies: data?.caseStudiesPortfolios?.map((item) => ({
      value: item?.caseStudies?.id,
      label: item?.caseStudies?.name
    })) || [],
  }

  return defaultValue;
}