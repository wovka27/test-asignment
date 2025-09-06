import { fields } from '@features/contacts-form/config/formFieldsConfig.ts';
import { type FormValues, schema } from '@features/contacts-form/model/schema.ts';

import contactsStore from '@entities/contacts/model/contacts.store.ts';
import type { EntityComponentFormPropsMap } from '@entities/entity/model/types.ts';

import EntityDetailsForm from '@shared/ui/EntityDetailsForm';

export const ContactsForm: React.FC<EntityComponentFormPropsMap['contacts']> = ({
  initialState,
  setState,
}) => {
  return (
    <EntityDetailsForm<FormValues>
      defaultValues={initialState}
      onSubmit={(v) => contactsStore.updateById(v)}
      titleText={'Contacts'}
      fields={fields}
      schema={schema}
      actions={[
        { type: 'submit', icon: 'check', title: 'Save changes' },
        { icon: 'x', title: 'Cancel', onClick: () => setState(false) },
      ]}
    />
  );
};
