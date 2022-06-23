import React, {ChangeEventHandler, FC, ReactNode, useState} from "react";
import classNames from "classnames";

interface Props {
    onChange: (value: string) => void;
    id: string;
    value: string;
}

const TextInput: FC<Props> = (props : Props) => {

    const inputClasses = classNames(
        'tw-bg-green-900 hover:tw-bg-green-800 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded',
        'tw-border tw-border-white',
        'hover:tw-bg-green-800',
    );

    return (
        <input
            id={props.id}
            type={"text"}
            className={inputClasses}
            value={props.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value ?? '')}>
        </input>
    )
}

export default TextInput;