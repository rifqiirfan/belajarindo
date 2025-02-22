import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from '@tiptap/extension-image'

import EditorToolbar from "./toolbar/editor-toolbar"

interface EditorProps {
  content: string
  placeholder?: string
  onChange: (value: string) => void
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return <></>

  return (
    <div className="prose max-w-none w-full border rounded-md border-input bg-background dark:prose-invert">
      <EditorToolbar editor={editor} />
      <div className="editor min-h-60">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  )
}

export default Editor