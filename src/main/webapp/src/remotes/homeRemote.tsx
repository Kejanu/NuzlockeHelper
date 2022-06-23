export const homeRemote = {

    fetchRestMessage: (): Promise<string> => {
        return fetch("/hello")
            .then(response => {
                return response.json();
            })
    }

}