import { observer } from 'mobx-react';
import { z } from 'zod/v3';

import searchStore from '@pages/SearchPage/model/search.store.ts';

import Button from '@shared/ui/Button';
import Form from '@shared/ui/Form';
import FormFieldGenerator from '@shared/ui/FormFieldGenerator';
import type { FormField } from '@shared/ui/FormFieldGenerator/model';
import SectionContainer from '@shared/ui/SectionContainer';

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

export const SearchPage = observer(() => {
  return (
    <div className="container container-flex-column">
      <SectionContainer>
        <Form schema={schema} onSubmit={searchStore.filterByName} defaultValues={{ search: '' }}>
          <SectionContainer.Header titleText="Search">
            <SectionContainer.Actions
              data={[{ type: 'submit', title: 'Search', icon: 'search' }]}
            />
          </SectionContainer.Header>
          <SectionContainer.Body>
            <FormFieldGenerator data={fields} />
          </SectionContainer.Body>
        </Form>
      </SectionContainer>
      <div className="container-flex-column">
        {!searchStore.filteredLIst.length && (
          <SectionContainer>
            <SectionContainer.Body>
              <h2>No results...</h2>
              <p>Change search params.</p>
            </SectionContainer.Body>
          </SectionContainer>
        )}
        {searchStore.filteredLIst.map((i) => (
          <SectionContainer key={i.category + i.id}>
            <SectionContainer.Header titleText={`${i.name} - <${i.category}>`}>
              <Button to={`/${i.category}/${i.id}`} variant={'icon'} icon="chevron_right" />
            </SectionContainer.Header>
          </SectionContainer>
        ))}
      </div>
    </div>
  );
});
