import { Route, Routes } from "react-router-dom"
import './App.css'
import { useState } from "react"

import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);


// set marked options
// allows markdown to open links in new tab
const renderer = new marked.Renderer()
renderer.link = function(href, title, text) {
  const link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace("<a", "<a target='_blank' ");
};
marked.use({
  // allows for line breaks
  breaks: true,
  gfm: true,
  renderer: renderer,
})


// components
import handleInput from "./components/HandleInput"


function App() {
  const startInput = "# First Header\n## Second Header\n[My Website](https://davidcao.xyz)\n\n`inline code block`\n```python\ndef main():\n  pass\n```\n- list one\n- list two\n- list three\n\n> this is a block quote\n\n![Image of lady](https://images.unsplash.com/photo-1682685795557-976f03aca7b2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)\n**bolded TEXT**\n"
  const [input, setInput] = useState({ textarea: startInput })


  const displayMarkdown = () => {
    const html = marked.parse(input.textarea)
    return (
      <div id="preview" dangerouslySetInnerHTML={{ __html: html }} />
    )
  }


  return (
    <>
      <h1>Home</h1>
      <textarea value={input.textarea} id="editor" name="textarea" onChange={(e) => { handleInput(e, setInput) }} />
      {displayMarkdown()}

    </>
  )
}

export default App
