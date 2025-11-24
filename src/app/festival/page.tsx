import Festival from "./Festival";
import { Suspense } from "react";

export default function festivalPage () {
    return (
        <Suspense fallback={<div>로딩중 . . .</div>} >
            <Festival />
        </Suspense>
    );
}