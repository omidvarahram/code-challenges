/**
 * For a given array A of N integers and a sequence S of N integers from the set {−1, 1}, we define val(A, S) as follows:

val(A, S) = |sum{ A[i]*S[i] for i = 0..N−1 }|

(Assume that the sum of zero elements equals zero.)

For a given array A, we are looking for such a sequence S that minimizes val(A,S).

Write a function:

function solution(A: number[]): number;

that, given an array A of N integers, computes the minimum value of val(A,S) from all possible values of val(A,S) for all possible sequences S of N integers from the set {−1, 1}.

For example, given array:

  A[0] =  1
  A[1] =  5
  A[2] =  2
  A[3] = -2
your function should return 0, since for S = [−1, 1, −1, 1], val(A, S) = 0, which is the minimum possible value.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..20,000];
each element of array A is an integer within the range [−100..100].
 */

/**
 * Given A of N ints, each in [−100..100], find signs S[i] ∈ {−1,1} to minimize
 * |Σ A[i]*S[i]|. Equivalently, partition |A[i]| into two sets whose sums
 * differ as little as possible.
 *
 * We solve subset‐sum up to total/2 using a bitset + binary splitting on counts.
 *
 * Time: O(V·log C · W) where V=distinct |A[i]| values ≤100,
 *       C=freq,  W=bits/32 ≈ (sum/2)/32 ≤ (100·20000/2)/32≈31250.
 * Space: O(W).
 */
function solution(A: number[]): number {
    const N = A.length;
    if (N === 0) return 0;

    // 1. Convert to absolute values and count frequencies
    const freq = new Uint16Array(101);
    let total = 0;
    for (let x of A) {
        const v = Math.abs(x);
        freq[v]++;
        total += v;
    }

    // 2. We only need sums up to half the total
    const target = total >> 1;
    const bits = target + 1;
    const W = (bits + 31) >>> 5;             // number of 32‐bit words
    const dp = new Uint32Array(W);          // bitset
    dp[0] = 1;                              // sum=0 is reachable

    // 3. For each value v=1..100 with count c, do binary‐split grouping
    for (let v = 1; v <= 100; v++) {
        let c = freq[v];
        if (c === 0) continue;
        let k = 1;
        while (c > 0) {
            const take = Math.min(k, c);
            c -= take;
            const shift = v * take;         // weight of this group
            const wordShift = shift >>> 5;
            const bitShift = shift & 31;

            // 4. Shift dp left by `shift` bits and OR into dp
            for (let w = W - 1; w >= wordShift; w--) {
                let val = dp[w - wordShift] << bitShift;
                if (bitShift !== 0 && w - wordShift - 1 >= 0) {
                    val |= dp[w - wordShift - 1] >>> (32 - bitShift);
                }
                dp[w] |= val;
            }

            k <<= 1;
        }
    }

    // 5. Find the largest s ≤ target with dp bit set
    for (let s = target; s >= 0; s--) {
        const w = s >>> 5, b = s & 31;
        if ((dp[w] & (1 << b)) !== 0) {
            // minimal difference = total - 2*s
            return total - (s << 1);
        }
    }

    return total; // fallback (shouldn't happen)
}
