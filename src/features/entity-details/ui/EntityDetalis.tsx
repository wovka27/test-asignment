import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { modalStateConfigMap } from '@app/providers/modal/lib/modalRegistry.ts';
import { useConfirmCloseModal } from '@app/providers/modal/lib/useConfirmCloseModal.ts';
import { useCurrentRoute } from '@app/providers/router/lib/hooks/useCurrentRoute.ts';

import EditableItem from '@widgets/EditableItem';

import contactsStore from '@entities/contacts/model/contacts.store.ts';
import type EntityStore from '@entities/entity/model/entity.store.ts';
import { detailsDataTransformer } from '@entities/entityDetails/lib/helpers';

export const EntityDetails: React.FC<{ store: InstanceType<typeof EntityStore> }> = observer(
  ({ store }) => {
    const route = useCurrentRoute();
    const navigate = useNavigate();
    const { data } = detailsDataTransformer(
      {
        'Company|company': {
          'Agreement:': ({ toDate }) =>
            `${store.details?.contract?.no} / ${toDate(store.details?.contract?.issue_date || '')}`,
          'Business entity:': store.details?.businessEntity || '',
          'Company type:': ({ toCapitalize }) => toCapitalize(store.details?.type || []),
        },
        // 'TitleText|ComponentFormRegistryKeyName'
        'Contacts|contacts': {
          'Responsible person:': contactsStore.data?.fullName || '',
          'Phone number:': ({ toPhone }) => toPhone(contactsStore.data?.phone || ''),
          'E-mail:': contactsStore.data?.email || '',
        },
      },
      {
        company: store.details,
        contacts: contactsStore.data,
      }
    );

    const onEdit = async (v) => {
      await store.updateById(route!.params.id, v);
    };

    const onRemove = () => {
      store.deleteById(route!.params.id).then(() => navigate(-1));
    };

    return (
      <EditableItem
        data={data}
        headerTitle={store.details?.name}
        headerOnEdit={onEdit}
        headerOnRemove={onRemove}
        store={store}
      />
    );
  }
);
