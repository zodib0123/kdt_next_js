'use client'
import type { todoDataType } from "./TodoDataType";
import TodoInput from "./TodoInput"
import TodoItem from "./TodoItem"
import { useState, useEffect } from "react"

export default function TodoList() {
    const [todos, setTodos] = useState<todoDataType[]>([]);
    const [completed, setCompleted] = useState(0);
    const [imcompleted, setImCompleted] = useState(0);
    const todoUrl = "http://localhost:3000/api/todo";

    const getTodos = async () => {
        const resp = await fetch(`${todoUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });
        if (resp.ok) {
            const data = await resp.json();
            console.log(data);
            setTodos(data);
        } else {
            console.error('Error fetching todos:', resp.statusText);
            setTodos([]);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    useEffect(() => {
        setCompleted(todos.filter(todo => todo.completed).length);
        setImCompleted(todos.filter(todo => !todo.completed).length);
    }, [todos])

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <div className="w-9/10">
                <div className="text-3xl text-center font-bold m-5">
                    할일 목록
                </div>
                <div className="p-5 mb-5 bg-amber-100 rounded-xl font-bold">
                    전체 : {todos.length}개 | 완료 : {completed}개 | 미완료 : {imcompleted}개
                </div>
            </div>
            {/* <TodoInput todos={todos} setTodos={handleSave} /> */}
            <TodoInput getTodos={getTodos} />
            <div className="w-9/10 flex flex-col bg-amber-100 m-5 rounded-xl">
                {
                    todos.map(item => <TodoItem key={item.id} todo={item} getTodos={getTodos} />)
                }
            </div>
        </div>
    )
}
