interface IGrabScrollContainer extends React.HTMLAttributes<HTMLDivElement> {
  wheelEvent?: boolean;
}

export type GrabScrollContainerProps = React.FC<IGrabScrollContainer>;
