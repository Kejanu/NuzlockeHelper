import Portal from "./portal";
import TextInput from "./textInput";
import Button from "./button";
import React, {FC, useState} from "react";
import {runRemote} from "../remotes/runRemote";
import {Run} from "../remotes/shared";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (run: Run) => void;
}

const RunModal: FC<Props> = (props: Props) => {
    const [runName, setRunName] = useState<string>("");

    function createRun() {
        runRemote.createRun(runName)
            .then((run: Run) => {
                props.onCreate(run);
                setRunName('');
            })
            .catch(console.log);
    }

    return props.open ? (
        <Portal>
            <Button className={'tw-absolute tw-top-0 tw-right-0 tw-p-2 tw-bg-red-800'} onClick={props.onClose}>
                x
            </Button>
            <div className={'tw-grid tw-grid-cols-1 tw-gap-8'}>
                <div>
                    <label htmlFor={'run-input'} className={'tw-p-2 tw-justify-self-end'}>Run Name:</label>
                    <TextInput id={"run-input"} value={runName} onChange={setRunName} />
                </div>
                <div className={'tw-justify-self-center'}>
                    <Button onClick={createRun}>
                        Create Run
                    </Button>
                </div>
            </div>
        </Portal>
    ) : (<></>);
}

export default RunModal;