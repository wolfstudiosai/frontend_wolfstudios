export const defaultSpace = (data) => {
  const defaultData = {
    id: data?.id || null,
    name: data?.name || '',
    bookingLink: data?.bookingLink || '',
    intro: data?.intro || '',
    aboutThisSpace: data?.aboutThisSpace || '',
    seeTheSpace: data?.seeTheSpace || '',
    addToProject: data?.addToProject || '',
    recentCreatorsWhoBookedHere: data?.recentCreatorsWhoBookedHere || '',
    phoneNumber: data?.phoneNumber || '',
    colorTone: data?.colorTone || '',
    parkingInstructions: data?.parkingInstructions || '',
    lightingInformation: data?.lightingInformation || '',
    soundInformation: data?.soundInformation || '',
    spaceAccess: data?.spaceAccess || '',
    hostRules: data?.hostRules || '',
    electrical: data?.electrical || '',
    permitDetails: data?.permitDetails || '',
    startingRatehr: Number(data?.startingRatehr) || 0,
    type: Array.isArray(data?.type) ? data.type : [],
    spaceStyle: Array.isArray(data?.spaceStyle) ? data.spaceStyle : [],
    props: Array.isArray(data?.props) ? data.props : [],
    theme: Array.isArray(data?.theme) ? data.theme : [],
    availableLighting: Array.isArray(data?.availableLighting) ? data.availableLighting : [],
    adons: Array.isArray(data?.adons) ? data.adons : [],
    cycwall: Boolean(data?.cycwall) || false,
    backdropSystem: Boolean(data?.backdropSystem) || false,
    features: Array.isArray(data?.features) ? data.features : [],
    minimumHourlyBooking: Number(data?.minimumHourlyBooking) || 0,
    attendeeLimit: Number(data?.attendeeLimit) || 0,
    bedrooms: data?.bedrooms || '',
    bathrooms: data?.bathrooms || '',
    squareFootage: Number(data?.squareFootage) || 0,
    availableHours: data?.availableHours || '',
    dateListed: data?.dateListed || '',
    isFeatured: Boolean(data?.isFeatured) || false,

    // Relationships
    campaigns: Array.isArray(data?.campaigns)
      ? data.campaigns.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    cities: Array.isArray(data?.cities)
      ? data.cities.map((item) => ({
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
    states: Array.isArray(data?.states)
      ? data.states.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    tags: Array.isArray(data?.tags)
      ? data.tags.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    destinations: Array.isArray(data?.destinations)
      ? data.destinations.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    productionHQ: Array.isArray(data?.productionHQ)
      ? data.productionHQ.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],
    productionHQ2: Array.isArray(data?.productionHQ2)
      ? data.productionHQ2.map((item) => ({
          value: item?.id || null,
          label: item?.name || '',
        }))
      : [],

    // Images
    showcaseYourLastProjectHereWithUs: Array.isArray(data?.showcaseYourLastProjectHereWithUs)
      ? data.showcaseYourLastProjectHereWithUs
      : [],
    travelTimePlaceholderImageForGoogleMaps: Array.isArray(data?.travelTimePlaceholderImageForGoogleMaps)
      ? data.travelTimePlaceholderImageForGoogleMaps
      : [],
    featuredGallery: Array.isArray(data?.featuredGallery) ? data.featuredGallery : [],
    mainGallery: Array.isArray(data?.mainGallery) ? data.mainGallery : [],
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,
  };

  return defaultData;
};
