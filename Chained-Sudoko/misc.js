export function RandomHexValue() {
    return Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase();
}
;
export function GenerateRandomHexColor() {
    return ("#" +
        RandomHexValue() +
        RandomHexValue() +
        RandomHexValue() +
        RandomHexValue() +
        RandomHexValue() +
        RandomHexValue());
}
