import { toast } from 'sonner';

import { api } from '/src/utils/api';
import { imageUploader } from '/src/utils/upload-file';

export const getProfileData = async () => {
  try {
    const res = await api.get(`/user/profile`);
    return { success: true, data: res.data.data };
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const getProfileDataById = async (userID) => {
  try {
    const res = await api.get(`/users/${userID}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updateProfileData = async (data, userID) => {
  let profileImage = data.profileImage;
  if (profileImage instanceof File) {
    const res = await imageUploader(
      [
        {
          file: profileImage,
          fileName: profileImage.name.split('.').slice(0, -1).join('.'),
          fileType: profileImage.type.split('/')[1],
        },
      ],
      'users'
    );
    profileImage = res[0];
  }

  const requestBody = {
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    contactNumber: data.contactNumber || '',
    profileImage: profileImage || '',
    partnerDetails: {
      state: data.state || '',
      city: data.city || '',
      country: data.country || '',
      instagram: {
        url: data.socialLinks?.instagram?.url || '',
        hourlyRate: Number(data.socialLinks?.instagram?.hourlyRate) || 0,
      },
      facebook: {
        url: data.socialLinks?.facebook?.url || '',
        hourlyRate: Number(data.socialLinks?.facebook?.hourlyRate) || 0,
      },
      twitter: {
        url: data.socialLinks?.twitter?.url || '',
        hourlyRate: Number(data.socialLinks?.twitter?.hourlyRate) || 0,
      },
      linkedin: {
        url: data.socialLinks?.linkedin?.url || '',
        hourlyRate: Number(data.socialLinks?.linkedin?.hourlyRate) || 0,
      },
      youtube: {
        url: data.socialLinks?.youtube?.url || '',
        hourlyRate: Number(data.socialLinks?.youtube?.hourlyRate) || 0,
      },
      tiktok: {
        url: data.socialLinks?.tiktok?.url || '',
        hourlyRate: Number(data.socialLinks?.tiktok?.hourlyRate) || 0,
      },
      pinterest: {
        url: data.socialLinks?.pinterest?.url || '',
        hourlyRate: Number(data.socialLinks?.pinterest?.hourlyRate) || 0,
      },
      snapchat: {
        url: data.socialLinks?.snapchat?.url || '',
        hourlyRate: Number(data.socialLinks?.snapchat?.hourlyRate) || 0,
      },
      twitch: {
        url: data.socialLinks?.twitch?.url || '',
        hourlyRate: Number(data.socialLinks?.twitch?.hourlyRate) || 0,
      },
    },
  };

  try {
    const res = await api.patch(`/users/${userID}`, requestBody);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    console.error('Error updating profile data:', error);
    toast.error(error.response?.data?.message || 'Update failed');
    return {
      success: false,
      error: error.response?.data || {
        message: 'An unknown error occurred',
      },
    };
  }
};

export const resetPasswordAsync = async (data) => {
  try {
    const { confirmPassword, ...rest } = data;
    const res = await api.post(`/auth/reset-password`, rest);
    if (!res.data.success) return;
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};
