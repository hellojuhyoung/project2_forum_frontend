// due to imcompatibility with react version 18
// would need to manually change the core code of the toast editor
// then on no need to downgrade the react to version 17 and can stick to 18

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

// directly imported the core Toast UI Editor library and controlled it ourselves in the react component
// also dealt with container DOM element
// as well as managing the editor to render only on the client side (disregarded SSR)
import EditorCore from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

type ToastEditorProps = {
  initialValue?: string;
  onChange?: (markdown: string) => void;
};

type EditorCoreInstance = InstanceType<typeof EditorCore>;

const ToastEditor = forwardRef((props: ToastEditorProps, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<EditorCoreInstance | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!editorRef.current) return;

    editorInstance.current = new EditorCore({
      el: editorRef.current,
      initialValue: props.initialValue || "",
      initialEditType: "wysiwyg",
      hideModeSwitch: true,
      height: "400px",
      usageStatistics: false,
    });

    editorInstance.current.on("change", () => {
      const markdown = editorInstance.current!.getMarkdown();
      props.onChange && props.onChange(markdown);
    });

    return () => {
      try {
        // Prevent NotFoundError by verifying editorRef still exists and is connected
        const editorRootEl = editorRef.current;
        if (
          editorRootEl &&
          editorRootEl.parentNode &&
          editorRootEl.parentNode.contains(editorRootEl)
        ) {
          editorInstance.current?.destroy();
        }
      } catch (error) {
        console.warn("Editor destroy failed:", error);
      } finally {
        editorInstance.current = undefined;
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getMarkdown: () => editorInstance.current?.getMarkdown() || "",
    getHTML: () => editorInstance.current?.getHTML() || "",
  }));

  return <div ref={editorRef} />;
});

export default ToastEditor;
