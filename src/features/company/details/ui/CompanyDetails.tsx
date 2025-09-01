import { observer } from 'mobx-react';

import EntityDetails from '@widgets/EntityDetails';

import {
  fetchAddCompanyImage,
  fetchDeleteCompany,
  fetchDeleteCompanyImage,
  fetchUpdateCompany,
} from '@entities/companies/api';
import type { ICompany } from '@entities/companies/model';
import { companyDetailsStore } from '@entities/companies/model/companyDetalis.store.ts';
import { contactsDetailsStore } from '@entities/contacts/model/contactsDetalis.store.ts';
import { useDetailsData } from '@entities/entityDetails/lib/hooks';

import { FormatHelper } from '@shared/lib/helpers';

export const CompanyDetails: React.FC = observer(() => {
  const { data, payload } = useDetailsData<ICompany>(
    () => {
      const { contract, businessEntity, type } = companyDetailsStore.data;
      const { firstname, lastname, email, phone } = contactsDetailsStore.data;

      return {
        'Company|company': {
          'Agreement:': ({ toDate }) => `${contract.no} / ${toDate(contract.issue_date)}`,
          'Business entity:': businessEntity,
          'Company type:': ({ toCapitalize }) => toCapitalize(type),
        },
        // 'TitleText|ComponentFormRegistryKeyName'
        'Contacts|contacts': {
          'Responsible person:': `${firstname} ${lastname}`,
          'Phone number:': ({ toPhone }) => toPhone(phone),
          'E-mail:': email,
        },
      };
    },
    () => {
      return {
        company: companyDetailsStore.initialFormState,
        contacts: contactsDetailsStore.initialFormState,
      };
    }
  );

  const onEdit = (v) => {
    fetchUpdateCompany(v).then(({ data }) => {
      companyDetailsStore.setData(data);
    });
  };

  return (
    <EntityDetails
      data={data}
      headerTitle={companyDetailsStore.data?.name}
      headerOnEdit={onEdit}
      photosData={payload.details.photos}
      photosOnUpload={fetchAddCompanyImage}
      photosOnRemove={fetchDeleteCompanyImage}
      headerOnRemove={fetchDeleteCompany}
    />
  );
});
