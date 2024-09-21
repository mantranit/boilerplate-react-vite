import { RHFPasswordField } from './rhf-password-field';
import { RHFMultiSelect, RHFSelect } from './rhf-select';
import { RHFMultiSwitch, RHFSwitch } from './rhf-switch';
import { RHFTextField } from './rhf-text-field';
import { RHFUpload, RHFUploadAvatar } from './rhf-upload';

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Password: RHFPasswordField,
  Select: RHFSelect,
  MultiSelect: RHFMultiSelect,
  UploadAvatar: RHFUploadAvatar,
  Upload: RHFUpload,
  Switch: RHFSwitch,
  MultiSwitch: RHFMultiSwitch,
};
