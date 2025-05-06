'''
# 28. Stack — Bracket Matching & Nesting

## How the Approach Works

Stacks are used to track **nested or sequential patterns**, especially when **order matters** (like brackets or XML tags).

Use a **stack** to:
- Push opening brackets
- Pop when a matching closing bracket is found
- Detect mismatch or imbalance

Time complexity: **O(N)** for all common operations.

## What Kind of Questions Use Stack (for Brackets)

- Valid parentheses/bracket matching
- Valid nesting of expressions
- Evaluating expressions or tags

## Real Examples and Solutions

### Example 1 — Valid Brackets

**Problem:**  
Return true if brackets are valid and properly nested.

**Solution:**

```javascript
function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };

    for (let char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}
```
> Push opens, pop on closes.

---

### Example 2 — Codility Nesting Problem

**Problem:**  
Return 1 if string of parentheses is properly nested.

**Solution:**

```javascript
function nesting(S) {
    const stack = [];
    for (let char of S) {
        if (char === '(') stack.push(char);
        else {
            if (stack.length === 0) return 0;
            stack.pop();
        }
    }
    return stack.length === 0 ? 1 : 0;
}
```
> Classic stack-based depth checker.

---

### Example 3 — Brackets Problem (Multiple Types)

**Problem:**  
Check nesting for (), [], and {}.

**Same as Example 1.**

---

### Example 4 — Minimum Add to Make Valid

**Problem:**  
How many parentheses must be added to make the string valid?

**Solution:**

```javascript
function minAddToMakeValid(s) {
    let open = 0, unmatched = 0;
    for (let char of s) {
        if (char === '(') open++;
        else {
            if (open > 0) open--;
            else unmatched++;
        }
    }
    return open + unmatched;
}
```
> Track balance using counters or stack.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Stack | Matching open/close symbols |
| Validity checks | Push for open, pop for close |
| Time Complexity | O(N) |
'''
