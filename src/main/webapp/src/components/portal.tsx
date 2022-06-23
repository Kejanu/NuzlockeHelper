import {FC, ReactNode, useEffect, useMemo, useState} from "react";
import {createPortal} from "react-dom";
import classNames from "classnames/bind"

interface Props {
    children: ReactNode;
}

const Portal: FC<Props> = ({children}: Props) => {
    const portalDiv = useMemo(() => {
        const div = document.createElement("div")
        div.className = "tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full";
        return div;
    }, []);


    useEffect(() => {
        document.body.appendChild(portalDiv)
        return () => {document.body.removeChild(portalDiv)};
    }, [portalDiv]);

    let portalClasses = classNames('tw-absolute tw-h-1/2 tw-w-1/2 tw-transform tw-translate-x-1/2 ',
        'tw-translate-y-1/2 tw-grid tw-justify-center tw-place-content-center tw-bg-neutral-500',
        'tw-border tw-border-white tw-rounded'
    );

    return createPortal(
        (
            <div className={portalClasses}>
                {children}
            </div>
        )
        , portalDiv
    );
}

export default Portal;