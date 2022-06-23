import React, {FC, ReactNode} from "react";
import classNames from "classnames";

interface Props {
    children: ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button: FC<Props> = (props : Props) => {

    const className = classNames(
        'tw-bg-green-900 tw-border tw-border-white tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded',
         props.className
    );

    return (
        <button
            className={className}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;