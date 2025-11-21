import ErrorButton from "./ErrorButton";


async function getData() {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return { name: '맛있는 파스타 가게' };
}

export default async function App01Page() {
    const restaurant = await getData();
    return (
        <div className="w-full flex flex-col justify-center m-5">
            <h1 className="text-3xl font-bold my-2">
                오늘의 맛집 추천
            </h1>
            <p className="text-md my-2">여기에 추천 맛집 목록이 표시됩니다.</p>
            <div className="grid grid-cols-3 gap-4 p-2">
                <div className="bg-gray-200 border rounded-2xl p-5">
                    <div className="text-2xl font-bold">
                        {restaurant.name}
                    </div>
                    <div className="text-md">
                        방금 추천받은 따끈따끈한 맛집!
                    </div>
                </div>
                <ErrorButton />
            </div>

        </div>
    );
}