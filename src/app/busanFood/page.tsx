'use client';
import { useState, useEffect } from "react";
import RestaurantCard from "@/components/RestaurantsCard"
import { RestaurantType } from "@/types/RestaurantType"


export default function BusanFoodPage() {
    const [tdata, setTData] = useState<RestaurantType[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20); // State for items per page
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchRestaurants = async (pageNum: number, perPageNum: number) => {
        // Do not fetch more if a fetch is already in progress, but allow fetches for page 1 (resetting)
        if (loading && pageNum > 1) return;
        setLoading(true);
        try {
            const resp = await fetch(`/api/busanFood?page=${pageNum}&perPage=${perPageNum}`);
            if (!resp.ok) {
                throw new Error("맛집 정보를 불러오는데 실패했습니다.");
            }
            const { data, currentPage, totalPages } = await resp.json();

            // If it's the first page, replace the data. Otherwise, append it.
            setTData((prev) => pageNum === 1 ? data : [...prev, ...data]);

            if (currentPage >= totalPages) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (error) {
            console.error(error);
            setHasMore(false); // Stop trying to fetch more on error
        } finally {
            setLoading(false);
        }
    }

    // This effect runs when page or perPage changes
    useEffect(() => {
        fetchRestaurants(page, perPage);
    }, [page, perPage]);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPerPage = Number(e.target.value);
        setPerPage(newPerPage);
        setPage(1); // Reset to page 1 when perPage changes
    };

    return (
        <div className="w-full flex flex-col justify-start items-center p-10 max-w-6xl">
                    <div className="text-3xl font-bold m-5">
                        부산 맛집 목록
                    </div>
                    
                    {/* perPage selector */}
                    <div className="w-full flex justify-end items-center mb-5 px-10">
                        <label htmlFor="perPage" className="mr-2 font-semibold">항목 수:</label>
                        <select 
                            id="perPage"
                            value={perPage} 
                            onChange={handlePerPageChange}
                            className="border rounded-md px-2 py-1"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
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