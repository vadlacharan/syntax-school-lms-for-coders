'use server';
import { revalidatePath } from 'next/cache'

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com'
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY

const languageIds = {
  'javascript': 63,
  'python': 71,
  'java': 62,
  'csharp': 51,
  'cpp': 54,
}

export async function executeCode(code, language, input) {
  if (!JUDGE0_API_KEY) {
    throw new Error('Judge0 API key is not set')
  }

  const languageId = languageIds[language]
  if (!languageId) {
    throw new Error('Unsupported language')
  }

  // Submit the code
  const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': JUDGE0_API_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    body: JSON.stringify({
      language_id: languageId,
      source_code: code,
      stdin: input,
    })
  })

  if (!submitResponse.ok) {
    throw new Error('Failed to submit code')
  }

  const submissionData = await submitResponse.json()

  // Poll for the result
  let result
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const resultResponse = await fetch(`${JUDGE0_API_URL}/submissions/${submissionData.token}`, {
      headers: {
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    })

    if (!resultResponse.ok) {
      throw new Error('Failed to fetch submission result')
    }

    result = await resultResponse.json()

    if (result.status.id !== 1 && result.status.id !== 2) {
      break
    }
  }

  let output = ''
  if (result.stdout) {
    output += result.stdout
  }
  if (result.stderr) {
    output += result.stderr
  }
  if (result.compile_output) {
    output += result.compile_output
  }
  if (result.message) {
    output += result.message
  }

  // Revalidate the current path to reflect any changes
  revalidatePath('/codeground')

  return { 
    success: result.status.id === 3, 
    output,
    status: result.status.description
  }
}

