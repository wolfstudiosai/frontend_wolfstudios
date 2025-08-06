import { useState } from 'react';
import { Button, CircularProgress, FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { toast } from 'sonner';

import { Dialog } from '/src/components/dialog/Dialog';

import { createNewsletterSignup } from '../../../actions/common.actions';

export const ManageNewsletterDialog = (props) => {
  const { open, onClose, onConfirm, data } = props;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const res = await createNewsletterSignup(email);
      if (res.success) {
        setEmail('');
        toast.success("You've successfully subscribed to our newsletter");
        onConfirm();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog title={'Add newsletter email'} onClose={onClose} open={open} size="xs">
      <FormControl fullWidth >
        <InputLabel>Email</InputLabel>

        <OutlinedInput
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && email) {
              handleSubscribe();
            }
          }}
        />
      </FormControl>

      <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'} mt={2}>
        <Button
          variant="contained"
          disabled={loading || !email}
          onClick={handleSubscribe}
        >
          Add
        </Button>
      </Stack>
    </Dialog>
  );
};
