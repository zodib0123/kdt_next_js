'use client';

export default function Error(
    { 
        error, reset
    } : { 
        error: Error,
        reset: () => void
    }) {
    return (
        <div className="m-5">
            <h2 className="test-red-500 font-bold text-2xl">에러 발생 !</h2>
            <p className="text-red-900 m-5">
                {error.message}
            </p>
            <button className="bg-red-500 hover:bg-red-700 rounded-sm text-white font-bold py-2 px-4"
                    onClick={() => reset()}>
                다시 시도
            </button>
        </div>
    );
}