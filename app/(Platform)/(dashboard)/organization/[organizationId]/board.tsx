import {Button} from "@/components/ui/button";
import {deleteBoard} from "@/actions/delete-board";
import {FormDelete} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/form-delete";

interface DeleteBoardProps {
    title: string;
    id: string;
}
export const Board = ({
    title,
    id,
}: DeleteBoardProps) => {
    const deleteBoardWithId = deleteBoard.bind(null, id);

    return (
        <form action={deleteBoardWithId} className='flex items-center gap-x-2'>
            <p>
                Board title: {title}
            </p>
            <FormDelete />
        </form>
    );
};