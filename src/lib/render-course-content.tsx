import type { ReactNode } from "react";
import { CopyButton } from "@/components/course/copy-button";

function renderInline(text: string): ReactNode[] {
  const output: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  let previous = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > previous) output.push(text.slice(previous, index));
    if (match[2] && match[3]) {
      const external = /^https?:\/\//.test(match[3]);
      output.push(<a key={index} href={match[3]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{match[2]}{external ? <span className="external-mark" aria-hidden="true"> ↗</span> : null}</a>);
    } else if (match[4]) output.push(<strong key={index}>{match[4]}</strong>);
    else if (match[5]) output.push(<code key={index}>{match[5]}</code>);
    else if (match[6]) output.push(<em key={index}>{match[6]}</em>);
    previous = index + match[0].length;
  }
  if (previous < text.length) output.push(text.slice(previous));
  return output;
}

function startsBlock(line: string): boolean {
  return /^(#{2,4}\s|```|:::\w+|>\s|[-*]\s|\d+\.\s|\|)/.test(line);
}

export function renderCourseMarkdown(markdown: string, keyPrefix = "block"): ReactNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").trim().split("\n");
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();
    if (!line.trim()) { index += 1; continue; }
    const key = `${keyPrefix}-${index}`;

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const content: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) { content.push(lines[index]); index += 1; }
      index += 1;
      const code = content.join("\n");
      nodes.push(<div className="course-code" key={key}><div className="course-code-head"><span>{language || "text"}</span><CopyButton text={code} label="คัดลอก" /></div><pre><code>{code}</code></pre></div>);
      continue;
    }

    if (line.startsWith(":::details")) {
      const title = line.replace(":::details", "").trim() || "อ่านเพิ่ม";
      const content: string[] = [];
      index += 1;
      while (index < lines.length && lines[index].trim() !== ":::") { content.push(lines[index]); index += 1; }
      index += 1;
      nodes.push(<details className="course-details" key={key}><summary>{title}</summary><div className="course-details-body">{renderCourseMarkdown(content.join("\n"), key)}</div></details>);
      continue;
    }

    if (line.startsWith(":::note") || line.startsWith(":::warning")) {
      const warning = line.startsWith(":::warning");
      const content: string[] = [];
      index += 1;
      while (index < lines.length && lines[index].trim() !== ":::") { content.push(lines[index]); index += 1; }
      index += 1;
      nodes.push(<aside className={warning ? "course-callout warning" : "course-callout"} key={key}>{renderCourseMarkdown(content.join("\n"), key)}</aside>);
      continue;
    }

    const heading = /^(#{2,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      if (level === 2) nodes.push(<h3 key={key}>{renderInline(heading[2])}</h3>);
      else nodes.push(<h4 key={key}>{renderInline(heading[2])}</h4>);
      index += 1;
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s/.test(lines[index])) { items.push(lines[index].replace(/^[-*]\s/, "")); index += 1; }
      nodes.push(<ul key={key}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ul>);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index])) { items.push(lines[index].replace(/^\d+\.\s/, "")); index += 1; }
      nodes.push(<ol key={key}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ol>);
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) { tableLines.push(lines[index].trim()); index += 1; }
      const rows = tableLines.filter((row) => !/^\|[\s:|-]+\|$/.test(row)).map((row) => row.split("|").slice(1, -1).map((cell) => cell.trim()));
      nodes.push(<div className="course-table-wrap" key={key}><table><thead><tr>{rows[0].map((cell, cellIndex) => <th key={cellIndex}>{renderInline(cell)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith("> ")) { quote.push(lines[index].slice(2)); index += 1; }
      nodes.push(<blockquote key={key}>{renderInline(quote.join(" "))}</blockquote>);
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !startsBlock(lines[index])) { paragraph.push(lines[index].trim()); index += 1; }
    nodes.push(<p key={key}>{renderInline(paragraph.join(" "))}</p>);
  }
  return nodes;
}

