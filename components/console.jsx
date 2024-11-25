'use client';
import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Console({
  onExecute,
  output
}) {
  const [input, setInput] = useState('')

  const handleExecute = () => {
    onExecute(input)
    setInput('')
  }

  return (
    (<div className="space-y-2">
      <ScrollArea className="h-[200px] w-full border rounded-md p-4">
        <pre className="whitespace-pre-wrap">{output}</pre>
      </ScrollArea>
      <div className="flex space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input here..."
          className="flex-grow" />
        <Button onClick={handleExecute}>Execute</Button>
      </div>
    </div>)
  );
}

