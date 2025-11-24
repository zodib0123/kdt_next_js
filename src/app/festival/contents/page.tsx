import FestivalContents from "./FestivalContents";
import { Suspense } from "react";

export default function festivalContentsPage () {
    return (
        <Suspense fallback={<div>로딩중 . . .</div>} >
            <FestivalContents />
        </Suspense>
    );
}