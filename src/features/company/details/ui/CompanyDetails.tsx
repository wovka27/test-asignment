import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { modalStateConfigMap } from '@app/providers/modal/lib/modalRegistry.ts';
import { useConfirmCloseModal } from '@app/providers/modal/lib/useConfirmCloseModal.ts';

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

export const CompanyDetails: React.FC = observer(() => {
  const navigate = useNavigate();
  const { data } = useDetailsData<ICompany>(
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
        company: companyDetailsStore.data,
        contacts: contactsDetailsStore.data,
      };
    }
  );

  const [removePhoto] = useConfirmCloseModal(
    modalStateConfigMap.confirm.remove_photo,
    (_, { name }) => {
      fetchDeleteCompanyImage(name);
    }
  );

  const onEdit = (v) => {
    fetchUpdateCompany(v).then(({ data }) => {
      companyDetailsStore.setData(data);
    });
  };

  const onRemove = () => {
    fetchDeleteCompany().then(() => navigate(-1));
  };

  return (
    <EntityDetails
      data={data}
      headerTitle={companyDetailsStore.data?.name}
      headerOnEdit={onEdit}
      photosData={companyDetailsStore.data?.photos || []}
      photosOnUpload={fetchAddCompanyImage}
      photosOnRemove={removePhoto}
      headerOnRemove={onRemove}
    />
  );
});
