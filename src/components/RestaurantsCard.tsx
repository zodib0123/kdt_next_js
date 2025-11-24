
import { RestaurantType } from "@/ts/RestaurantType";
import Image from "next/image";
import Link from "next/link";

interface RestaurantProps {
    restaurant : RestaurantType
}

export default function RestaurantsCard({restaurant}: RestaurantProps) {

    return (
        <Link href={`/restaurants/${restaurant.UC_SEQ}`}
             className="flex flex-col border rounded-2xl overflow-hidden">
            <div className="relative w-full h-64">
                {restaurant.MAIN_IMG_THUMB ? (
                    <Image src={restaurant.MAIN_IMG_THUMB}
                        alt={restaurant.MAIN_TITLE}
                        fill
                        sizes="(max-width: 600px) 100vw, 50vw"
                        style={{objectFit : 'cover'}}
                        priority />
                ) : <img src="./image-not-found.png"
                        alt="image-not-found.png"
                        className="object-fill w-full h-64" />}
            </div>
            <div>
                <div className="text-xl font-bold m-3">
                    <h1>{restaurant.MAIN_TITLE}</h1>
                </div>
                <div className="m-3 mb-5">
                    <div>{restaurant.GUGUN_NM}</div>
                    <div>대표메뉴 : {restaurant.RPRSNTV_MENU}</div>
                </div>
            </div>
        </Link>
    );
}