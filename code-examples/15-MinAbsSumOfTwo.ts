/**
 * Let A be a non-empty array consisting of N integers.

The abs sum of two for a pair of indices (P, Q) is the absolute value |A[P] + A[Q]|, for 0 ≤ P ≤ Q < N.

For example, the following array A:

  A[0] =  1
  A[1] =  4
  A[2] = -3
has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2). 

 The abs sum of two for the pair (0, 0) is A[0] + A[0] = |1 + 1| = 2. 

 The abs sum of two for the pair (0, 1) is A[0] + A[1] = |1 + 4| = 5. 

 The abs sum of two for the pair (0, 2) is A[0] + A[2] = |1 + (−3)| = 2. 

 The abs sum of two for the pair (1, 1) is A[1] + A[1] = |4 + 4| = 8. 

 The abs sum of two for the pair (1, 2) is A[1] + A[2] = |4 + (−3)| = 1. 

 The abs sum of two for the pair (2, 2) is A[2] + A[2] = |(−3) + (−3)| = 6. 


Write a function:

function solution(A: number[]): number;

that, given a non-empty array A consisting of N integers, returns the minimal abs sum of two for any pair of indices in this array.

For example, given the following array A:

  A[0] =  1
  A[1] =  4
  A[2] = -3
the function should return 1, as explained above.

Given array A:

  A[0] = -8
  A[1] =  4
  A[2] =  5
  A[3] =-10
  A[4] =  3
the function should return |(−8) + 5| = 3.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].
 */

function solution(A: number[]): number {
    const N = A.length;
    // 1. Sort the array in non-decreasing order.
    A.sort((a, b) => a - b);

    // 2. Initialize minAbsSum to +Infinity.
    let minAbsSum = Infinity;

    // 3. Consider the “self‐pair” (i,i) for every element:
    //    |A[i] + A[i]| = 2 * |A[i]|
    for (let i = 0; i < N; i++) {
        const selfSum = 2 * Math.abs(A[i]);
        if (selfSum < minAbsSum) {
            minAbsSum = selfSum;
        }
    }

    // 4. Now use two‐pointer for distinct pairs (i < j):
    //    We maintain i at start, j at end, and move inward.
    let i = 0;
    let j = N - 1;
    while (i < j) {
        const sum = A[i] + A[j];
        const absSum = Math.abs(sum);
        if (absSum < minAbsSum) {
            minAbsSum = absSum;
            // If we ever reach 0, that's the smallest possible
            if (minAbsSum === 0) return 0;
        }
        // If sum is positive, decreasing j may reduce it; else increasing i may increase it toward zero
        if (sum > 0) {
            j--;
        } else {
            i++;
        }
    }

    return minAbsSum;
}
