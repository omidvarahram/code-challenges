# 10. Prime Factors and Divisibility

## How the Approach Works

**Prime factorization** means expressing a number as a product of its prime numbers.  
**Divisibility** checks whether a number can be evenly divided by another.

In Codility problems:
- We often need to **decompose numbers into prime factors**.
- Check **greatest common divisors (GCD)** or **least common multiples (LCM)**.
- Analyze divisibility properties to optimize problems.

Efficient prime factorization can be done using:
- **Trial division up to √N**
- **Smallest prime factor (SPF) array** precomputed via Sieve

## What Kind of Questions Use Prime Factors and Divisibility

- Finding the GCD, LCM
- Prime factor counting
- Detecting coprime or relatively prime numbers
- Optimizing divisibility checks
- Factor-based optimizations in math problems

## Real Examples and Solutions

### Example 1 — Count Factors

**Problem:**  
Count the number of factors (divisors) of a given integer N.

**Solution:**

```javascript
function solution(N) {
    let count = 0;
    for (let i = 1; i * i <= N; i++) {
        if (N % i === 0) {
            count += (i * i === N) ? 1 : 2;
        }
    }
    return count;
}
```
> For each divisor i, count both i and N/i unless i*i == N.

---

### Example 2 — Common Prime Divisors

**Problem:**  
Check if two numbers have exactly the same set of prime divisors.

**Solution:**

```javascript
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function hasSamePrimeDivisors(a, b) {
    const common = gcd(a, b);

    function removeCommonPrimeDivisors(x) {
        let d;
        while ((d = gcd(x, common)) !== 1) {
            x /= d;
        }
        return x === 1;
    }

    return removeCommonPrimeDivisors(a) && removeCommonPrimeDivisors(b);
}

function solution(A, B) {
    let count = 0;
    for (let i = 0; i < A.length; i++) {
        if (hasSamePrimeDivisors(A[i], B[i])) {
            count++;
        }
    }
    return count;
}
```
> Repeatedly divide by GCD prime factors to verify.

---

### Example 3 — Greatest Common Divisor (GCD)

**Problem:**  
Find the greatest common divisor of two numbers.

**Solution (Euclidean Algorithm):**

```javascript
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
```
> Standard method for GCD in O(log(min(a, b))).

---

### Example 4 — Least Common Multiple (LCM)

**Problem:**  
Find the least common multiple of two numbers.

**Solution:**

```javascript
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
```
> LCM is related to GCD: lcm(a, b) * gcd(a, b) = a * b.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Prime factorization | Decomposing numbers into primes |
| Divisibility | Checking factor relationships |
| GCD | Euclidean algorithm for common divisors |
| LCM | Related to GCD via product |
| Applications | Factor counting, coprimality, divisibility optimizations |
