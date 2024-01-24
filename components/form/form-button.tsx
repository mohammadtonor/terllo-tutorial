import {useFormStatus} from "react-dom";
import {cn} from "@/lib/utils";

import {Button} from "@/components/ui/button";

interface FormButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" |
              "ghost" | "link" | "primary";
}

export const FormButton = ({
    children,
    className,
    variant,
    disabled
}: FormButtonProps) => {
    const {pending} = useFormStatus();

    return (
        <Button
            disabled={pending || disabled}
            type='submit'
            variant={variant}
            size='sm'
            className={cn(className)}
        >
            {children}
        </Button>
    )
}