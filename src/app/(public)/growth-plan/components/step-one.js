import React from "react";

import { Field, useFormikContext } from "formik";
import { TextField, MenuItem, Stack } from "@mui/material";
import { formLabel } from "./form-label";

const roles = ["Celebrity", "Manager", "PR Agency", "Other"];

export default function Step1() {
  const { errors, touched } = useFormikContext();
  return (
    <Stack spacing={2}>
      <Field
        as={TextField}
        name="name"
        label={formLabel("Full Name", true)}
        fullWidth
        error={touched.name && !!errors.name}
        helperText={touched.name && errors.name}
      />
      <Field
        as={TextField}
        select
        name="role"
        label={formLabel("Role", true)}
        fullWidth
        error={touched.role && !!errors.role}
        helperText={touched.role && errors.role}
      >
        {roles.map((r) => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </Field>
      <Field
        as={TextField}
        name="email"
        label={formLabel("Email", true)}
        fullWidth
        error={touched.email && !!errors.email}
        helperText={touched.email && errors.email}
      />
      <Field
        as={TextField}
        name="phone"
        label={formLabel("Phone")}
        fullWidth
        error={touched.phone && !!errors.phone}
        helperText={touched.phone && errors.phone}
      />
    </Stack>
  );
}
