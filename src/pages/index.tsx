import Head from "next/head";
import React from "react";
import NewTodoInput from "src/components/NewTodoInput";
import TodoFooter from "src/components/TodoFooter";
import TodoList from "src/components/TodoList";
import TodoMarkAll from "src/components/TodoMarkAll";
import { Todo } from "src/models/todo";
import { Filter } from "src/models/filter";
import { useEffect, useState } from "react";
import useAppState from "src/hooks/useAppState";

export default function Home() {
    const [ filter, setFilter ] = useState<Filter>("all"); 

    const { add, mark, markAll, remove, edit, update, removeDone, getTodos, undo, redo } = useAppState({ todos: [], filter: "all" });

    const filterAll = (t: Todo) => t;
    const filterActive = (t: Todo) => !t.completed;
    const filterCompleted = (t: Todo) => t.completed;

    let todos = getTodos();

    if (filter == "all") {
        todos = todos.filter(filterAll);
    } else if (filter == "active") {
        todos = todos.filter(filterActive);
    } else {
        todos = todos.filter(filterCompleted);
    }

    const totalTodos = todos.length;    
    const numActiveTodos = todos.filter((t) => !t.completed).length;
    const numCompletedTodos = totalTodos - numActiveTodos;

    return (
        <>
            <Head>
                <title>TodoMVC</title>
            </Head>

            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTodoInput onNewTodo={(title) => add(title) } />
                </header>

                <section className="main">
                    <TodoMarkAll
                        numCompletedTodos={numCompletedTodos}
                        numTodos={totalTodos}
                        onMarkAllActive={() =>
                            console.log("onMarkAllActive was called")
                        }
                        onMarkAllCompleted={() =>
                            console.log("onMarkAllCompleted was called")
                        }
                    />
                    <TodoList
                        todos={todos}
                        onEdit={(id) => edit(id, true)}
                        onDelete={(id) => remove(id)}
                        onToggleComplete={(id) => mark(id, true)}
                        onSetTitle={(id, title) => update(id, title)}
                    />
                </section>

                <TodoFooter
                    filter="all"
                    numActiveTodos={numActiveTodos}
                    numTodos={totalTodos}
                    onClearCompleted={ () => removeDone() }
                >
                    
                </TodoFooter>

                <div>
                    <button onClick={ () => undo() }>Undo</button>
                    <button onClick={ () => redo() }>Redo</button>
                </div>
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
