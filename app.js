import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import {
  Batata,
  BatataUI,
  BatataCommand,
  BatataEditing,
} from "./src/custom-upload";

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Batata,
    BatataUI,
    BatataCommand,
    BatataEditing,
  ],
  toolbar: ["bold", "italic", "insertImage"],
})
  .then((editor) => {
    console.log("Editor was initialized", editor);
  })
  .catch((error) => {
    console.error(error.stack);
  });
