import React, {useCallback} from "react"
import {Editor} from "@tiptap/react"
import {
  Bold,
  Code, ImageIcon,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react"

import {Toggle} from "@/components/ui/toggle"
import {ToggleGroup, Toolbar} from "@/components/toolbar"

import {FormatType} from "./format-type"
import {Button} from "@/components/ui/button";

interface EditorToolbarProps {
  editor: Editor
}

const EditorToolbar = ({editor}: EditorToolbarProps) => {
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({src: url}).run()
    }
  }, [editor])

  return (
    <Toolbar className="m-0 flex items-center justify-between p-2" aria-label="Formatting options">
      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}>
          <Bold className="h-4 w-4"/>
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          value="italic">
          <Italic className="h-4 w-4"/>
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}>
          <Strikethrough className="h-4 w-4"/>
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive("bulletList")}>
          <List className="h-4 w-4"/>
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editor.isActive("orderedList")}>
          <ListOrdered className="h-4 w-4"/>
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          pressed={editor.isActive("codeBlock")}>
          <Code className="h-4 w-4"/>
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editor.isActive("blockquote")}>
          <Quote className="h-4 w-4"/>
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4"/>
        </Toggle>

        <Button className={"w-fit h-8 px-2 mr-1"} variant={"ghost"} size={"icon"} onClick={() => addImage()}>
          <ImageIcon/>
        </Button>

        <FormatType editor={editor}/>
      </ToggleGroup>

      <ToggleGroup className="flex flex-row items-center invisible sm:visible" type="multiple">
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}>
          <Undo className="h-4 w-4"/>
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}>
          <Redo className="h-4 w-4"/>
        </Toggle>
      </ToggleGroup>

    </Toolbar>
  )
}

export default EditorToolbar