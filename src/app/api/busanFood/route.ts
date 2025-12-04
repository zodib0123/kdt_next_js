import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/client";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("perPage") || "20");

    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
        .from("restaurants")
        .select("*", { count: "exact" })
        .range(offset, offset + limit - 1);

    if (error) {
        console.log("Fetching 에러 : ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const totalPages = Math.ceil(count! / limit);

    return NextResponse.json({
        data,
        currentPage: page,
        perPage: limit,
        totalPages
    });
}