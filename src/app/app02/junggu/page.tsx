

export default function App02JungguPage() {
    return (
        <div className="w-full flex flex-col justify-center m-5">
            <h1 className="text-3xl font-bold my-2">
                오늘의 중구 맛집 추천
            </h1>
            <p className="text-md my-2">여기에 추천 맛집 목록이 표시됩니다.</p>
            <div className="grid grid-cols-3 gap-4 p-2">
                <div className="bg-gray-200 border rounded-2xl p-5">
                    <div className="text-2xl font-bold">
                        맛있는 중국집
                    </div>
                    <div className="text-md">
                        방금 추천받은 따끈따끈한 맛집!
                    </div>
                </div>
            </div>

        </div>
    );
}