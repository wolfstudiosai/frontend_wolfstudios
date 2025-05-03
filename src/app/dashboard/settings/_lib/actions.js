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
    firstName: data.firstName,
    lastName: data.lastName,
    profileImage,
    contactNumber: data.contactNumber,
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
