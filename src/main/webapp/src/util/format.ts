import dayjs from "dayjs";

export function formatToTimestamp (time: number) {
    return dayjs(time).format('DD.MM.YYYY HH:mm:ss');
}