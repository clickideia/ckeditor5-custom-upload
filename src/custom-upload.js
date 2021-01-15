import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Command from "@ckeditor/ckeditor5-core/src/command";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import imageIcon from "@ckeditor/ckeditor5-core/theme/icons/image.svg";
// import CustomUploadApdapter from "./upload-adapter";
// import View from '@ckeditor/ckeditor5-ui/src/view';

// export default class CustomUpload extends Plugin {
// 	static get pluginName() {
// 		return 'CustomUpload';
// 	}

// 	static get requires() {
// 		return [ CustomUploadEditing, CustomUploadUI, CustomUploadApdapter ];
// 	}
// }

export class BatataUI extends Plugin {
  pluginName() {
    return "BatataUI";
  }

  init() {
    const editor = this.editor;
    const {
      t,
      ui: { componentFactory },
    } = editor;

    componentFactory.add("insertImage", (locale) => {
      const command = editor.commands.get("batata");

      const button = new ButtonView(locale);

      button.set({
        label: t("Insira uma imagem"),
        icon: imageIcon,
        tooltip: true,
      });

      button.bind("isEnabled").to(command);

      button.on("execute", () => {
        editor.execute("batata");
        editor.editing.view.focus();
      });

      return button;
    });
  }
}

export class BatataCommand extends Command {
  constructor(editor) {
    super(editor);
    this.stopListening(this.editor.model.document, "change");
    this.listenTo(this.editor.model.document, "change", () => this.refresh(), {
      priority: "low",
    });

    const input = document.createElement("input");
    input.id = "ClickCKImageUploadInput";
    input.type = "file";
    input.style.display = "none";
    input.accept = "image/*";
    document.body.appendChild(input);

    this.input = input;

    this.fileListener = this.fileListener.bind(this);

    input.addEventListener("change", this.fileListener);
  }

  fileListener(evt) {
    evt.preventDefault();
    const [image] = evt.target.files;
    const editor = this.editor;

    editor.config._config
      .customUpload(image)
      .then((imageUrl) => {
        editor.model.change((writer) => {
          const imageElement = writer.createElement("image", {
            src: imageUrl,
          });

          // Insert the image in the current selection location.
          editor.model.insertContent(
            imageElement,
            editor.model.document.selection
          );
        });
      })
      .catch((err) => console.error(err));
  }

  refresh() {
    const imageCommand = this.editor.commands.get("imageUpload");
    const linkCommand = this.editor.commands.get("link");
    this.isEnabled =
      true ||
      (imageCommand &&
        linkCommand &&
        (imageCommand.isEnabled || linkCommand.isEnabled));
  }

  execute() {
    const input = this.input;
    input.click();
  }
}

export class BatataEditing extends Plugin {
  pluginName() {
    return "BatataEditing";
  }

  init() {
    const editor = this.editor;
    editor.commands.add("batata", new BatataCommand(editor));
  }
}

export class Batata extends Plugin {
  pluginName() {
    return "Batata";
  }

  requires() {
    return [BatataCommand, BatataUI];
  }
}
