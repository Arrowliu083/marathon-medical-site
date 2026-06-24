'use client';

import { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = useMemo(() => {
    let html = content;

    // Blockquotes — merge consecutive lines into one blockquote
    html = html.replace(/^> (.+)$/gm, '<blockquote-line>$1</blockquote-line>');
    html = html.replace(/((?:<blockquote-line>.*<\/blockquote-line>\n?)+)/g, (match) => {
      const inner = match.replace(/<blockquote-line>/g, '').replace(/<\/blockquote-line>\n?/g, '<br/>');
      return '<blockquote>' + inner.replace(/<br\/>$/, '') + '</blockquote>';
    });

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Unordered lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    // Tables (simple)
    html = html.replace(/^\|(.+)\|$/gm, (match: string) => {
      const cells = match.split('|').filter((c: string) => c.trim());
      const isHeader = cells.every((c: string) => /^[-:\s]+$/.test(c.trim()));
      if (isHeader) return '';
      const tag = match.includes('---') ? '' : 'td';
      const rowTag = 'tr';
      return `<${rowTag}>${cells.map((c: string) => `<td>${c.trim()}</td>`).join('')}</${rowTag}>`;
    });

    // Paragraphs (double newlines)
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p><h([23])>/g, '<h$1>');
    html = html.replace(/<\/h([23])><\/p>/g, '</h$1>');
    html = html.replace(/<p><ul>/g, '<ul>');
    html = html.replace(/<\/ul><\/p>/g, '</ul>');
    html = html.replace(/<p><blockquote>/g, '<blockquote>');
    html = html.replace(/<\/blockquote><\/p>/g, '</blockquote>');
    html = html.replace(/<p><blockquote-line>/g, '<blockquote-line>');
    html = html.replace(/<\/blockquote-line><\/p>/g, '</blockquote-line>');

    return html;
  }, [content]);

  return (
    <div
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
