# PathDetection

**Medium**  
**50 min**  
Check whether the given graph contains a path going through all vertices, one by one, in increasing order of their numbers.

---

## Task description

You are given an undirected graph consisting of N vertices, numbered from 1 to N, and M edges.

The graph is described by two arrays, A and B, both of length M. A pair (A[K], B[K]), for K from 0 to M−1, describes an edge between vertex A[K] and vertex B[K].

Your task is to check whether the given graph contains a path from vertex 1 to vertex N going through all of the vertices, one by one, in increasing order of their numbers. All connections on the path should be direct.

---

## Write a function:

```ts
function solution(N, A, B);
```

that, given an integer N and two arrays A and B of M integers each, returns `true` if there exists a path from vertex 1 to N going through all vertices, one by one, in increasing order, or `false` otherwise.

---

## Examples:

1. Given `N = 4`, `A = [1, 2, 4, 4, 3]` and `B = [2, 3, 1, 3, 1]`, the function should return `true`.  
   There is a path (1 → 2 → 3 → 4) using edges (1, 2), (2, 3) and (3, 4).

2. Given `N = 4`, `A = [1, 2, 1, 3]` and `B = [2, 4, 3, 4]`, the function should return `false`.  
   There is no path (1 → 2 → 3 → 4), as there is no direct connection from vertex 2 to vertex 3.

3. Given `N = 6`, `A = [2, 4, 5, 3]` and `B = [3, 5, 6, 4]`, the function should return `false`.  
   There is no direct connection from vertex 1 to vertex 2.

4. Given `N = 3`, `A = [1, 3]` and `B = [2, 2]`, the function should return `true`.  
   There is a path (1 → 2 → 3) using edges (1, 2) and (3, 2).

---

## Write an efficient algorithm for the following assumptions:

- N is an integer within the range [2..100,000];
- M is an integer within the range [0..100,000];
- all elements of arrays A and B are integers within the range [1..N];
- there are no self-loops (edges with A[K] = B[K]) in the graph;
- there are no multiple edges between the same vertices.
![alt text](image-1.png)
![alt text](image-2.png)