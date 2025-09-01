import type { EntityDetailsFormProps } from '@shared/ui/EntityDetailsForm/model/types.ts';
import Form from '@shared/ui/Form';
import FormFieldGenerator from '@shared/ui/FormFieldGenerator';
import SectionContainer from '@shared/ui/SectionContainer';

export const EntityDetailsForm = <T extends Record<string, unknown>>(
  props: EntityDetailsFormProps<T>
) => {
  const {
    onSubmit,
    schema,
    defaultValues,
    syncValues,
    titleText,
    ariaLabelledby,
    fields,
    actions,
  } = props;

  return (
    <Form onSubmit={onSubmit} schema={schema} defaultValues={defaultValues} syncValues={syncValues}>
      <SectionContainer>
        <SectionContainer.Header titleText={titleText} ariaLabelledby={ariaLabelledby}>
          <SectionContainer.Actions data={actions} />
        </SectionContainer.Header>

        <SectionContainer.Body>
          <FormFieldGenerator data={fields} />
        </SectionContainer.Body>
      </SectionContainer>
    </Form>
  );
};
