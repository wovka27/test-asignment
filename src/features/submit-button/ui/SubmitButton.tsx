import { useFormStatus } from 'react-dom';

import type { SubmitButtonProps } from '@features/submit-button/model';

import Button from '@shared/ui/Button';
import { useFormContext } from 'react-hook-form';

export const SubmitButton: SubmitButtonProps = ({ children, ...rest }) => {
  const { formState } = useFormContext();

  return (
    <Button loading={formState.isSubmitting} type="submit" {...rest}>
      {children}
    </Button>
  );
};
