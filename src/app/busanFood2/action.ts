"use server";

import { RestaurantType } from "@/types/RestaurantType";
import { supabase } from "@/supabase/client";

export async function fetchRestaurants(page: number, perPage: number) {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
        .from("restaurants")
        .select("*", { count: "exact" })
        .range(offset, offset + limit - 1);

    if (error) {
        console.log("Fetching 에러 : ", error);
        return { data: [], currentPage: page, totalPages: 0, error: error.message };
    }

    const totalPages = Math.ceil(count! / limit);

    return {
        data: data as RestaurantType[],
        currentPage: page,
        totalPages,
        error: null,
    };
}