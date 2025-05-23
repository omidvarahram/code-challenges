/**
 * The Fibonacci sequence is defined using the following recursive formula:

    F(0) = 0
    F(1) = 1
    F(M) = F(M - 1) + F(M - 2) if M >= 2
A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (position −1) and wants to get to the other bank (position N). The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position N.

The leaves on the river are represented in an array A consisting of N integers. Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river. Array A contains only 0s and/or 1s:

0 represents a position without a leaf;
1 represents a position containing a leaf.
The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from position −1 to position N). The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

For example, consider array A such that:

    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

Write a function:

function solution(A: number[]): number;

that, given an array A consisting of N integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

For example, given:

    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..100,000];
each element of array A is an integer that can have one of the following values: 0, 1.
 */

function solution(A: number[]): number {
    const N = A.length;

    // Step 1: Generate Fibonacci numbers <= N+1 (for jump to position N)
    const fibs: number[] = [1, 2];
    while (true) {
        const next = fibs[fibs.length - 1] + fibs[fibs.length - 2];
        if (next > N + 1) break;
        fibs.push(next);
    }

    // Step 2: BFS initialization
    const visited: boolean[] = new Array(N + 1).fill(false);
    const queue: { pos: number, jumps: number }[] = [{ pos: -1, jumps: 0 }];

    // Step 3: BFS loop
    while (queue.length > 0) {
        const { pos, jumps } = queue.shift()!;

        for (const fib of fibs) {
            const nextPos = pos + fib;
            if (nextPos === N) {
                return jumps + 1; // Reached the goal
            }
            if (
                nextPos >= 0 &&
                nextPos < N &&
                A[nextPos] === 1 &&
                !visited[nextPos]
            ) {
                visited[nextPos] = true;
                queue.push({ pos: nextPos, jumps: jumps + 1 });
            }
        }
    }

    return -1; // Cannot reach the end
}
