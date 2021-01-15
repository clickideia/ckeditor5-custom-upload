import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import FileRepository from "@ckeditor/ckeditor5-upload/src/filerepository";

export default class CustomUploadApdapter extends Plugin {
  static get requires() {
    return [FileRepository];
  }

  static get pluginName() {
    return "CustomUploadAdapter";
  }

  init() {
    const options = this.editor.config.get("customUpload");

    if (!options) {
      return;
    }

    if (!options.uploadPromise) {
      // eslint-disable-next-line max-len
      console.warn(
        '(@clickideia/ckeditor5-custom-upload) Missing the "uploadPromise" property in the "customUpload" editor configuration.'
      );

      return;
    }

    this.editor.plugins.get(FileRepository).createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, options);
    };
  }
}

class UploadAdapter {
  constructor(loader, options) {
    this.loader = loader;
    this.options = options;
  }

  upload() {
    return this.loader.file.then((image) => this.options.uploadPromise(image));
  }

  abort() {}
}
