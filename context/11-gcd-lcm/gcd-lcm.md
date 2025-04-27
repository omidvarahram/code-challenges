# 11. GCD and LCM (Euclidean Algorithm)

## How the Approach Works

The **Greatest Common Divisor (GCD)** of two numbers is the largest number that divides both without leaving a remainder.

The **Least Common Multiple (LCM)** is the smallest number that is a multiple of both numbers.

**Euclidean Algorithm** is an efficient method to compute GCD:
- Repeatedly replace `(a, b)` with `(b, a % b)` until `b == 0`.
- At that point, `a` is the GCD.

LCM can be found using the relationship:
- `LCM(a, b) = (a * b) / GCD(a, b)`

Time complexity of Euclidean Algorithm is **O(log(min(a, b)))**.

## What Kind of Questions Use GCD and LCM

- Finding shared divisibility
- Optimizing problems with periodicity
- Working with synchronized events (LCM)
- Simplifying ratios
- Problems involving relative primes

## Real Examples and Solutions

### Example 1 — GCD of Two Numbers

**Problem:**  
Find the GCD of two integers.

**Solution (Euclidean Algorithm):**

```javascript
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
```
> Replace a and b until b becomes zero.

---

### Example 2 — LCM of Two Numbers

**Problem:**  
Find the LCM of two integers.

**Solution:**

```javascript
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
```
> Use the relationship between GCD and LCM.

---

### Example 3 — Chocolates by Numbers (Codility Lesson)

**Problem:**  
N chocolates arranged in a circle, every M-th chocolate eaten. Find how many chocolates eaten before hitting one eaten already.

**Solution:**

```javascript
function solution(N, M) {
    return N / gcd(N, M);
}
```
> The number of chocolates eaten is `N / GCD(N, M)`.

---

### Example 4 — Find if Two Numbers are Coprime

**Problem:**  
Determine if two integers are coprime (GCD = 1).

**Solution:**

```javascript
function isCoprime(a, b) {
    return gcd(a, b) === 1;
}
```
> Coprime numbers have no common factors other than 1.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| GCD (Greatest Common Divisor) | Euclidean Algorithm O(log(min(a, b))) |
| LCM (Least Common Multiple) | `(a * b) / GCD(a, b)` |
| Applications | Divisibility, periodic events, coprimality checks |
| Patterns | Many cyclic, ratio, or modular problems use GCD or LCM |
