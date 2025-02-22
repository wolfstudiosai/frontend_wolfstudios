import { Dialog } from "/src/components/dialog/Dialog";
import { Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import { createPortfolio, updatePortfolio } from "../_lib/portfolio.action";
import { EPortfolioType } from "../_enums/enum";

const getValidationSchema = (isUpdated) => {
    return Yup.object().shape({
      name: Yup.string().required("Portfolio name is required"),
      type: Yup.mixed().oneOf(Object.values(EPortfolioType)).required("Portfolio type is required"),
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
      status: Yup.mixed().oneOf(['PENDING', 'APPROVED','COMPLETED','REJECTED']).notRequired(),
    });
  };

export const CreatePortfolioDialog = (props) => {    
    const { open, onClose, onConfirm, data } = props;

    const [loading, setLoading] = React.useState(false);
    const isUpdated = data?.id ? true : false;

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        isValid,
      } = useFormik({
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
          const res = isUpdated
            ? await updatePortfolio({ id: data.id, ...values })
            : await createPortfolio(values);
          if (res.success) {
            onConfirm();
          }
          setLoading(false);
        },
      });
    
    return (
        <Dialog title={isUpdated ? "Update Portfolio" : "Create Portfolio"} onClose={onClose} open={open}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.name)}>
                  <InputLabel>Portfolio Name</InputLabel>
                  <OutlinedInput name="name" value={values.name} onChange={handleChange} />
                  {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.type)} sx={{minWidth:'200px'}}>
                  <InputLabel>Portfolio Type</InputLabel>
                  <Select
                    labelId="portfolio-type"
                    value={values.type}
                    onChange={(e) => setFieldValue("type", e.target.value)}
                  >
                    {Object.values(EPortfolioType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.model)}>
                  <InputLabel>Model</InputLabel>
                  <OutlinedInput name="model" value={values.model} onChange={handleChange} />
                  {errors.model && <FormHelperText>{errors.model}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.days_location)}>
                  <InputLabel>Days Location</InputLabel>
                  <OutlinedInput name="days_location" value={values.days_location} onChange={handleChange} />
                  {errors.days_location && <FormHelperText>{errors.days_location}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.sessions)}>
                  <InputLabel>Sessions</InputLabel>
                  <OutlinedInput name="sessions" value={values.sessions} onChange={handleChange} />
                  {errors.sessions && <FormHelperText>{errors.sessions}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.producer)}>
                  <InputLabel>Producer</InputLabel>
                  <OutlinedInput name="producer" value={values.producer} onChange={handleChange} />
                  {errors.producer && <FormHelperText>{errors.producer}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.production_studio)}>
                  <InputLabel>Production Studio</InputLabel>
                  <OutlinedInput name="production_studio" value={values.production_studio} onChange={handleChange} />
                  {errors.production_studio && <FormHelperText>{errors.production_studio}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.location)}>
                  <InputLabel>Location</InputLabel>
                  <OutlinedInput name="location" value={values.location} onChange={handleChange} />
                  {errors.location && <FormHelperText>{errors.location}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.talent)}>
                  <InputLabel>Talent</InputLabel>
                  <OutlinedInput name="talent" value={values.talent} onChange={handleChange} />
                  {errors.talent && <FormHelperText>{errors.talent}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.creation_10_images_services_provide)}>
                  <InputLabel>Images Services</InputLabel>
                  <OutlinedInput
                    name="creation_10_images_services_provide"
                    value={values.creation_10_images_services_provide}
                    onChange={handleChange}
                  />
                  {errors.creation_10_images_services_provide && <FormHelperText>{errors.creation_10_images_services_provide}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.brand)}>
                  <InputLabel>Brand</InputLabel>
                  <OutlinedInput name="brand" value={values.brand} onChange={handleChange} />
                  {errors.brand && <FormHelperText>{errors.brand}</FormHelperText>}
                </FormControl>
              </Grid>
    
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.deliverables)}>
                  <InputLabel>Deliverables</InputLabel>
                  <OutlinedInput name="deliverables" value={values.deliverables} onChange={handleChange} />
                  {errors.deliverables && <FormHelperText>{errors.deliverables}</FormHelperText>}
                </FormControl>
              </Grid>
    
              {isUpdated && (
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(errors.status)}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      labelId="status"
                      value={values.status}
                      onChange={(e) => setFieldValue("status", e.target.value)}
                    >
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="APPROVED">Approved</MenuItem>
                      <MenuItem value="COMPLETED">Completed</MenuItem>
                      <MenuItem value="REJECTED">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
    
              <Stack direction={"row"} justifyContent={"flex-end"} width={"100%"}>
                <Button
                  variant="contained"
                  type={loading ? "button" : "submit"}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isUpdated ? "Update" : "Create"}
                </Button>
              </Stack>
            </Grid>
          </form>
        </Dialog>
      );
}