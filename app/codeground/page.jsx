'use client'

import { useState } from 'react'
import { CodeEditor } from '@/components/code-editor'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { executeCode } from '../actions'

export default function CodeGroundPage() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)

  const handleExecute = async () => {
    setIsExecuting(true)
    setOutput('') // Clear the console before each execution
    try {
      const result = await executeCode(code, language, input)
      setOutput(`Status: ${result.status}\n${result.output}`)
    } catch (error) {
      console.error("Failed to execute code:", error);
      setOutput('Error: Failed to execute code. Please try again.')
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    (<div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Code Ground</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeEditor
            initialValue={code}
            onChange={(value) => setCode(value || '')}
            language={language}
            onLanguageChange={setLanguage} />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Input</h3>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input here..."
                className="h-[100px]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Console Output</h3>
              <ScrollArea className="h-[100px] w-full border rounded-md p-2">
                <pre className="whitespace-pre-wrap">{output}</pre>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleExecute} disabled={isExecuting}>
            {isExecuting ? 'Executing...' : 'Run Code'}
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
}

