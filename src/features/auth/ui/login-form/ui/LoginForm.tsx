import { useNavigate } from 'react-router-dom';

import AuthService from '@features/auth/api/auth.service.ts';
import { fields } from '@features/auth/ui/login-form/config/fields.ts';
import { schema } from '@features/auth/ui/login-form/config/schema.ts';
import SubmitButton from '@features/submit-button';

import Form from '@shared/ui/Form';
import FormFieldGenerator from '@shared/ui/FormFieldGenerator';
import SectionContainer from '@shared/ui/SectionContainer';

import './login-form.scss';

export const LoginForm = () => {
  const navigate = useNavigate();

  const submit = (value: { user: string }) => {
    AuthService.loginAction(value).then((result) => {
      if (result.success) navigate('/');
    });
  };

  return (
    <Form onSubmit={submit} schema={schema} defaultValues={{ user: '' }}>
      <SectionContainer className="login-form">
        <SectionContainer.Header titleText="Authorization" />
        <SectionContainer.Body>
          <FormFieldGenerator data={fields} />
        </SectionContainer.Body>
        <SubmitButton variant="filled" size="lg">
          Submit
        </SubmitButton>
      </SectionContainer>
    </Form>
  );
};
