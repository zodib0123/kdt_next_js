import TailButton from "@/components/TailButton"
import { useState } from "react";
import type { todoDataType } from "./TodoDataType";

interface TotoItemProps {
    todo : todoDataType,
    todos : todoDataType[],
    setTodos : (newItem:todoDataType[]) => void
}
export default function TodoItem({todo, todos, setTodos} : TotoItemProps) {
    
    const [isEdit, setIsEdit] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleToggle = () => {
        setTodos(
            todos.map( t => t.id == todo.id ? { ...t, completed : !todo.completed } : t)
        );   
    }

    const handleSave = () => {
        setTodos(
            todos.map( t => t.id == todo.id ? { ...t, text : editText } : t)
        );
        setIsEdit(false);
    }

    const handleCancle = () => {
        setEditText(todo.text);
        setIsEdit(false);
    }

    const handleDelete = () => {
        setTodos(
            todos.filter( t => t.id != todo.id)
        );
    }

    return (
        <div className="w-full flex p-5 items-center">
            <div className="w-8/10 flex flex-1 text-lg">
                <input className="justify-start items-start"
                        type="checkbox" name="todo" checked={todo.completed}
                        onChange={handleToggle}  />
                { isEdit ? <input type="text"
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="ml-5 flex-1 border border-gray-600 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                           />
                         : <span className="ml-5">{editText}</span>
                }                
            </div>
            {
                isEdit ? <>
                            <TailButton color="lime" caption="저장" onHandle={handleSave} />
                            <TailButton color="orange" caption="취소" onHandle={handleCancle} />   
                         </>
                       : <>
                            <TailButton color="lime" caption="수정" onHandle={() => setIsEdit(true)} />
                            <TailButton color="orange" caption="삭제" onHandle={handleDelete} />
                         </>
            }
        </div>
    )
}
