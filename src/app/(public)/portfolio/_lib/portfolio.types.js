export const defaultPortfolio = (data) => {
  const defaultValue = {
    id: data?.id || null,
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,
    projectTitle: data?.projectTitle || '',
    projectShortDescription: data?.projectShortDescription || '',
    projectSinglePageFullDescription: data?.projectSinglePageFullDescription || '',
    videoLink: data?.videoLink || '',
    date: data?.date ? new Date(`${data?.date} 1`).toString() : null,
    horizontalImageGallery: data?.horizontalImageGallery || [],
    verticalImageGallery: data?.verticalImageGallery || [],
    singlePageHeroImage: data?.singlePageHeroImage || [],
    imageField: data?.imageField || [],
    isFeatured: data?.isFeatured || false,
    portfolioCategories:
      data?.portfolioCategories?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    partnerHQ:
      data?.partnerHQ?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    states:
      data?.states?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    countries:
      data?.countries?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
    caseStudies:
      data?.caseStudies?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })) || [],
  };

  return defaultValue;
};
