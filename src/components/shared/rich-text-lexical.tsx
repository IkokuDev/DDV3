
"use client";

import React from 'react';
import { SerializedEditorState, SerializedLexicalNode, SerializedParagraphNode, SerializedTextNode } from 'lexical';

interface RichTextLexicalProps {
  content: any; // SerializedEditorState from Payload
  className?: string;
}

// Function to safely get text from a node
const getNodeText = (node: SerializedLexicalNode): string => {
  if (node.type === 'text') {
    return (node as SerializedTextNode).text || '';
  }
  if (node.type === 'linebreak') {
    return '\n';
  }
  if ('children' in node && Array.isArray((node as any).children)) {
    return (node as any).children.map(getNodeText).join('');
  }
  return '';
};

export const RichTextLexical: React.FC<RichTextLexicalProps> = ({ content, className }) => {
  if (!content || !content.root || !content.root.children) {
    return <p className={cn("text-muted-foreground", className)}>No content available.</p>;
  }

  const renderNode = (node: SerializedLexicalNode, index: number): JSX.Element | null => {
    switch (node.type) {
      case 'paragraph':
        const pNode = node as SerializedParagraphNode;
        return (
          <p key={index} className="mb-4 last:mb-0">
            {pNode.children?.map(renderNode)}
          </p>
        );
      case 'heading':
        const headingNode = node as any; // Assuming 'tag' (h1, h2 etc.) and 'children'
        const Tag = headingNode.tag || 'h3';
        const commonHeadingClasses = "font-semibold mb-3";
        let specificHeadingClasses = "";
        switch(Tag) {
            case 'h1': specificHeadingClasses = "text-3xl"; break;
            case 'h2': specificHeadingClasses = "text-2xl"; break;
            case 'h3': specificHeadingClasses = "text-xl"; break;
            case 'h4': specificHeadingClasses = "text-lg"; break;
            default: specificHeadingClasses = "text-md";
        }
        return (
          <Tag key={index} className={cn(commonHeadingClasses, specificHeadingClasses)}>
            {headingNode.children?.map(renderNode)}
          </Tag>
        );
      case 'list':
        const listNode = node as any; // Assuming 'tag' (ul, ol), 'listType', and 'children'
        const ListTag = listNode.tag || 'ul';
        const listClasses = ListTag === 'ul' ? "list-disc pl-5 mb-4" : "list-decimal pl-5 mb-4";
        return (
          <ListTag key={index} className={listClasses}>
            {listNode.children?.map(renderNode)}
          </ListTag>
        );
      case 'listitem':
        const listItemNode = node as any; // Assuming 'children'
        return (
          <li key={index} className="mb-1">
            {listItemNode.children?.map(renderNode)}
          </li>
        );
      case 'link':
        const linkNode = node as any; // Assuming 'url', 'children', 'rel', 'title'
        return (
          <a
            key={index}
            href={linkNode.url}
            target="_blank"
            rel={linkNode.rel || "noopener noreferrer"}
            title={linkNode.title}
            className="text-primary hover:underline"
          >
            {linkNode.children?.map(renderNode)}
          </a>
        );
      case 'text':
        const textNode = node as SerializedTextNode;
        let style: React.CSSProperties = {};
        if (textNode.format) {
          if (textNode.format & 1) style.fontWeight = 'bold'; // Bold
          if (textNode.format & 2) style.fontStyle = 'italic'; // Italic
          if (textNode.format & 4) style.textDecoration = 'strikethrough'; // Strikethrough
          if (textNode.format & 8) style.textDecoration = (style.textDecoration ? style.textDecoration + ' underline' : 'underline').trim(); // Underline
          // Add more format checks as needed (code, subscript, superscript)
        }
        return <span key={index} style={style} dangerouslySetInnerHTML={{ __html: textNode.text.replace(/\n/g, '<br />') || '' }} />;
      
      case 'linebreak':
        return <br key={index} />;
        
      // Add more cases for other node types like 'image', 'quote', 'code', etc.
      // For images from Payload, you'd handle the 'upload' type or how it's represented.

      default:
        // Attempt to render children if they exist, or return null
        if ('children' in node && Array.isArray((node as any).children) && (node as any).children.length > 0) {
          return <React.Fragment key={index}>{(node as any).children.map(renderNode)}</React.Fragment>;
        }
        console.warn("Unsupported Lexical node type:", node.type);
        return null;
    }
  };

  const editorState = content as SerializedEditorState;

  return (
    <div className={cn("prose prose-sm max-w-none dark:prose-invert", className)}>
      {editorState.root.children.map(renderNode)}
    </div>
  );
};

// Helper cn function (if not globally available or for isolated component)
function cn(...inputs: Array<string | undefined | null | Record<string, boolean>>): string {
  return inputs
    .reduce((acc: Array<string | Record<string, boolean>>, val) => {
      if (typeof val === 'string') {
        return acc.concat(val.split(' '));
      }
      return acc.concat(Object.entries(val || {}).filter(([, v]) => v).map(([k]) => k));
    }, [])
    .filter(Boolean)
    .join(' ');
}
