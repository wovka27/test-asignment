import { useState } from 'react';

import { modalStateConfigMap } from '@app/providers/modal/lib/modalRegistry.ts';
import { useConfirmCloseModal } from '@app/providers/modal/lib/useConfirmCloseModal.ts';

import Photos from '@features/photos';

import { fetchDeleteCompanyImage } from '@entities/companies/api';
import type { ICompany } from '@entities/companies/model';

import SectionContainer from '@shared/ui/SectionContainer';

export const CompanyDetailPage = () => {
  const [photos] = useState<ICompany['photos']>([]);
  const [removePhoto] = useConfirmCloseModal(
    modalStateConfigMap.confirm.remove_photo,
    (_, payload) => {
      fetchDeleteCompanyImage((payload as ICompany['photos'][number]).name);
    }
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="container">
      <SectionContainer
        actions={[{ title: 'Edit', icon: 'edit', onClick: () => {} }]}
        titleText="Company Details"
      ></SectionContainer>
      <SectionContainer
        actions={[{ title: 'Edit', icon: 'edit', onClick: () => {} }]}
        titleText="Contacts"
      >
        <h2>Vladimir Demyanchuk</h2>
        <div className="settings-page__avatar"></div>
      </SectionContainer>
      <Photos onRemove={removePhoto} data={photos} title="Photos" onUpload={() => {}} />
    </div>
  );
};
