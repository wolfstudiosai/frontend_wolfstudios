export const defaultPortfolio = (data) => {
  const defaultValue = {
    id: data?.id || null,
    projectTitle: data?.projectTitle || '',
    projectShortDescription: data?.projectShortDescription || '',
    projectSinglePageFullDescription: data?.projectSinglePageFullDescription || '',
    date: data?.date || '',

    // image
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,
    horizontalImageGallery: Array.isArray(data?.horizontalImageGallery) ? data.horizontalImageGallery : [],
    verticalImageGallery: Array.isArray(data?.verticalImageGallery) ? data?.verticalImageGallery : [],
    singlePageHeroImage: data?.singlePageHeroImage || [],
    imageField: data?.imageField || [],

    videoLink: typeof data?.videoLink === 'string' ? [data.videoLink] : null,

    isFeatured: data?.isFeatured || false,
    portfolioCategories: Array.isArray(data?.portfolioCategories)
      ? data.portfolioCategories.map((item) => ({
        value: item?.id || null,
        label: item?.name || '',
      }))
      : [],
    partnerHQ: Array.isArray(data?.partnerHQ)
      ? data.partnerHQ.map((item) => ({
        value: item?.id || null,
        label: item?.name || '',
      }))
      : [],
    states: Array.isArray(data?.states)
      ? data.states.map((item) => ({
        value: item?.id || null,
        label: item?.name || '',
      }))
      : [],
    countries: Array.isArray(data?.countries)
      ? data.countries.map((item) => ({
        value: item?.id || null,
        label: item?.name || '',
      }))
      : [],
    caseStudies: Array.isArray(data?.caseStudies)
      ? data.caseStudies.map((item) => ({
        value: item?.id || null,
        label: item?.name || '',
      }))
      : [],
  };

  return defaultValue;
};
