/*
An array A consisting of N integers is given. A triplet (P, Q, R) is triangular if it is possible to build a triangle with sides of lengths A[P], A[Q] and A[R]. In other words, triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:

A[P] + A[Q] > A[R],
A[Q] + A[R] > A[P],
A[R] + A[P] > A[Q].
For example, consider array A such that:

  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 12
There are four triangular triplets that can be constructed from elements of this array, namely (0, 2, 4), (0, 2, 5), (0, 4, 5), and (2, 4, 5).

Write a function:

function solution(A: number[]): number;

that, given an array A consisting of N integers, returns the number of triangular triplets in this array.

For example, given array A such that:

  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 12
the function should return 4, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..1,000];
each element of array A is an integer within the range [1..1,000,000,000].
*/

function solution(A: number[]): number {
    const N = A.length;
    let count = 0;

    // 1. Sort the array in non-decreasing order.
    //    This lets us use the two-pointer technique to test the triangle condition efficiently.
    A.sort((a, b) => a - b);

    // 2. Fix the first side at index i
    for (let i = 0; i < N - 2; i++) {
        // k will point to the third side; start it just beyond j
        let k = i + 2;

        // 3. Fix the second side at index j
        for (let j = i + 1; j < N - 1; j++) {
            // 4. Advance k while A[i] + A[j] > A[k] (triangle inequality for the largest side)
            //    As soon as A[i] + A[j] <= A[k], no further k will work (array is sorted).
            while (k < N && A[i] + A[j] > A[k]) {
                k++;
            }

            // 5. All indices between j+1 and k-1 form valid triangles with (i, j)
            //    Number of them = (k - 1) - (j + 1) + 1 = k - j - 1
            count += k - j - 1;
        }
    }

    return count;
}
