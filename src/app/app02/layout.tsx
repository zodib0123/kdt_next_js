import Link from "next/link";


export default function App02Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-full">
            <aside className="h-20 bg-gray-200 p-5 flex items-center">
                <h2 className="text-2xl font-bold">맛집 카테고리</h2>
                <nav className="m-5">
                    <ul className="flex">
                        <li className="m-3">
                            <Link href="/app02/junggu" className="hover:bg-blue-200">중구</Link>
                        </li>
                        <li className="m-3">동구</li>
                        <li className="m-3">서구</li>
                        <li className="m-3">정청</li>
                    </ul>
                </nav>
            </aside>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}