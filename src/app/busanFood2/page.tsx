'use client';
import { useState, useEffect, useRef } from "react";
import RestaurantCard from "@/components/RestaurantsCard"
import { RestaurantType } from "@/types/RestaurantType"
import { fetchRestaurants } from "./action";


export default function BusanServerActionPage() {
    const [tdata, setTData] = useState<RestaurantType[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    
    const isMounted = useRef(false);
    
    const perPage = 10;

    const loadRestaurants = async (pageNum: number) => {
        if (loading && pageNum > 1) return;
        setLoading(true);

        const { data, currentPage, totalPages, error } = await fetchRestaurants(page, perPage);

        if (error) {
            console.error("Failed to load restaurants:", error);
            setLoading(false);
            return;
        }
        if (data.length > 0) {
            setTData((prev) => [...prev, ...data]);
        }
        if (currentPage >= totalPages) {
            setHasMore(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (isMounted.current || page === 1){
            loadRestaurants(page);
        }
        if (!isMounted.current) {
            isMounted.current = true;
        }        
    }, [page])

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }

    return (
        <div className="w-full flex flex-col justify-start items-center p-10 max-w-6xl">
                    <div className="text-3xl font-bold m-5">
                        부산 맛집 목록
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 m-10">
                        {
                            tdata.map(item => <RestaurantCard key={item.UC_SEQ} restaurant={item}/>)
                        }
                    </div>

                    {loading && (
                        <div className="text-center text-xl my-4">
                            <p>불러오는중 . . .</p>
                        </div>
                    )}

                    {hasMore && !loading && (
                        <div className="text-center my-4">
                            <button onClick={handleLoadMore}
                                    className="bg-blue-500 hover:bg-blue-600 rounded-2xl px-4 py-3 text-white font-bold">
                                더보기
                            </button>
                        </div>
                    )}

                    {!hasMore && (
                        <div className="text-center text-xl my-4">
                            <p>불러올 데이터가 없습니다.</p>
                        </div>
                    )}
        </div>
    )   
}