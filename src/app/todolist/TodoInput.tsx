import TailButton from "@/components/TailButton"
import { useEffect, useRef } from "react";
import type { todoDataType } from "./TodoDataType";

interface TodoInputProps {
    todos : todoDataType[]
    setTodos : (newItem:todoDataType[]) => void
}
export default function TodoInput({todos, setTodos} : TodoInputProps) {

    const inRef = useRef<HTMLInputElement>(null);
    const handleAdd = () => {
        if (!inRef.current) return;
        if (inRef.current.value == "") {
            alert("값을 입력해주세요.");
            inRef.current.focus();
            return ;
        }

        const newItem = {
            id : Date.now(),
            text : inRef.current.value,
            completed : false
        }
        setTodos([newItem, ...todos]);
        inRef.current.value = "";
        inRef.current.focus();
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="w-9/10 flex justify-center items-center p-5 bg-amber-100 rounded-xl">
            <input className="flex-1 h-10 border border-gray-600 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
                    ref = {inRef}
                    type="text" placeholder="새로운 할 일을 입력하세요." />
            <TailButton color="blue" caption="추가" onHandle={handleAdd} />
        </div>
    )
}
