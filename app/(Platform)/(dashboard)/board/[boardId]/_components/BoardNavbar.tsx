import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {Board} from ".prisma/client";
import {BoardTitleForm} from "@/app/(Platform)/(dashboard)/board/[boardId]/_components/board-title-form";
import {BoardOptions} from "@/app/(Platform)/(dashboard)/board/[boardId]/_components/board-options";

interface BoardNavbarProps {
    data: Board;
}

const BoardNavbar = async ({
    data
}: BoardNavbarProps) => {
    return (
        <div className='w-full h-14 fixed bg-black/50 top-14 z-[40] flex items-center px-6 gap-x-4 text-white'>
            <BoardTitleForm data={data}/>
            <div className='ml-auto'>
                <BoardOptions id={data.id} />
            </div>
        </div>
    )
}

export  default BoardNavbar