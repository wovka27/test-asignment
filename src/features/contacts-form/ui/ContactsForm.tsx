import { formFieldsConfigResolver } from '@features/contacts-form/config/formFieldsConfigResolver.ts';

import contactService from '@entities/contacts/api/Contacts.service.ts';
import type { EntityComponentFormPropsMap } from '@entities/entityDetails/model/types.ts';

import Form from '@shared/ui/Form';

export const ContactsForm: React.FC<EntityComponentFormPropsMap['contacts']> = ({
  setState,
  initialState,
}) => {
  return (
    <Form
      title="Contacts"
      initialState={initialState}
      fieldsConfig={formFieldsConfigResolver}
      formAction={contactService.formAction}
      setState={setState}
    />
  );
};
