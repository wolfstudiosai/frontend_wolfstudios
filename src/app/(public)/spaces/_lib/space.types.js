export const defaultSpace = (data) => {
  const defaultData = {
    id: data?.id || null,
    isFeatured: Boolean(data?.isFeatured) || false,
    name: data?.name || '',
    startingRatehr: Number(data?.startingRatehr) || 0,
    bookingLink: data?.bookingLink || '',
    type: Array.isArray(data?.type) ? data.type.join(', ') : data?.type || '',
    spaceStyle: Array.isArray(data?.spaceStyle) ? data.spaceStyle.join(', ') : data?.spaceStyle || '',
    props: Array.isArray(data?.props) ? data.props.join(', ') : data?.props || '',
    theme: Array.isArray(data?.theme) ? data.theme.join(', ') : data?.theme || '',
    availableLighting: Array.isArray(data?.availableLighting)
      ? data.availableLighting.join(', ')
      : data?.availableLighting || '',
    adons: Array.isArray(data?.adons) ? data.adons.join(', ') : data?.adons || '',
    cycwall: Boolean(data?.cycwall) || false,
    backdropSystem: Boolean(data?.backdropSystem) || false,
    features: Array.isArray(data?.features) ? data.features.join(', ') : data?.features || '',
    minimumHourlyBooking: Number(data?.minimumHourlyBooking) || 0,
    intro: data?.intro || '',
    aboutThisSpace: data?.aboutThisSpace || '',
    seeTheSpace: data?.seeTheSpace || '',
    addToProject: data?.addToProject || '',
    recentCreatorsWhoBookedHere: data?.recentCreatorsWhoBookedHere || '',
    phoneNumber: data?.phoneNumber || '',
    attendeeLimit: data?.attendeeLimit || '',
    colorTone: data?.colorTone || '',
    parkingInstructions: data?.parkingInstructions || '',
    lightingInformation: data?.lightingInformation || '',
    soundInformation: data?.soundInformation || '',
    spaceAccess: data?.spaceAccess || '',
    hostRules: data?.hostRules || '',
    electrical: data?.electrical || '',
    permitDetails: data?.permitDetails || '',
    bedrooms: data?.bedrooms || '',
    bathrooms: data?.bathrooms || '',
    squareFootage: Number(data?.squareFootage) || 0,
    availableHours: data?.availableHours || '',
    dateListed: data?.dateListed || '',
    showcaseYourLastProjectHereWithUs: Array.isArray(data?.showcaseYourLastProjectHereWithUs)
      ? data.showcaseYourLastProjectHereWithUs.join(', ')
      : data?.showcaseYourLastProjectHereWithUs || '',
    travelTimePlaceholderImageForGoogleMaps: Array.isArray(data?.travelTimePlaceholderImageForGoogleMaps)
      ? data.travelTimePlaceholderImageForGoogleMaps.join(', ')
      : data?.travelTimePlaceholderImageForGoogleMaps || '',
    featuredGallery: Array.isArray(data?.featuredGallery)
      ? data.featuredGallery.join(', ')
      : data?.featuredGallery || '',
    thumbnailImage: typeof data?.thumbnailImage === 'string' ? [data.thumbnailImage] : null,
    mainGallery: Array.isArray(data?.mainGallery) ? data.mainGallery.join(', ') : data?.mainGallery || '',

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
  };

  return defaultData;
};
