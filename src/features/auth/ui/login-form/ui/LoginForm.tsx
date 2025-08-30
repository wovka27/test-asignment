import { useActionState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthService from '@features/auth/api/auth.service.ts';
import SubmitButton from '@features/submit-button';

import Input from '@shared/ui/Input';
import SectionContainer from '@shared/ui/SectionContainer';

import './login-form.scss';

const initialState = {
  success: false,
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [state, formAction] = useActionState(AuthService.loginAction, initialState);

  useEffect(() => {
    if (state.success) navigate('/');
  }, [state.success]);

  return (
    <SectionContainer titleText="Authorization" className="login-form">
      <form action={formAction} className="login-form__form">
        <Input name="user" placeholder="Enter a name" required minLength={3} />
        <SubmitButton variant="filled" size="lg">
          Submit
        </SubmitButton>
      </form>
    </SectionContainer>
  );
};
