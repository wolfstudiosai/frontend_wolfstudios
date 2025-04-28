'use client';

import Grid from '@mui/material/Grid2';
import React from 'react';
import { getCountryListAsync, getStateListAsync } from '../../../../lib/common.actions';
import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';

import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getProductionCategoryListAsync } from '../_lib/production.action';
import { defaultProduction } from '../_lib/production.types';

export const ProductionForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
    const [values, setValues] = React.useState(data || defaultProduction);

    const status =[
        { value: 'Planning', label: 'Planning' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Completed', label: 'Completed' },
        { value: 'On Hold', label: 'On Hold' },
        { value: 'Cancelled', label: 'Cancelled' },
    ]

    const cardsUsed =[
        { value: 'Card1', label: 'Card1' },
        { value: 'Card2', label: 'Card2' },
        { value: 'Card3', label: 'Card3' },
        { value: 'Card4', label: 'Card4' },
    ]

    const equipmentRentals =[
        { value: 'Rental1', label: 'Rental1' },
        { value: 'Rental2', label: 'Rental2' },
        { value: 'Rental3', label: 'Rental3' },
        { value: 'Rental4', label: 'Rental4' },
    ]

    const productionUsage =[
        { value: 'Usage1', label: 'Usage1' },
        { value: 'Usage2', label: 'Usage2' },
        { value: 'Usage3', label: 'Usage3' },
        { value: 'Usage4', label: 'Usage4' },
    ]
    
    // *********************States*********************************
      const [mediaPreview, setMediaPreview] = React.useState(null);
      const [openVerticalUploadDialog, setOpenVerticalUploadDialog] = React.useState(false);
      const [openHorizontalUploadDialog, setOpenHorizontalUploadDialog] = React.useState(false);
      const [countries, setCountries] = React.useState([]);
      const [states, setStates] = React.useState([]);
      const [productionCategories, setproductionCategories] = React.useState([]);
      const [partners, setPartners] = React.useState([]);

      // *****************Use Effects*******************************
    
      React.useEffect(() => {
        return () => {
          setValues(defaultProduction);
        };
      }, []);
    
      React.useEffect(() => {
        if (data) {
          setValues(data);
        }
      }, [data]);
    
      React.useEffect(() => {
        const fetchCountries = async () => {
          try {
            const res = await getCountryListAsync({ page: 1, rowsPerPage: 100 });
            if (res?.success) {
              setCountries(res.data.map((item) => ({ value: item.id, label: item.Name })));
            }
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchCountries();
      }, []);
    
      React.useEffect(() => {
        const fetchStates = async () => {
          try {
            const res = await getStateListAsync({ page: 1, rowsPerPage: 100 });
            if (res?.success) {
              setStates(res.data.map((item) => ({ value: item.id, label: item.Name })));
            }
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchStates();
      }, []);
    
      React.useEffect(() => {
        const fetchproductionCategories = async () => {
          try {
            const res = await getProductionCategoryListAsync({ page: 1, rowsPerPage: 100 });
            if (res?.success) {
              setproductionCategories(res.data.map((item) => ({ value: item.id, label: item.Name })));
            }
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchproductionCategories();
      }, [])
    
      React.useEffect(() => {
        const fetchPartners = async () => {
          try {
            const res = await getPartnerListAsync({ page: 1, rowsPerPage: 100 });
            if (res?.success) {
              setPartners(res.data.map((item) => ({ value: item.id, label: item.Name })));
            }
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchPartners();
      }, [])

    return (
        <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              label="Name"
              name="name"
              value={values.name}
              onChange={onChange}
            />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Internal Notes"
              name="internalNotes"
              value={values.internalNotes}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label='Status'
              value={values.status}
              onChange={(_, value) => setFieldValue('status', value.map(i => i.value))}
              options={status}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Total Expense"
              name="totalExpense"
              value={values.totalExpense}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label='Cards Used'
              value={values.cardsUsed}
              onChange={(_, value) => setFieldValue('cardsUsed', value.map(i => i.value))}
              options={cardsUsed}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
          <CustomDatePicker
              label={'Proposed Date'}
              error={errors.proposedDate}
              value={values.proposedDate}
              format="MMMM YYYY"
              onChange={(value) => setFieldValue('proposedDate', value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
          <CustomDatePicker
              label={'Record Shoot Date'}
              error={errors.recordShootDate}
              value={values.recordShootDate}
              format="MMMM YYYY"
              onChange={(value) => setFieldValue('recordShootDate', value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Space Expense"
              name="spaceExpense"
              value={values.spaceExpense}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Talent Expense"
              name="talentExpense"
              value={values.talentExpense}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Crew Expense"
              name="crewExpense"
              value={values.crewExpense}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Food Expense"
              name="foodExpense"
              value={values.foodExpense}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label='Equipment Rentals'
              value={values.equipmentRentals}
              onChange={(_, value) => setFieldValue('equipmentRentals', value.map(i => i.value))}
              options={equipmentRentals}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Equipment Expense"
              name="equipmentExpense"
              value={values.equipmentExpense}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Google Drive Files"
              name="googleDriveFiles"
              value={values.googleDriveFiles}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label='Production Usage'
              value={values.productionUsage}
              onChange={(_, value) => setFieldValue('productionUsage', value.map(i => i.value))}
              options={productionUsage}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Director Expense"
              name="directorExpense"
              value={values.directorExpense}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Producer Expense"
              name="producerExpense"
              value={values.producerExpense}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
        </>
    );
};