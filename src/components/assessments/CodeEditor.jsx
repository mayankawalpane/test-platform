import { useState } from 'react'
import './CodeEditor.css'

function CodeEditor({ question, onSubmit, initialCode }) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setOutput('Running code...')
    
    setTimeout(() => {
      setOutput(`Code executed successfully!\n\nNote: This is a mock IDE. In production, code would be executed on a secure server.\n\nYour code:\n${code}`)
      setIsRunning(false)
    }, 1000)
  }

  const handleSubmit = () => {
    onSubmit(question.id, code)
    setOutput('✓ Code submitted successfully!')
  }

  const displayCode = question.type === 'dsa' 
    ? `${question.header}\n\n${code}\n${question.footer}`
    : code

  return (
    <div className="code-editor">
      <div className="editor-toolbar">
        <span className="language-tag">{question.type.toUpperCase()}</span>
        <div className="toolbar-actions">
          <button className="toolbar-btn" onClick={handleRun} disabled={isRunning}>
            {isRunning ? '▶ Running...' : '▶ Run Code'}
          </button>
          <button className="toolbar-btn submit-btn" onClick={handleSubmit}>
            ✓ Submit
          </button>
        </div>
      </div>

      <div className="editor-container">
        <div className="code-area">
          {question.type === 'dsa' && question.header && (
            <div className="code-header-footer">
              <pre>{question.header}</pre>
            </div>
          )}
          
          <textarea
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            placeholder="Write your code here..."
          />

          {question.type === 'dsa' && question.footer && (
            <div className="code-header-footer">
              <pre>{question.footer}</pre>
            </div>
          )}
        </div>

        {output && (
          <div className="output-panel">
            <div className="output-header">Output</div>
            <pre className="output-content">{output}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeEditor
