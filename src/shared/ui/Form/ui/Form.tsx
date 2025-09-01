import { useActionState } from 'react';

import FormFieldGenerator from '@shared/ui/FormFieldGenerator';
import SectionContainer from '@shared/ui/SectionContainer';

export const Form = ({ initialState, formAction, fieldsConfig, setState, title }) => {
  const [state, action] = useActionState((prevState, payload) => {
    formAction(prevState, payload).then(() => setState(false));
  }, initialState);
  return (
    <SectionContainer
      action={action}
      titleText={title}
      isForm
      actions={[
        {
          icon: 'check',
          title: 'Save changes',
          type: 'submit',
        },
        {
          icon: 'x',
          title: 'Cancel',
          onClick: () => {
            setState(false);
          },
        },
      ]}
    >
      <FormFieldGenerator data={fieldsConfig(state)} />
    </SectionContainer>
  );
};
