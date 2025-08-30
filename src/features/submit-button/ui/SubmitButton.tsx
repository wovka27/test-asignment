import { useFormStatus } from 'react-dom';

import type { SubmitButtonProps } from '@features/submit-button/model';

import Button from '@shared/ui/Button';

export const SubmitButton: SubmitButtonProps = ({ children, ...rest }) => {
  const { pending } = useFormStatus();

  return (
    <Button loading={pending} type="submit" {...rest}>
      {children}
    </Button>
  );
};
