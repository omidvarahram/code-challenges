/**
 * You are given two non-empty arrays A and B consisting of N integers. These arrays represent N planks. More precisely, A[K] is the start and B[K] the end of the K−th plank.

Next, you are given a non-empty array C consisting of M integers. This array represents M nails. More precisely, C[I] is the position where you can hammer in the I−th nail.

We say that a plank (A[K], B[K]) is nailed if there exists a nail C[I] such that A[K] ≤ C[I] ≤ B[K].

The goal is to find the minimum number of nails that must be used until all the planks are nailed. In other words, you should find a value J such that all planks will be nailed after using only the first J nails. More precisely, for every plank (A[K], B[K]) such that 0 ≤ K < N, there should exist a nail C[I] such that I < J and A[K] ≤ C[I] ≤ B[K].

For example, given arrays A, B such that:

    A[0] = 1    B[0] = 4
    A[1] = 4    B[1] = 5
    A[2] = 5    B[2] = 9
    A[3] = 8    B[3] = 10
four planks are represented: [1, 4], [4, 5], [5, 9] and [8, 10].

Given array C such that:

    C[0] = 4
    C[1] = 6
    C[2] = 7
    C[3] = 10
    C[4] = 2
if we use the following nails:

0, then planks [1, 4] and [4, 5] will both be nailed.
0, 1, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
0, 1, 2, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
0, 1, 2, 3, then all the planks will be nailed.
Thus, four is the minimum number of nails that, used sequentially, allow all the planks to be nailed.

Write a function:

function solution(A: number[], B: number[], C: number[]): number;

that, given two non-empty arrays A and B consisting of N integers and a non-empty array C consisting of M integers, returns the minimum number of nails that, used sequentially, allow all the planks to be nailed.

If it is not possible to nail all the planks, the function should return −1.

For example, given arrays A, B, C such that:

    A[0] = 1    B[0] = 4
    A[1] = 4    B[1] = 5
    A[2] = 5    B[2] = 9
    A[3] = 8    B[3] = 10

    C[0] = 4
    C[1] = 6
    C[2] = 7
    C[3] = 10
    C[4] = 2
the function should return 4, as explained above.
 * 
 */
function solution(A: number[], B: number[], C: number[]): number {
    const N = A.length;
    const M = C.length;
    // Maximum position we need to consider (values in A, B, C are up to 2*M)
    const maxPos = 2 * M + 1;

    // Helper: check if using the first `countNails` nails can nail all planks
    const canNailAll = (countNails: number): boolean => {
        // 1. Build an array `nailed` where nailed[x] = 1 if we hammered at x
        const nailed = new Uint8Array(maxPos + 1);
        for (let i = 0; i < countNails; i++) {
            nailed[C[i]] = 1;
        }

        // 2. Build prefix sum over `nailed`
        const prefix = new Uint32Array(maxPos + 1);
        for (let i = 1; i <= maxPos; i++) {
            prefix[i] = prefix[i - 1] + nailed[i];
        }

        // 3. For each plank [A[k], B[k]], check if there's at least one nailed position
        for (let k = 0; k < N; k++) {
            // number of nails in [A[k], B[k]] is prefix[B] - prefix[A-1]
            if (prefix[B[k]] - prefix[A[k] - 1] === 0) {
                return false; // this plank isn't nailed
            }
        }

        return true;
    };

    // Binary search on the number of nails
    let left = 1;
    let right = M;
    let answer = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canNailAll(mid)) {
            answer = mid;
            right = mid - 1; // try fewer nails
        } else {
            left = mid + 1;  // need more nails
        }
    }

    return answer;
}
