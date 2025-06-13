import { Todo } from "src/models/todo";
import { Filter } from "src/models/filter";
import { useState } from "react";

export default function useUndo<T>(initialState: T): {
    appState: T;
    setAppState(s: T): void;
    undo(): void;
    redo(): void;
    save(): void;
} {
    const [ appState, setAppState ] = useState(initialState);

    const [ undoStack, setUndoStack ] = useState<T[]>([ initialState ]);
    const [ redoStack, setRedoStack ] = useState<T[]>([]);

    const save = () => {
        setUndoStack([ ...undoStack, appState ]);
        setRedoStack([]);
    };
    
    const undo = () => {
        if (undoStack.length > 1) {
            const last = undoStack[undoStack.length - 1];
            const target = undoStack[undoStack.length - 2];

            setUndoStack(undoStack.slice(0, undoStack.length - 1));
            setRedoStack([ ...redoStack, last ]);
            setAppState(target);
        }
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const last = redoStack[redoStack.length - 1];

            setUndoStack([...undoStack, last]);
            setRedoStack(redoStack.slice(0, redoStack.length - 1));
            setAppState(last);
        }
    };

    return { appState, setAppState, undo, redo, save };
}