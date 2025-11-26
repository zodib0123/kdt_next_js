import TailButton from "@/components/TailButton"
import { useEffect, useRef } from "react";

interface TodoInputProps {
    getTodos : () => void
}
export default function TodoInput({getTodos} : TodoInputProps) {

    const inRef = useRef<HTMLInputElement>(null);
    const todoUrl = "http://localhost:3000/api/todo";
    const handleAdd = async () => {
        if (!inRef.current) return;
        if (inRef.current.value == "") {
            alert("값을 입력해주세요.");
            inRef.current.focus();
            return ;
        }
    const response = await fetch(`${todoUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: Date.now(), text: inRef.current.value, completed: false }),
            cache: 'no-store',
        });
        if (response.ok) {
            getTodos();
            inRef.current.value = "";
            inRef.current.focus();
        } else {
            console.error('Error adding todo:', response.statusText);
        }
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
