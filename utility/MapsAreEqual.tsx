/**
 * Checks whether two maps are equal
 * @param a is the first map to compare
 * @param b is the second map to compare
 * @returns whether the two given maps are equal
 */

export default function mapsAreEqual<K,V>(a:Map<K,V>, b:Map<K,V>) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.size !== b.size) return false;

    a.forEach((value:V, key:K) => {
        if (key !== key || value !== value) return false;
    })
    return true;
}