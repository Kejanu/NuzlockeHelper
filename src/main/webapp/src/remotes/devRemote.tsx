export const devRemote = {

    insertCSVData: (): Promise<void> => {
        return fetch("/dev")
            .then(response => {

            });
    }

}