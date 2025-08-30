import type { ContentRowProps } from '@features/content-block/model';

import ContentInfoItem from '@shared/ui/ContentInfoItem';
import SectionContainer from '@shared/ui/SectionContainer';
import type { ActionType } from '@shared/ui/SectionContainer/model';

export const ContentRow: ContentRowProps = ({
  titleText,
  onEdit,
  data,
  id,
  hideActions = false,
}) => {
  if (!data.length) return;

  const btn: ActionType[] = [{ icon: 'edit', onClick: onEdit, title: 'Edit' }];

  return (
    <SectionContainer id={id} titleText={titleText} actions={!hideActions ? btn : undefined}>
      <Items data={data} />
    </SectionContainer>
  );
};

const Items: React.FC<{ data: Array<{ label: string; value: string }> }> = ({ data }) => {
  return data.map(({ label, value }) => <ContentInfoItem key={label} label={label} text={value} />);
};
