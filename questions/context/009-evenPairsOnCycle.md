# EvenPairsOnCycle

**Easy**  
**40 min**

Given numbers on a circle, find the maximum number of neighbouring pairs with an even sum.

---

## Task description

You are given N numbers on a circle, described by an array A.  
Find the maximum number of neighbouring pairs whose sums are even.  
One element can belong to only one pair.

Write a function:

``` ts
function solution(A);
```

that, given an array A consisting of N integers, returns the maximum number of neighbouring pairs whose sums are even.

---

### Examples:

1. Given A = [4, 2, 5, 8, 7, 3, 7], the function should return **2**.  
   We can create two pairs with even sums: (A[0], A[1]) and (A[4], A[5]).  
   Another way to choose two pairs is: (A[0], A[1]) and (A[5], A[6]).

2. Given A = [14, 21, 16, 35, 22], the function should return **1**.  
   There is only one qualifying pair: (A[0], A[4]).

3. Given A = [5, 5, 5, 5, 5, 5], the function should return **3**.  
   We can create three pairs: (A[0], A[5]), (A[1], A[2]), and (A[3], A[4]).

---

## Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [0..1,000,000,000].
