/**
You are given an array A consisting of N integers.

For each number A[i] such that 0 ≤ i < N, we want to count the number of elements of the array that are not the divisors of A[i]. We say that these elements are non-divisors.

For example, consider integer N = 5 and array A such that:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6
For the following elements:

A[0] = 3, the non-divisors are: 2, 6,
A[1] = 1, the non-divisors are: 3, 2, 3, 6,
A[2] = 2, the non-divisors are: 3, 3, 6,
A[3] = 3, the non-divisors are: 2, 6,
A[4] = 6, there aren't any non-divisors.
Write a function:

function solution(A: number[]): number[];

that, given an array A consisting of N integers, returns a sequence of integers representing the amount of non-divisors.

Result array should be returned as an array of integers.

For example, given:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6
the function should return [2, 4, 3, 2, 0], as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..50,000];
each element of array A is an integer within the range [1..2 * N].
 */


function solution(A: number[]): number[] {
    const N = A.length;
    const max = 2 * N;

    const count: number[] = new Array(max + 1).fill(0);
    const result: number[] = new Array(N).fill(0);

    // Step 1: Count frequency of each element in A
    for (const value of A) {
        count[value]++;
    }

    // Step 2: Precompute divisors for all values in A
    const divisorsMap: Map<number, number> = new Map();

    for (const value of A) {
        if (divisorsMap.has(value)) continue;

        let divisors = 0;
        for (let i = 1; i * i <= value; i++) {
            if (value % i === 0) {
                divisors += count[i];
                if (i !== value / i) {
                    divisors += count[value / i];
                }
            }
        }

        divisorsMap.set(value, divisors);
    }

    // Step 3: Calculate non-divisors
    for (let i = 0; i < N; i++) {
        result[i] = N - divisorsMap.get(A[i])!;
    }

    return result;
}
