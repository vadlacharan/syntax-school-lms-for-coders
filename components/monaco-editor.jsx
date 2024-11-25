'use client';
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false, loading: () => <Skeleton className="w-full h-[400px]" /> }
)

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
]

export function CodeEditor({
  initialValue = '',
  onChange,
  language,
  onLanguageChange
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    (<div className="space-y-2">
      <Select value={language} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <MonacoEditor
        height="400px"
        language={language}
        theme="vs-dark"
        value={initialValue}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }} />
    </div>)
  );
}

