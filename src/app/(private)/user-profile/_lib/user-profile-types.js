// export const defaultProfile = {
//     id: null,
//     first_name: "",
//     last_name: "",
//     email: "",
//     contact_number: "",
//     profile_pic: "",
//     role: "",
//     status: "ACTIVE",
// }

export const defaultProfile = (data) => {
  console.log(data, ' data....');
  const partner = data?.PartnerDetails?.[0] || {};

  return {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    contactNumber: data?.contactNumber || '',
    state: partner?.state || '',
    city: partner?.city || '',
    country: partner?.country || '',
    profileImage: data?.profileImage || '',
    role: data?.role || '',
    email: data?.email || '',

    socialLinks: {
      instagram: {
        url: partner?.socialLinks?.instagram?.url || '',
        hourlyRate: partner?.socialLinks?.instagram?.hourlyRate || '',
      },
      facebook: {
        url: partner?.socialLinks?.facebook?.url || '',
        hourlyRate: partner?.socialLinks?.facebook?.hourlyRate || '',
      },
      twitter: {
        url: partner?.socialLinks?.twitter?.url || '',
        hourlyRate: partner?.socialLinks?.twitter?.hourlyRate || '',
      },
      linkedin: {
        url: partner?.socialLinks?.linkedin?.url || '',
        hourlyRate: partner?.socialLinks?.linkedin?.hourlyRate || '',
      },
      youtube: {
        url: partner?.socialLinks?.youtube?.url || '',
        hourlyRate: partner?.socialLinks?.youtube?.hourlyRate || '',
      },
      tiktok: {
        url: partner?.socialLinks?.tiktok?.url || '',
        hourlyRate: partner?.socialLinks?.tiktok?.hourlyRate || '',
      },
      pinterest: {
        url: partner?.socialLinks?.pinterest?.url || '',
        hourlyRate: partner?.socialLinks?.pinterest?.hourlyRate || '',
      },
      snapchat: {
        url: partner?.socialLinks?.snapchat?.url || '',
        hourlyRate: partner?.socialLinks?.snapchat?.hourlyRate || '',
      },
      twitch: {
        url: partner?.socialLinks?.twitch?.url || '',
        hourlyRate: partner?.socialLinks?.twitch?.hourlyRate || '',
      },
    },
  };
};

export const defaultResetPassword = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
