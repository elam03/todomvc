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
import { useRouter } from 'next/router';

export default function Home() {
    const [ filter, setFilter ] = useState<Filter>("all");
    const router = useRouter();

    useEffect(() => {
        const onHashChangeStart = (url: string) => {
            const a = url.split("/").pop() || "all";

            setFilter(a as Filter);
        };

        // Need to use next.js router, instead of adding window event listener for `hashchange`, since
        // the event doesn't get triggered.
        router.events.on("hashChangeStart", onHashChangeStart);

        return () => {
            router.events.off("hashChangeStart", onHashChangeStart);
        };
    }, [router.events]);

    const { add, mark, markAllActive, markAllCompleted, remove, edit, update, removeDone, getTodos, undo, redo } = useAppState({ todos: [], filter: "all" });

    const filters = {
        active: (t: Todo) => !t.completed,
        completed: (t: Todo) => t.completed,
    };

    let todos = getTodos();

    const totalTodos = todos.length;    
    const numActiveTodos = todos.filter(filters.active).length;
    const numCompletedTodos = totalTodos - numActiveTodos;

    if (filter == "active") {
        todos = todos.filter(filters.active);
    } else if (filter == "completed") {
        todos = todos.filter(filters.completed);
    }

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
                        onMarkAllActive={() => markAllActive()}
                        onMarkAllCompleted={() => markAllCompleted()}
                    />
                    <TodoList
                        todos={todos}
                        onEdit={(id) => edit(id, true)}
                        onDelete={(id) => remove(id)}
                        onToggleComplete={(id) => mark(id)}
                        onSetTitle={(id, title) => update(id, title)}
                    />
                </section>

                <TodoFooter
                    filter={filter}
                    numActiveTodos={numActiveTodos}
                    numTodos={totalTodos}
                    onClearCompleted={ () => removeDone() }
                >
                    
                </TodoFooter>

            </section>

            <section>
                <button onClick={ () => undo() }>Undo</button>
                <button onClick={ () => redo() }>Redo</button>
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
