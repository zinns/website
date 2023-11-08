export const formatContent = (content: string) =>
  content
    .split('')
    .map(char => (/[-]|[(]|[)]|[>]|[_]|[/]|[:]|[.]/g.test(char) ? `\\${char}` : char))
    .join('');
