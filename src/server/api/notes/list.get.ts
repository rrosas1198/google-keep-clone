import { registerModules } from "src/server/features/app.module";
import { NoteController } from "src/server/features/notes/application/controllers";
import { NoteModule } from "src/server/features/notes/note.module";

registerModules();

const noteController = NoteModule.resolve(NoteController);

export default defineEventHandler(noteController.listNotes.bind(noteController));
