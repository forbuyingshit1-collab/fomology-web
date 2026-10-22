import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  let previous = 0;
  for (const match of text.matchAll(pattern)) {
    const position = match.index ?? 0;
    if (position > previous) parts.push(text.slice(previous, position));
    if (match[2] && match[3]) parts.push(<a key={position} href={match[3]} target="_blank" rel="noopener noreferrer">{match[2]}</a>);
    else if (match[4]) parts.push(<strong key={position}>{match[4]}</strong>);
    else if (match[5]) parts.push(<code key={position}>{match[5]}</code>);
    else if (match[6]) parts.push(<em key={position}>{match[6]}</em>);
    previous = position + match[0].length;
  }
  if (previous < text.length) parts.push(text.slice(previous));
  return parts;
}

export function renderArticle(markdown: string): ReactNode[] {
  const blocks = markdown.trim().split(/\n\s*\n/);
  return blocks.map((block, index) => {
    const lines = block.split("\n");
    const first = lines[0];
    if (first.startsWith("# ")) return <h2 key={index}>{inline(first.slice(2))}</h2>;
    if (first.startsWith("## ")) return <h2 key={index}>{inline(first.slice(3))}</h2>;
    if (first.startsWith("### ")) return <h3 key={index}>{inline(first.slice(4))}</h3>;
    if (first === "---") return <hr key={index} />;
    if (first.startsWith("> ")) return <blockquote key={index}>{inline(lines.map((line) => line.replace(/^>\s?/, "")).join(" "))}</blockquote>;
    if (lines.every((line) => /^[-*] /.test(line))) return <ul key={index}>{lines.map((line, position) => <li key={position}>{inline(line.slice(2))}</li>)}</ul>;
    if (lines.every((line) => /^\d+\. /.test(line))) return <ol key={index}>{lines.map((line, position) => <li key={position}>{inline(line.replace(/^\d+\. /, ""))}</li>)}</ol>;
    if (first.startsWith("|")) {
      const rows = lines.filter((line) => !/^\|[\s:|\-]+\|$/.test(line)).map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
      return <div className="article-table-wrap" key={index}><table><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => rowIndex === 0 ? <th key={cellIndex}>{inline(cell)}</th> : <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
    }
    return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{lineIndex > 0 && <br />}{inline(line)}</span>)}</p>;
  });
}
