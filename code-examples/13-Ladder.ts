/**
 * You have to climb up a ladder. The ladder has exactly N rungs, numbered from 1 to N. With each step, you can ascend by one or two rungs. More precisely:

with your first step you can stand on rung 1 or 2,
if you are on rung K, you can move to rungs K + 1 or K + 2,
finally you have to stand on rung N.
Your task is to count the number of different ways of climbing to the top of the ladder.

For example, given N = 4, you have five different ways of climbing, ascending by:

1, 1, 1 and 1 rung,
1, 1 and 2 rungs,
1, 2 and 1 rung,
2, 1 and 1 rungs, and
2 and 2 rungs.
Given N = 5, you have eight different ways of climbing, ascending by:

1, 1, 1, 1 and 1 rung,
1, 1, 1 and 2 rungs,
1, 1, 2 and 1 rung,
1, 2, 1 and 1 rung,
1, 2 and 2 rungs,
2, 1, 1 and 1 rungs,
2, 1 and 2 rungs, and
2, 2 and 1 rung.
The number of different ways can be very large, so it is sufficient to return the result modulo 2P, for a given integer P.

Write a function:

function solution(A: number[], B: number[]): number[];

that, given two non-empty arrays A and B of L integers, returns an array consisting of L integers specifying the consecutive answers; position I should contain the number of different ways of climbing the ladder with A[I] rungs modulo 2B[I].

For example, given L = 5 and:

    A[0] = 4   B[0] = 3
    A[1] = 4   B[1] = 2
    A[2] = 5   B[2] = 4
    A[3] = 5   B[3] = 3
    A[4] = 1   B[4] = 1
the function should return the sequence [5, 1, 8, 0, 1], as explained above.

Write an efficient algorithm for the following assumptions:

L is an integer within the range [1..50,000];
each element of array A is an integer within the range [1..L];
each element of array B is an integer within the range [1..30].
 */

function solution(A: number[], B: number[]): number[] {
    const L = A.length;
    const maxA = Math.max(...A);
    const results: number[] = new Array(L);

    // Step 1: Precompute Fibonacci up to maxA+2 with mod 2^30 (max possible 2^B[i])
    const maxMod = 1 << 30;
    const fib: number[] = new Array(maxA + 2);
    fib[0] = 0;
    fib[1] = 1;

    for (let i = 2; i <= maxA + 1; i++) {
        fib[i] = (fib[i - 1] + fib[i - 2]) % maxMod;
    }

    // Step 2: Compute results using mod 2^B[i]
    for (let i = 0; i < L; i++) {
        const mod = 1 << B[i]; // 2^B[i]
        results[i] = fib[A[i] + 1] % mod;
    }

    return results;
}
