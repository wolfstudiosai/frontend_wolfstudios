export const defaultPortfolio = (data) => {
  const defaultValue = {
    id: data?.id || null,
    projectTitle: data?.projectTitle || '',
    shortDescription: data?.shortDescription || '',
    fullDescription: data?.fullDescription || '',
    videoLink: data?.videoLink || '',
    date: data?.date || '',
    horizontalImageGallery: data?.horizontalImageGallery || [],
    verticalImageGallery: data?.verticalImageGallery || [],
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,
    singlePageHeroImage: data?.singlePageHeroImage || [],
    imageField: data?.imageField || [],
    isFeatured: data?.isFeatured || false,
    portfolioCategories:
      data?.portfolioCategories?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    partnerHQ: Array.isArray(data?.partnerHQ)
      ? data?.partnerHQ?.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],

    states: Array.isArray(data?.states)
      ? data?.states?.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    countries:
      data?.countries?.map((item) => ({
        value: item?.id || null,
        label: item?.name || '',
      })) || [],
    caseStudies: Array.isArray(data?.caseStudies)
      ? data?.caseStudies?.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
  };

  return defaultValue;
};
