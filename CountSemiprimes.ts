/**
 A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

You are given two non-empty arrays P and Q, each consisting of M integers. These arrays represent queries about the number of semiprimes within specified ranges.

Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

For example, consider an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
The number of semiprimes within each of these ranges is as follows:

(1, 26) is 10,
(4, 10) is 4,
(16, 20) is 0.
Write a function:

function solution(N: number, P: number[], Q: number[]): number[];

that, given an integer N and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

For example, given an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
the function should return the values [10, 4, 0], as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..50,000];
M is an integer within the range [1..30,000];
each element of arrays P and Q is an integer within the range [1..N];
P[i] ≤ Q[i].
 */

function solution(N: number, P: number[], Q: number[]): number[] {
    const sieve = new Array(N + 1).fill(0);
    const semiprimePrefix = new Array(N + 1).fill(0);

    // Step 1: Sieve of Eratosthenes to store smallest prime factors
    for (let i = 2; i * i <= N; i++) {
        if (sieve[i] === 0) {
            for (let k = i * i; k <= N; k += i) {
                if (sieve[k] === 0) {
                    sieve[k] = i;
                }
            }
        }
    }

    // Step 2: Identify semiprimes
    for (let i = 2; i <= N; i++) {
        if (sieve[i] !== 0) {
            const first = sieve[i];
            const second = i / first;
            if (sieve[second] === 0) {
                semiprimePrefix[i] = 1;
            }
        }
    }

    // Step 3: Prefix sum of semiprimes
    for (let i = 1; i <= N; i++) {
        semiprimePrefix[i] += semiprimePrefix[i - 1];
    }

    // Step 4: Answer queries using prefix sum
    const result: number[] = [];
    for (let i = 0; i < P.length; i++) {
        const from = P[i];
        const to = Q[i];
        result.push(semiprimePrefix[to] - semiprimePrefix[from - 1]);
    }

    return result;
}
