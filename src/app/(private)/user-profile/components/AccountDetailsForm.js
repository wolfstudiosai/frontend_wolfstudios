'use client';

import { Box, FormHelperText, Grid2 as Grid, Typography, useColorScheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

import ProfileUploader from '/src/components/uploaders/profile-uploader';

const socialPlatforms = [
  { name: 'instagram', label: 'Instagram' },
  { name: 'facebook', label: 'Facebook' },
  { name: 'twitter', label: 'Twitter' },
  { name: 'linkedin', label: 'LinkedIn' },
  { name: 'youtube', label: 'YouTube' },
  { name: 'tiktok', label: 'TikTok' },
  { name: 'pinterest', label: 'Pinterest' },
  { name: 'snapchat', label: 'Snapchat' },
  { name: 'twitch', label: 'Twitch' },
];

export function AccountDetailsForm({ isEditing, values, errors, handleChange, handleSubmit, setFieldValue }) {
  const { mode } = useColorScheme();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <ProfileUploader
                      value={values?.profileImage}
                      onFileSelect={(file) => setFieldValue('profileImage', file)}
                      disabled={!isEditing}
                    />
                  </Stack>
                  <Stack spacing={2}>
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                          <FormControl fullWidth error={Boolean(errors.email)}>
                            <InputLabel>Email</InputLabel>
                            {isEditing ? (
                              <OutlinedInput
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                disabled
                                sx={{
                                  backgroundColor: 'rgba(0,0,0,0.1)',
                                  '&.Mui-disabled': {
                                    backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)',
                                  },
                                }}
                              />
                            ) : (
                              <Typography color="text.secondary">{values.email || 'N/A'}</Typography>
                            )}
                          </FormControl>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                          <FormControl fullWidth error={Boolean(errors.role)}>
                            <InputLabel>Role</InputLabel>
                            {isEditing ? (
                              <OutlinedInput
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                                disabled
                                sx={{
                                  backgroundColor: 'rgba(0,0,0,0.1)',
                                  '&.Mui-disabled': {
                                    backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)',
                                  },
                                }}
                              />
                            ) : (
                              <Typography color="text.secondary">{values.role || 'N/A'}</Typography>
                            )}
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                          <FormControl fullWidth error={Boolean(errors.firstName)}>
                            <InputLabel>First Name</InputLabel>
                            {isEditing ? (
                              <OutlinedInput name="firstName" value={values.firstName} onChange={handleChange} />
                            ) : (
                              <Typography color="text.secondary">{values.firstName || 'N/A'}</Typography>
                            )}
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                          <FormControl fullWidth error={Boolean(errors.lastName)}>
                            <InputLabel>Last Name</InputLabel>
                            {isEditing ? (
                              <OutlinedInput name="lastName" value={values.lastName} onChange={handleChange} />
                            ) : (
                              <Typography color="text.secondary">{values.lastName || 'N/A'}</Typography>
                            )}
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box>
                      <FormControl fullWidth error={Boolean(errors.contactNumber)}>
                        <InputLabel>Contact No.</InputLabel>
                        {isEditing ? (
                          <>
                            <OutlinedInput
                              name="contactNumber"
                              value={values.contactNumber}
                              onChange={handleChange}
                              type="text"
                            />
                            <FormHelperText>{errors.contactNumber}</FormHelperText>
                          </>
                        ) : (
                          <Typography color="text.secondary">{values.contactNumber || 'N/A'}</Typography>
                        )}
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl fullWidth error={Boolean(errors.state)}>
                        <InputLabel>State</InputLabel>
                        {isEditing ? (
                          <OutlinedInput name="state" value={values.state} onChange={handleChange} />
                        ) : (
                          <Typography color="text.secondary">{values.state || 'N/A'}</Typography>
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl fullWidth error={Boolean(errors.city)}>
                        <InputLabel>City</InputLabel>
                        {isEditing ? (
                          <OutlinedInput name="city" value={values.city} onChange={handleChange} />
                        ) : (
                          <Typography color="text.secondary">{values.city || 'N/A'}</Typography>
                        )}
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl fullWidth error={Boolean(errors.country)}>
                        <InputLabel>Country</InputLabel>
                        {isEditing ? (
                          <OutlinedInput name="country" value={values.country} onChange={handleChange} />
                        ) : (
                          <Typography color="text.secondary">{values.country || 'N/A'}</Typography>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack spacing={2}>
                    {socialPlatforms.map((platform) => (
                      <Grid container spacing={2} key={platform.name}>
                        <Grid size={{ xs: 12, md: 8 }}>
                          <FormControl fullWidth>
                            <InputLabel>{platform.label} URL</InputLabel>
                            {isEditing ? (
                              <OutlinedInput
                                name={'socialLinks.' + platform.name + '.url'}
                                value={values.socialLinks?.[platform.name]?.url || ''}
                                onChange={handleChange}
                              />
                            ) : (
                              <Typography color="text.secondary">
                                {values.socialLinks?.[platform.name]?.url || 'N/A'}
                              </Typography>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <FormControl fullWidth>
                            <InputLabel>{platform.label} Hourly Rate</InputLabel>
                            {isEditing ? (
                              <OutlinedInput
                                name={'socialLinks.' + platform.name + '.hourlyRate'}
                                value={values.socialLinks?.[platform.name]?.hourlyRate || ''}
                                onChange={handleChange}
                                type="number"
                                inputProps={{ step: '0.01' }}
                              />
                            ) : (
                              <Typography color="text.secondary">
                                {values.socialLinks?.[platform.name]?.hourlyRate
                                  ? `$${values.socialLinks[platform.name].hourlyRate}`
                                  : 'N/A'}
                              </Typography>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
