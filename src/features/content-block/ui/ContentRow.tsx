import { useState } from 'react';

import type { ContentRowProps } from '@features/content-block/model';

import ContentInfoItem from '@shared/ui/ContentInfoItem';
import SectionContainer from '@shared/ui/SectionContainer';
import type { ActionType } from '@shared/ui/SectionContainer/model';

export const ContentRow: ContentRowProps = ({
  titleText,
  onEdit,
  data,
  EntityForm,
  componentFormRegistryKey,
  initialState,
  hideActions = false,
}) => {
  const [state, setState] = useState<boolean>(false);

  const handleClick = () => {
    if (!componentFormRegistryKey && !EntityForm && !state) {
      onEdit?.();
      return;
    }
    setState((pre) => !pre);
  };

  const btn: ActionType[] = [{ icon: 'edit', onClick: handleClick, title: 'Edit' }];

  if (!data.length) return null;

  if (componentFormRegistryKey && EntityForm && state) {
    return <EntityForm setState={setState} initialState={initialState} />;
  }

  return (
    <SectionContainer>
      <SectionContainer.Header titleText={titleText}>
        <SectionContainer.Actions data={!hideActions ? btn : undefined} />
      </SectionContainer.Header>
      <SectionContainer.Body>
        <Items data={data} />
      </SectionContainer.Body>
    </SectionContainer>
  );
};

const Items: React.FC<{ data: Array<{ label: string; value: string }> }> = ({ data }) => {
  return data.map(({ label, value }) => <ContentInfoItem key={label} label={label} text={value} />);
};
