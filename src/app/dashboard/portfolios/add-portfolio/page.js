'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';

import { EPortfolioType } from '../_enums/enum';
import { createPortfolio, getPortfolioById, updatePortfolio } from '../_lib/portfolio.action';

const getValidationSchema = (isUpdated) => {
  return Yup.object().shape({
    name: Yup.string().required('Portfolio name is required'),
    type: Yup.mixed().oneOf(Object.values(EPortfolioType)).required('Portfolio type is required'),
    model: Yup.string().notRequired(),
    days_location: Yup.string().notRequired(),
    sessions: Yup.string().notRequired(),
    producer: Yup.string().notRequired(),
    production_studio: Yup.string().notRequired(),
    location: Yup.string().notRequired(),
    talent: Yup.string().notRequired(),
    creation_10_images_services_provide: Yup.string().notRequired(),
    brand: Yup.string().notRequired(),
    deliverables: Yup.string().notRequired(),
    status: Yup.mixed().oneOf(['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED']).notRequired(),
  });
};

const Page = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const searchParam = useSearchParams();
  const selectedId = searchParam.get('id');
  const isUpdated = selectedId ? true : false;

  React.useEffect(() => {
    if (selectedId) {
      getPortfolioByselectedId(selectedId);
    }
  }, [selectedId]);

  const getPortfolioByselectedId = async () => {
    try {
      const response = await getPortfolioById(selectedId);
      if (response.success) {
        const portfolio = response.data;
        setValues(portfolio);
      }
    } catch (error) {}
  };

  const { values, errors, isValid, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
    initialValues: data || {
      name: '',
      type: EPortfolioType.Vlogs,
      model: '',
      days_location: '',
      sessions: '',
      producer: '',
      production_studio: '',
      location: '',
      talent: '',
      creation_10_images_services_provide: '',
      brand: '',
      deliverables: '',
      status: 'PENDING',
    },
    validationSchema: getValidationSchema(isUpdated),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = isUpdated ? await updatePortfolio({ id: selectedId, ...values }) : await createPortfolio(values);
        if (res.success) {
          setLoading(false);
          router.push('/dashboard/portfolios');
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error('Network error');
      }
    },
  });

  return (
    <Stack spacing={4}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">{isUpdated ? 'Update Portfolio' : 'Create Portfolio'}</Typography>
        </Box>
      </Stack>
      <Card>
        <CardContent>
          <Box sx={{ padding: '20px' }}>
            <Grid container spacing={2}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Portfolio Name */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.name)}>
                      <InputLabel>Portfolio Name</InputLabel>
                      <OutlinedInput name="name" value={values.name} onChange={handleChange} />
                      {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Portfolio Type */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.type)} sx={{ minWidth: '200px' }}>
                      <InputLabel>Portfolio Type</InputLabel>
                      <Select
                        labelId="portfolio-type"
                        value={values.type}
                        onChange={(e) => setFieldValue('type', e.target.value)}
                      >
                        {Object.values(EPortfolioType).map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Model */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.model)}>
                      <InputLabel>Model</InputLabel>
                      <OutlinedInput name="model" value={values.model} onChange={handleChange} />
                      {errors.model && <FormHelperText>{errors.model}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Days Location */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.days_location)}>
                      <InputLabel>Days Location</InputLabel>
                      <OutlinedInput name="days_location" value={values.days_location} onChange={handleChange} />
                      {errors.days_location && <FormHelperText>{errors.days_location}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Sessions */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.sessions)}>
                      <InputLabel>Sessions</InputLabel>
                      <OutlinedInput name="sessions" value={values.sessions} onChange={handleChange} />
                      {errors.sessions && <FormHelperText>{errors.sessions}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Producer */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.producer)}>
                      <InputLabel>Producer</InputLabel>
                      <OutlinedInput name="producer" value={values.producer} onChange={handleChange} />
                      {errors.producer && <FormHelperText>{errors.producer}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Production Studio */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.production_studio)}>
                      <InputLabel>Production Studio</InputLabel>
                      <OutlinedInput
                        name="production_studio"
                        value={values.production_studio}
                        onChange={handleChange}
                      />
                      {errors.production_studio && <FormHelperText>{errors.production_studio}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Location */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.location)}>
                      <InputLabel>Location</InputLabel>
                      <OutlinedInput name="location" value={values.location} onChange={handleChange} />
                      {errors.location && <FormHelperText>{errors.location}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Talent */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.talent)}>
                      <InputLabel>Talent</InputLabel>
                      <OutlinedInput name="talent" value={values.talent} onChange={handleChange} />
                      {errors.talent && <FormHelperText>{errors.talent}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Creation 10 Images Services (Text Area) */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(errors.creation_10_images_services_provide)}>
                      <InputLabel>Images Services</InputLabel>
                      <TextField
                        name="creation_10_images_services_provide"
                        value={values.creation_10_images_services_provide}
                        onChange={handleChange}
                        multiline
                        rows={4} // Adjust the number of rows for the textarea
                      />
                      {errors.creation_10_images_services_provide && (
                        <FormHelperText>{errors.creation_10_images_services_provide}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Brand */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.brand)}>
                      <InputLabel>Brand</InputLabel>
                      <OutlinedInput name="brand" value={values.brand} onChange={handleChange} />
                      {errors.brand && <FormHelperText>{errors.brand}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Deliverables */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.deliverables)}>
                      <InputLabel>Deliverables</InputLabel>
                      <OutlinedInput name="deliverables" value={values.deliverables} onChange={handleChange} />
                      {errors.deliverables && <FormHelperText>{errors.deliverables}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Status */}
                  {isUpdated && (
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={Boolean(errors.status)}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          labelId="status"
                          value={values.status}
                          onChange={(e) => setFieldValue('status', e.target.value)}
                        >
                          <MenuItem value="PENDING">Pending</MenuItem>
                          <MenuItem value="APPROVED">Approved</MenuItem>
                          <MenuItem value="COMPLETED">Completed</MenuItem>
                          <MenuItem value="REJECTED">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'}>
                      <Button
                        variant="contained"
                        type={loading ? 'button' : 'submit'}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                      >
                        {isUpdated ? 'Update' : 'Create'}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Page;
