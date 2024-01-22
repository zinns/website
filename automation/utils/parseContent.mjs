const parseContent = content =>
  content
    .split('')
    .map(char => (/[-]|[(]|[)]|[>]|[_]|[/]|[:]|[.]/g.test(char) ? `\\${char}` : char))
    .join('');

export default parseContent;
