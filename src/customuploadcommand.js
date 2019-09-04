import Command from '@ckeditor/ckeditor5-core/src/command';

export default class CustomUploadCommand extends Command {
	constructor( editor ) {
		super( editor );
		this.stopListening( this.editor.model.document, 'change' );
		this.listenTo( this.editor.model.document, 'change', () => this.refresh(), { priority: 'low' } );
	}

	refresh() {
		const imageCommand = this.editor.commands.get( 'imageUpload' );
		this.isEnabled = imageCommand && imageCommand.isEnabled;
	}

	execute() {
		const editor = this.editor;
	}
}
