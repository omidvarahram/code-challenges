# AsphaltPatches

**Easy**  
**40 min**

Given a description of a road with potholes, find the minimum number of patches needed to repair them all. One patch repairs three consecutive road segments.

---

## Task description

There is a road consisting of N segments, numbered from 0 to N−1, represented by a string S.  
Segment S[K] of the road may contain a pothole, denoted by a single uppercase "x" character,  
or may be a good segment without any potholes, denoted by a single dot, ".".

For example, string ".x..x" means that there are two potholes in total in the road:  
one is located in segment S[1] and one in segment S[4].  
All other segments are good.

The road fixing machine can patch over three consecutive segments at once with asphalt  
and repair all the potholes located within each of these segments.  
Good or already repaired segments remain good after patching them.

**Your task is to compute the minimum number of patches required to repair all the potholes in the road.**

Write a function:

``` ts
function solution(S);
```

that, given a string S of length N, returns the minimum number of patches required to repair all the potholes.

---

### Examples:

1. Given S = ".x..x", your function should return **2**.  
   The road fixing machine could patch, for example, segments 0–2 and 2–4.

2. Given S = "x..xxxxx..x", your function should return **3**.  
   The road fixing machine could patch, for example, segments 0–2, 3–5 and 6–8.

3. Given S = "xx.xxx..", your function should return **2**.  
   The road fixing machine could patch, for example, segments 0–2 and 3–5.

4. Given S = "xxxx", your function should return **2**.  
   The road fixing machine could patch, for example, segments 0–2 and 1–3.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [3..100,000];
- string S is made only of the characters '.' and/or 'x'.


# Task 17

## AsphaltPatches

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You're given a string `S` representing a road:
- `'x'` = pothole
- `'.'` = good segment

You have a machine that can **patch 3 consecutive segments at once**.  
Your goal: **use the minimum number of patches** to repair all potholes (`'x'`).

---

### Step 2: Strategy (Greedy)

Use a **greedy** approach:
- Start from left to right
- Whenever you find a `'x'`, patch the next 3 segments
- Move the pointer 3 steps forward (since that `'x'` is covered)
- If current segment is `'.'`, move 1 step forward

This guarantees that we cover potholes as early and efficiently as possible.

---

### Step 3: TypeScript Code

```ts
function solution(S: string): number {
  let patches = 0;
  let i = 0;

  while (i < S.length) {
    if (S[i] === 'x') {
      patches++;
      i += 3; // Skip next 2, they’re patched
    } else {
      i++; // Move to next segment
    }
  }

  return patches;
}
```

---

### Step 4: Example

**Input:** `"x..xxxxx..x"`

1. i = 0 → `'x'` → patch → `patches = 1`, i += 3 → i = 3
2. i = 3 → `'x'` → patch → `patches = 2`, i += 3 → i = 6
3. i = 6 → `'x'` → patch → `patches = 3`, i += 3 → i = 9
4. i = 9 → `'.'` → skip → i = 10
5. i = 10 → `'x'` → patch → `patches = 4`, i += 3 → i = 13 (done)

BUT note that overlapping patches (e.g. 3–5 and 6–8) can cover clusters more efficiently.  
However, greedy always patches the earliest `'x'`, which ensures **minimum patches overall**.

**Output:** `3`

---

### Step 5: Time & Space Complexity

- **Time:** O(N) — single pass through the string
- **Space:** O(1) — only counters used

Efficient and correct for input size up to 100,000.
