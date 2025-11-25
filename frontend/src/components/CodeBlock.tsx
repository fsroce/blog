import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CodeBlock({ className, children }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  return language ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={language}
      PreTag="div"
      customStyle={{
        margin: '1.5em 0',
        borderRadius: '12px',
        fontSize: '0.9em'
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
}
