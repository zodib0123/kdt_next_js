import Link from "next/link";


export default function App01Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div className="flex h-full">
            <aside className="w-65 bg-gray-200 p-5">
                <h2 className="text-2xl font-bold">맛집 카테고리</h2>
                <nav className="m-5">
                    <ul className="">
                        <li className="my-2">
                            <Link href="/app01/junggu" className="hover:bg-blue-200">중구</Link>
                        </li>
                        <li className="my-2">동구</li>
                        <li className="my-2">서구</li>
                        <li className="my-2">정청</li>
                    </ul>
                </nav>
            </aside>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}