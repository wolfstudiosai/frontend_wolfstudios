'use client';

import { InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { Iconify } from '/src/components/iconify/iconify';

export const ContentForm = ({ id, onClose, fetchList }) => {
  // ********************* Formik *******************************

  const { values, errors, handleChange, handleSubmit, setFieldValue, resetForm, setValues } = useFormik({
    initialValues: defaultCampaign(),
    validate: (values) => {
      const errors = {};
      if (!values.revoPinterest) {
        errors.revoPinterest = formConstants.required;
      }
      if (!values.revoPinterest) {
        errors.revoPinterest = formConstants.required;
      }
      if (!values.pinAccountsUsed) {
        errors.pinAccountsUsed = formConstants.required;
      }
      if (!values.googleDriveFiles) {
        errors.googleDriveFiles = formConstants.required;
      }
      if (!values.playbookLink) {
        errors.playbookLink = formConstants.required;
      }
      if (!values.upPromoteConversion) {
        errors.upPromoteConversion = formConstants.required;
      }
      if (!values.monthUploaded) {
        errors.monthUploaded = formConstants.required;
      }
      if (!values.revoInstagram) {
        errors.revoInstagram = formConstants.required;
      }
      if (!values.creatorStatus) {
        errors.creatorStatus = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = {
          ...values,
        };

        const imageFields = ['campaignImage'];
        for (const field of imageFields) {
          const value = values[field];
          if (value instanceof File) {
            const res = await imageUploader(
              [
                {
                  file: value,
                  fileName: value.name.split('.').slice(0, -1).join('.'),
                  fileType: value.type.split('/')[1],
                },
              ],
              'campaigns'
            );

            finalData[field] = res;
          } else if (typeof value === 'string') {
            finalData[field] = [value];
          }
        }

        const arrayFields = ['contentHQ', 'stakeholders', 'retailPartners', 'proposedPartners', 'spaces'];
        for (const field of arrayFields) {
          const value = values[field];
          if (value.length > 0) {
            const arrOfStr = value.map((item) => item.value);
            finalData[field] = arrOfStr;
          }
        }

        if (finalData.goals && typeof finalData.goals === 'string') {
          finalData.goals = finalData.goals.split(',').map((item) => item.trim());
        }
        const res = id ? await updateCampaignAsync(id, finalData) : await createCampaignAsync(finalData);
        if (res.success) {
          onClose?.();
          resetForm();
          fetchList();
        } else {
          console.error('Operation failed:', res.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  // *****************Use Effects*******************************

  // React.useEffect(() => {
  //   return () => {
  //     setValues(defaultContent1);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (data) {
  //     setValues(data);
  //   }
  // }, [data]);

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {/* General Information Section */}
        <Grid size={{ xs: 12 }}>
          <CustomTextField name="name" label="Name" values={data.name || ''} onChange={onChange} />
          <ErrorMessage error={errors.name} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="postQuality"
            label="Post Quality"
            values={data.postQuality?.join(', ') || ''}
            onChange={(e) => handleArrayChange('postQuality', e.target.value)}
          />
          
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="pinAccountsUsed"
            label="Pin Accounts Used"
            values={data.pinAccountsUsed || ''}
            onChange={onChange}
          />
        </Grid>

        {/* Partner Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner.IGLink"
            label="Partner IG Link"
            values={data.partner?.IGLink || ''}
            onChange={onChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner.TikTokLink"
            label="Partner TikTok Link"
            values={data.partner?.TikTokLink || ''}
            onChange={onChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="partner.YTLink"
            label="Partner YouTube Link"
            values={data.partner?.YTLink || ''}
            onChange={onChange}
          />
        </Grid>

        {/* Instagram Metrics */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="IG.TotalLikes"
            label="IG Total Likes"
            type="number"
            values={data.IG?.TotalLikes || 0}
            onChange={onChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="IG.TotalComments"
            label="IG Total Comments"
            type="number"
            values={data.IG?.TotalComments || 0}
            onChange={onChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="IG.TotalShares"
            label="IG Total Shares"
            type="number"
            values={data.IG?.TotalShares || 0}
            onChange={onChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="IG.TotalViews"
            label="IG Total Views"
            type="number"
            values={data.IG?.TotalViews || 0}
            onChange={onChange}
          />
        </Grid>

        {/* YouTube Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="YT.AccountsUsed"
            label="YT Accounts Used"
            values={data.YT?.AccountsUsed || ''}
            onChange={onChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="YT.ClubREVOTotalViews"
            label="YT ClubREVO Views"
            type="number"
            values={data.YT?.ClubREVOTotalViews || 0}
            onChange={onChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="YT.PartnerTotalLikes"
            label="YT Partner Likes"
            type="number"
            values={data.YT?.PartnerTotalLikes || 0}
            onChange={onChange}
          />
        </Grid>

        {/* Pinterest Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="Pinterest.TotalPinClicks"
            label="Pinterest Clicks"
            type="number"
            values={data.Pinterest?.TotalPinClicks || 0}
            onChange={onChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="Pinterest.TotalViews"
            label="Pinterest Views"
            type="number"
            values={data.Pinterest?.TotalViews || 0}
            onChange={onChange}
          />
        </Grid>

        {/* REVO Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="REVO.Twitter"
            label="REVO Twitter"
            select
            values={data.REVO?.Twitter || 'not-posted'}
            onChange={onChange}
          >
            <option value="not-posted">Not Posted</option>
            <option value="posted">Posted</option>
          </CustomTextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="REVO.TikTok"
            label="REVO TikTok"
            select
            values={data.REVO?.TikTok || 'not-posted'}
            onChange={onChange}
          >
            <option value="not-posted">Not Posted</option>
            <option value="posted">Posted</option>
          </CustomTextField>
        </Grid>

        {/* Relations Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="campaigns"
            label="Campaigns"
            values={data.campaigns?.join(', ') || ''}
            onChange={(e) => handleArrayChange('campaigns', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="tags"
            label="Tags"
            values={data.tags?.join(', ') || ''}
            onChange={(e) => handleArrayChange('tags', e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="retailPartners"
            label="Retail Partners"
            values={data.retailPartners?.join(', ') || ''}
            onChange={(e) => handleArrayChange('retailPartners', e.target.value)}
          />
        </Grid>

        {/* File Links */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="googleDriveFiles"
            label="Google Drive Files"
            values={data.googleDriveFiles || ''}
            onChange={onChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify
                      icon="lucide:link"
                      onClick={() => window.open(data.googleDriveFiles, '_blank')}
                      style={{ cursor: 'pointer' }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="playbookLink"
            label="Playbook Link"
            values={data.playbookLink || ''}
            onChange={onChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify
                      icon="lucide:link"
                      onClick={() => window.open(data.playbookLink, '_blank')}
                      style={{ cursor: 'pointer' }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
};
