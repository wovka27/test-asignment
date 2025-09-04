import { observer } from 'mobx-react';
import { z } from 'zod/v3';

import searchStore from '@pages/SearchPage/model/search.store.ts';

import Button from '@shared/ui/Button';
import EntityDetailsForm from '@shared/ui/EntityDetailsForm';
import type { FormField } from '@shared/ui/FormFieldGenerator/model';
import SectionContainer from '@shared/ui/SectionContainer';
import type { ActionType } from '@shared/ui/SectionContainer/model';

const schema = z.object({
  search: z.string(),
});

const fields: FormField[] = [
  {
    type: 'search',
    label: 'Search',
    name: 'search',
    props: {
      placeholder: 'Search...',
    },
  },
];

const defaultValues = { search: '' };

const actions: ActionType[] = [{ type: 'submit', title: 'Search', icon: 'search' }];

export const SearchPage = observer(() => {
  return (
    <div className="container container-flex-column">
      <EntityDetailsForm
        titleText="Search"
        onSubmit={searchStore.filterByName}
        fields={fields}
        schema={schema}
        defaultValues={defaultValues}
        actions={actions}
      />
      <div className="container-flex-column">
        {!searchStore.filteredLIst.length ? (
          <SectionContainer>
            <h2>No results...</h2>
            <p>Change search params.</p>
          </SectionContainer>
        ) : (
          searchStore.filteredLIst.map((i) => (
            <SectionContainer key={i.category! + i.id}>
              <SectionContainer.Header titleText={`${i.name} - <${i.category}>`}>
                <Button to={`/${i.category}/${i.id}`} variant={'icon'} icon="chevron_right" />
              </SectionContainer.Header>
            </SectionContainer>
          ))
        )}
      </div>
    </div>
  );
});
