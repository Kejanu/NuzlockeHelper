import React, {useEffect, useMemo, useState} from 'react';
import {useDebounce} from "react-use";

interface Props {
    onBlur: (id: string) => void;
    initialValue: FilterValue | null;
    fetchFilteredValues: (value: string) => Promise<FilterValue[]>;
}

export interface FilterValue {
    id: string;
    name: string;
}

const SearchSelect = (props: Props) => {

    const [previousValue, setPreviousValue] = useState<string>(props.initialValue?.name ?? "");
    const [currentValue, setCurrentValue] = useState<string>(props.initialValue?.name ?? "");
    const [filteredValues, setFilteredValues] = useState<FilterValue[]>([]);

    const [debouncedValue, setDebouncedValue] = useState("");
    const [fetchAgain, setFetchAgain] = useState(false);
    const [showFilteredResults, setShowFilteredResults] = useState(false);

    const [,] = useDebounce(
        () => {
            setDebouncedValue(currentValue);
        }, 300, [currentValue]
    );

    useEffect(() => {
        if (debouncedValue.length <= 0 || !fetchAgain) {
            return;
        }

        props.fetchFilteredValues(debouncedValue)
            .then(filteredValues => setFilteredValues(filteredValues))
            .catch(console.log);
    }, [debouncedValue]);

    const routeChanged: boolean = useMemo(() => {
        return previousValue !== currentValue;
    }, [previousValue, currentValue]);

    const handleOnFilteredElementClicked = (name: string) => {
        setFetchAgain(false);
        setShowFilteredResults(false);

        const foundElement = filteredValues.find(r => r.name.trim().toLowerCase() === name.trim().toLowerCase());
        if (foundElement) {
            setCurrentValue(foundElement.name);
        }
    };

    const handleOnInputChanged = (value: string) => {
        setCurrentValue(value);
        setShowFilteredResults(true);
        setFetchAgain(true);
    }

    function handleOnBlur(value: string) {
        const foundElement = filteredValues.find(r => r.name.trim().toLowerCase() === value.trim().toLowerCase());
        setShowFilteredResults(false);

        if (!foundElement) {
            setCurrentValue("");
            return;
        }

        if (routeChanged) {
            props.onBlur(foundElement.id);
            setPreviousValue(currentValue);
        }

        setShowFilteredResults(false);
    }

    return (
        <div className={'tw-grid tw-grid-cols-4 tw-border tw-rounded tw-p-1'}>
            <div className={'tw-col-span-4 tw-relative'}>
                <input
                    className={'tw-border tw-rounded tw-w-full tw-p-2' + ' ' +
                        ' tw-text-white tw-bg-neutral-700 focus:tw-outline-white'
                    }
                    onBlur={e => handleOnBlur(e.target.value)}
                    value={currentValue}
                    onChange={e => handleOnInputChanged(e.target.value)}/>
                <div className={'tw-absolute tw-mt-1 tw-w-full tw-z-10'}>
                    {showFilteredResults && filteredValues.map(value => (
                        <div
                            className={'tw-border tw-border-red-700 tw-p-2 tw-rounded tw-bg-neutral-700 tw-text-white tw-cursor-pointer ' +
                                'hover:tw-bg-neutral-500'
                            }
                            key={value.id}
                            onMouseDown={e => e.preventDefault()}
                            onClick={e => handleOnFilteredElementClicked(value.name)}>
                            {value.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchSelect;