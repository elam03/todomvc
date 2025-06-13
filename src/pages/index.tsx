import Head from "next/head";
import React from "react";
import NewTodoInput from "src/components/NewTodoInput";
import TodoFooter from "src/components/TodoFooter";
import TodoList from "src/components/TodoList";
import TodoMarkAll from "src/components/TodoMarkAll";
import { Todo } from "src/models/todo";
import { Filter } from "src/models/filter";
import { useEffect, useState } from "react";
import useUndo from "src/hooks/useUndo";

// let todos: [Todo] = [
//     {id: 1, title: "abc", editing: false, completed: false},
// ];

// class AppState {
//     private todos: Todo[] = [];
//     private filter: Filter = "all";
//     private onRefresh: () => void;

//     constructor(onRefresh: () => void) {
//         this.onRefresh = onRefresh;
//     }

//     addNewTodo(title: string): void {
//         this.todos.concat(
//             { id: this.todos.length, title, editing: false, completed: false },
//         );
        
//         this.onRefresh();
//     }

//     getTodos(): Todo[] {
//         return this.todos;
//     }
// }

// let appState: AppState = AppState(null);
// let appState: AppState = { todos: [], filter: "all" }

type AppState = {
    todos: Todo[];
    filter: Filter;
}

// interface AppState {
//     todos?: Todo[];
// }

// type AppState = Todo[];

export default function Home() {
    // const [ updatedAt, setUpdatedAt ] = useState(Date.now());

    // const refresh = () => {
    //     setUpdatedAt(Date.now());

    //     console.log(`refresh was called: '${updatedAt}'`);
    // };
    
    // useEffect(() => {
    //     appState = new AppState(refresh);
    // }, []);
    // const [ appState, setAppState ] = useState(new AppState(refresh));
    // const [ appState, setAppState ] = useState(new AppState(() => setUpdatedAt(Date.now())));

    const { appState, setAppState, undo, redo, save } = useUndo<AppState>({ todos: [], filter: "all" });

    return (
        <>
            <Head>
                <title>TodoMVC</title>
            </Head>

            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTodoInput
                        onNewTodo={(title) => {
                            // appState.addNewTodo(title);
                            // appState.todos.concat({id: appState.todos.length, title, editing: false, completed: false});
                            // todos.push({id: todos.length, title, editing: false, completed: false});
                            
                            const newTodo = {id: appState.todos.length, title, editing: false, completed: false};

                            setAppState({ ...appState, todos: [ ...appState.todos, newTodo ] });

                            console.log(`onNewTodo was called '${title}'`);
                        }}
                    />
                </header>

                <section className="main">
                    <TodoMarkAll
                        numCompletedTodos={0}
                        numTodos={0}
                        onMarkAllActive={() =>
                            console.log("onMarkAllActive was called")
                        }
                        onMarkAllCompleted={() =>
                            console.log("onMarkAllCompleted was called")
                        }
                    />
                    <TodoList
                        todos={appState.todos}
                        onEdit={() => console.log()}
                        onDelete={() => console.log()}
                        onToggleComplete={() => console.log()}
                        onSetTitle={() => console.log()}
                    />
                </section>

                <TodoFooter
                    filter="all"
                    numActiveTodos={0}
                    numTodos={0}
                    onClearCompleted={() => {}}
                />
            </section>

            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>
                    Part of <a href="http://todomvc.com">TodoMVC</a>
                </p>
            </footer>
        </>
    );
}
