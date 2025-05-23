FreeingStorageSpace  
Medium  
50 min  
Compute how many types of items can stay in a storeroom after removing R consecutive items.

---

### Task description

A storeroom is used to organize items stored in it on N shelves. Shelves are numbered from 0 to N−1. The K-th shelf is dedicated to items of only one type, denoted by a positive integer A[K].

Recently it was decided that it is necessary to free R consecutive shelves. Shelves cannot be reordered. What is the maximum number of types of items which still can be stored in the storeroom after freeing R consecutive shelves?

---

### Write a function:

```function solution(A, R);```

that, given an array A of N integers representing types of items stored on storeroom shelves, and an integer R representing the number of consecutive shelves to be freed, returns the maximum number of different types of items that can be stored in the storeroom after freeing R consecutive shelves.

---

### Examples:

1. Given A = [2, 1, 2, 3, 2, 2] and R = 3, your function should return 2.  
   It can be achieved, for example, by freeing shelves 2, 3 and 4 (shelves are numbered from 0).

2. Given A = [2, 3, 1, 1, 2] and R = 2, your function should return 3.  
   All three types can still be stored by freeing the last two shelves.

3. Given A = [20, 10, 10, 10, 10, 30, 20] and R = 3, your function should return 3.  
   It can be achieved by freeing the first three shelves.

4. Given A = [1, 100000] and R = 3, your function should return 0.  
   All shelves need to be freed.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- R is an integer within the range [1..N];
- each element of array A is integer within range [1..100,000]
