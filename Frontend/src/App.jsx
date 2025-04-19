import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState('Your code.')

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
     <header className="navbar">
      <h1>CodeLens</h1>
    </header>

      <main>
        <div className="left">
          <div className="code">
          <Editor
  value={code}
  onValueChange={code => setCode(code)}
  highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
  padding={10}
  style={{
    fontFamily: '"Fira Code", monospace',
    fontSize: 16,
    backgroundColor: "transparent",
    minHeight: "100%",
    width: "100%",
    outline: "none",
    overflow: "visible",
    whiteSpace: "pre",
  }}
  
/>

          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
