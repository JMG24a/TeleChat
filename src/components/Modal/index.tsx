function Modal({ children }: IProps) {
  return <div>{children}</div>;
}

export { Modal };

interface IProps {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[];
}
