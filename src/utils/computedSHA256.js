import sha256 from 'js-sha256';

export const computedSha256 = (item) => {
    return sha256(item).toUpperCase()
}