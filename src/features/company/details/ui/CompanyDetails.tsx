import EntityDetails from '@widgets/EntityDetails';

import type { ICompany } from '@entities/companies/model';
import { useDetailsData } from '@entities/entityDetails/lib/hooks';

export const CompanyDetails: React.FC = () => {
  const { data, payload } = useDetailsData<ICompany>((payload) => {
    const { details, contacts } = payload;
    const { contract, businessEntity, type } = details;
    const { firstname, lastname, email, phone } = contacts;

    return {
      Company: {
        'Agreement:': ({ toDate }) => `${contract.no} / ${toDate(contract.issue_date)}`,
        'Business entity:': businessEntity,
        'Company type:': ({ toCapitalize }) => toCapitalize(type),
      },
      Contacts: {
        'Responsible person:': `${firstname} ${lastname}`,
        'Phone number:': ({ toPhone }) => toPhone(phone),
        'E-mail:': email,
      },
    };
  });

  return (
    <EntityDetails
      data={data}
      headerTitle={payload.details.name}
      headerOnEdit={() => {}}
      headerOnRemove={() => {}}
    />
  );
};
