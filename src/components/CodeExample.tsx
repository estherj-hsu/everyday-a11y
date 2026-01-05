import { useEffect, useRef, useState } from 'react'
import { getHighlighter, type Highlighter } from 'shiki'
import { everydayA11yTheme } from './custom-theme'
import { setupPreviewInteractions } from './previewInteractions'
import './CodeExample.scss'

interface CodeExampleProps {
  code: string
  language?: string
  previewCode?: string
  showPreview?: boolean
  previewSize?: 'equal' | 'narrow' // 'equal' = 1fr 1fr (default), 'narrow' = 2fr 1fr
  showCopyBtn?: boolean // Whether to show the copy button (default: true)
}

// Cache the highlighter instance globally
let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighterInstance(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({
      themes: [everydayA11yTheme],
      langs: ['html', 'css', 'javascript'],
    })
  }
  return highlighterPromise
}

export default function CodeExample({ code, language = 'html', previewCode, showPreview = true, previewSize = 'equal', showCopyBtn = true }: CodeExampleProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // Use previewCode if provided, otherwise use the main code
  const previewHtml = previewCode ?? code

  useEffect(() => {
    let isMounted = true

    async function highlightCode() {
      try {
        const highlighter = await getHighlighterInstance()

        if (isMounted) {
          const html = highlighter.codeToHtml(code, {
            lang: language,
            theme: 'everyday-a11y',
          })
          setHighlightedCode(html)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error highlighting code:', error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    highlightCode()

    return () => {
      isMounted = false
    }
  }, [code, language])

  useEffect(() => {
    if (showPreview && previewRef.current) {
      // Clear previous content and set new preview HTML with js
      previewRef.current.innerHTML = ''
      previewRef.current.innerHTML = previewHtml
      const cleanup = setupPreviewInteractions(previewRef.current)
      return cleanup
    }
  }, [previewHtml, showPreview])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <div className={`code-example ${showPreview ? `code-example--preview-${previewSize}` : ''}`}>
      <div className="code-example-code">
        <div className="code-example-header">
          <span className="text-small">Code: {language}</span>
          {showCopyBtn && (
            <button type="button" className="code-example-copy" onClick={handleCopy} aria-label={copied ? 'Copied!' : 'Copy code'}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        {isLoading ? <div className="code-example-loading">Loading...</div> : <div className="code-example-content" dangerouslySetInnerHTML={{ __html: highlightedCode }} />}
      </div>
      {showPreview && (
        <div className="code-example-preview">
          <div className="code-example-header text-small">Example</div>
          <div className="code-example-preview-content" ref={previewRef} />
        </div>
      )}
    </div>
  )
}
