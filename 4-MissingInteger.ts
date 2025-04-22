/**
 * Write a function:

function solution(A: number[]): number;

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000..1,000,000].
 */

function solution(A: number[]): number {
    const seen = new Set<number>();

    // Store all positive numbers in a Set
    for (const num of A) {
        if (num > 0) {
            seen.add(num);
        }
    }

    // Check the smallest missing positive integer
    for (let i = 1; i <= A.length + 1; i++) {
        if (!seen.has(i)) {
            return i;
        }
    }

    return 1; // Fallback, though the loop always returns first
}
