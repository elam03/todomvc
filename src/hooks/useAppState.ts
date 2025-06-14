import { Todo } from "src/models/todo";
import { Filter } from "src/models/filter";
import { useState } from "react";

type AppState = {
    todos: Todo[];
    filter: Filter;
}

export default function useAppState(initialState: AppState): {
    add(title: string): void;
    mark(id: number): void;
    markAllActive(): void;
    markAllCompleted(): void;
    remove(id: number): void;
    edit(id: number, editing: boolean): void;
    update(id: number, title: string): void;
    removeDone(): void;
    getTodos(): Todo[];
    undo(): void;
    redo(): void;
} {
    const [ appState, setAppState ] = useState(initialState);

    const [ undoStack, setUndoStack ] = useState<AppState[]>([ initialState ]);
    const [ redoStack, setRedoStack ] = useState<AppState[]>([]);

    const save = () => {
        setUndoStack([ ...undoStack, { ...appState } ]);
        setRedoStack([]);
    };

    const add = (title: string) => {
        const newTodo = {
            id: appState.todos.length,
            title,
            editing: false,
            completed: false,
        };

        appState.todos = appState.todos.concat(newTodo);
        save();
    };

    const mark = (id: number) => {
        appState.todos = appState.todos.map((t: Todo) => t.id !== id ? t : { ...t, completed: !t.completed });
        save();
    };

    const markAllActive = () => {
        appState.todos = appState.todos.map((t: Todo) => !t.completed ? t : { ...t, completed: !t.completed });
        save();
    };

    const markAllCompleted = () => {
        appState.todos = appState.todos.map((t: Todo) => t.completed ? t : { ...t, completed: !t.completed });
        save();
    };
    
    const remove = (id: number) => {
        appState.todos = appState.todos.filter((t: Todo) => t.id !== id);
        save();
    };
    
    const edit = (id: number, newEditing: boolean) => {
        appState.todos = appState.todos.map((t: Todo) => t.id !== id ? t : { ...t, editing: newEditing });
        save();
    };

    const update = (id: number, title: string) => {
        appState.todos = appState.todos.map((t: Todo) => t.id !== id ? t : { ...t, title, editing: false });
        save();
    };

    const removeDone = () => {
        appState.todos = appState.todos.filter((t: Todo) => !t.completed);
        save();
    };

    const getTodos = () => {
        return appState.todos;
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

    return { add, mark, markAllActive, markAllCompleted, remove, edit, update, removeDone, getTodos, undo, redo };
}