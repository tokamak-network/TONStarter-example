function HeadTitle(props: { title: string; style?: React.CSSProperties }) {
  const { title, style } = props;
  return <h1 style={{ fontSize: 60, ...style }}>{title}</h1>;
}

export default HeadTitle;
