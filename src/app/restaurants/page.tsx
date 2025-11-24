'use client'
import { useState, useEffect } from "react";
import RestaurantsData from "@/data/부산맛집.json"
import RestaurantsCard from "@/components/RestaurantsCard";
import type { RestaurantType } from "@/ts/RestaurantType";

export default function RestaurantsPage() {

    const [tdata, setTData] = useState<RestaurantType[]>([]);

    useEffect(() => {
        setTData(RestaurantsData);
    }, [])

    return (
        <div className="w-full flex flex-col justify-start items-center p-10">
            <div className="text-3xl font-bold m-5">
                부산 맛집 목록
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 m-10">
                {
                    tdata.map(item => <RestaurantsCard key={item.UC_SEQ} restaurant={item}/>)
                }
            </div>
        </div>
    );
}