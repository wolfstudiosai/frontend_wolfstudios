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
    id: '',
    projectTitle: data?.ProjectTitle || '',
    portfolioCategories: [],
    date: null,
    shortDescription: '',
    fullDescription: '',
    states: [],
    countries: [],
    partnerHQ: [],

    slug: '',
    video_url: '',
    singlePageHeroImage: [],
    imagefield: [],
    thumbnailImage: [],
    verticalImageGallery: [],
    horizontalImageGallery: [],
    user_id: '',
    created_by: '',
    updated_at: '',
  }

  return defaultData;
}