import RestaurantsData from "@/data/부산맛집.json"
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


interface RestaurantDetailProps {
    params: Promise<{ seq: number }>
}

export default async function RestaurantDetail({ params }: RestaurantDetailProps) {
    const { seq } = await params;
    const restaurant = RestaurantsData.find(item => item.UC_SEQ == seq);
    if (restaurant == undefined) {
        notFound();
    }

    const description = restaurant.ITEMCNTNTS?.replace(/\\n/g, '\n') || '상세 설명이 없습니다.';
    console.log(description);
    const usageTime = restaurant.USAGE_DAY_WEEK_AND_TIME?.replace(/\\n/g, '\n') || '운영 시간 정보가 없습니다.';
    const kakaoMapUrl = `https://map.kakao.com/link/map/${restaurant?.MAIN_TITLE.replace(',', '').replace(' ', '')},${restaurant?.LAT},${restaurant?.LNG}`;

    return (
        <div className="w-full flex flex-col justify-start items-center px-10 my-5">
            {
                restaurant ?
                    <>
                        <div className="w-full p-3">
                            <h1 className="text-3xl font-bold m-2">{restaurant.MAIN_TITLE}</h1>
                            <p className="m-4">{restaurant.GUGUN_NM}</p>
                        </div>
                        <div className="relative w-full h-90 rounded-2xl overflow-hidden border border-gray-200">
                            {restaurant.MAIN_IMG_NORMAL ?
                                <Image src={restaurant.MAIN_IMG_NORMAL}
                                    alt={restaurant.MAIN_TITLE}
                                    fill
                                    sizes="(max-width: 600px) 100vw, 50vw"
                                    style={{ objectFit: 'cover' }}
                                    priority />
                                :
                                <img src="./image-not-found.png"
                                    alt="image-not-found.png"
                                    className="object-fill w-full h-100" />
                            }
                        </div>
                        <div className="w-full border border-gray-100 shadow-xl rounded-2xl my-3 p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-3">
                                <div className="border-b-2 border-b-gray-200">
                                    <h1 className="text-xl font-bold py-2">주소</h1>
                                    <div className="py-2">{restaurant.ADDR1 + restaurant.ADDR2}</div>
                                </div>
                                <div className="border-b-2 border-b-gray-200">
                                    <h1 className="text-xl font-bold py-2">연락처</h1>
                                    <div className="py-2">{restaurant.CNTCT_TEL}</div>
                                </div>
                                <div className="border-b-2 border-b-gray-200">
                                    <h1 className="text-xl font-bold py-2">대표 메뉴</h1>
                                    <div className="py-2">{restaurant.RPRSNTV_MENU}</div>
                                </div>
                                <div className="border-b-2 border-b-gray-200">
                                    <h1 className="text-xl font-bold py-2">운영 시간</h1>
                                    <div className="py-2 whitespace-pre-line">{usageTime}</div>
                                </div>
                            </div>
                            <div className="border-t-4 border-gray-200 my-8 ">
                                <div className="py-10">
                                    <h1 className="text-xl font-bold">관련링크</h1>
                                    <div className="flex items-start">
                                        <Link href={restaurant.HOMEPAGE_URL} className="bg-blue-600 hover:bg-blue-800 rounded-xl text-white font-bold px-5 py-3 mt-5 mr-5" >홈페이지</Link>
                                        <Link href={kakaoMapUrl} className="bg-amber-300 hover:bg-amber-500 rounded-xl font-bold px-5 py-3 mt-5" >카카오앱으로 보기</Link>
                                    </div>                                    
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold py-2">상세 설명</h1>
                                    <div className="py-2 whitespace-pre-line">{description}</div>
                                </div>
                            </div>

                        </div>
                        <Link href="/restaurants" className="bg-blue-600 hover:bg-blue-800 rounded-xl text-white px-5 py-3 mt-5" >목록으로</Link>
                    </>
                    :
                    <div>해당하는 파일이 없습니다</div>
            }

        </div>
    );
}