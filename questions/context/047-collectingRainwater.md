## CollectingRainwater

**Medium**  
**50 min**  
Find the minimum number of water tanks needed to save the rainwater from all houses in a street.

---

### Task description

Today our world is approaching an ecological crisis. Due to global warming, the sea level is rising. At the same time, the amount of drinkable water is decreasing. One idea about preventing the loss of drinkable water is the propagation of rainwater storage, in other words, equipping houses with a water tank for rainwater.

You are given a string S describing a street, in which `'H'` denotes a house and `'-'` denotes an empty plot. You may place water tanks in empty plots to collect rainwater from nearby houses. A house can collect its own rainwater if there is a tank next to it (on either the left or the right side).

Your task is to find the **minimum number of water tanks needed** to collect rainwater from all of the houses.

For example, given S = "`--H-HH--`", you can collect rainwater from all three houses by using two water tanks. You can position one water tank between the first and second houses and the other after the third house. This placement of water tanks can be represented as "`--HTHT--`", where `'T'` denotes a water tank.

---

### Write a function:

```function solution(S);```

that, given a string S of length N, returns the minimum number of water tanks needed.  
If there is no solution, return -1.

---

### Examples:

1. Given S = "`--H-HH--`", the function should return 2, as explained above.

2. Given S = "`H`", the function should return -1. There is no available plot on which to place a water tank.

3. Given S = "`HH-HH`", the function should return -1. There is only one plot to put a water tank, and it is impossible to collect rainwater from the first and last houses.

4. Given S = "`-H-H-H-H-H`", the function should return 3. One possible way of placing water tanks is "`-HTH-HTHTH`".

---

### Assume that:

- N is an integer within the range [1..20];
- string S is made only of the characters `'-'` and/or `'H'`.

---

**In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.**

## CollectingRainwater

**Step-by-Step Explanation**

### 1. Problem Restatement

We have a street string `S` of length `N` with:

* `'H'` = house
* `'-'` = empty plot

We want to place the fewest water tanks (`'T'`) on empty plots so that **every** house has **at least one** adjacent tank (left or right). If impossible, return `-1`.

### 2. Greedy Strategy

Scan left-to-right over `S`. For each house at index `i`:

1. **If** it already has a tank on the left (`i-1` within bounds and `S[i-1] === 'T'`), it’s covered → skip.
2. **Else**, **try** to place a tank on the **right**: if `i+1 < N` and `S[i+1] === '-'`, set `S[i+1] = 'T'`, increment `count`, and skip.
3. **Else**, try the **left**: if `i-1 >= 0` and `S[i-1] === '-'`, set `S[i-1] = 'T'`, increment `count`, and skip.
4. **Otherwise**, no adjacency possible → **return** `-1`.

This “right-first” rule is optimal because placing a tank to the right covers the current house and may also cover the next house.

### 3. TypeScript Implementation

```ts
function solution(S: string): number {
  const N = S.length;
  // Convert to array for mutation
  const arr = S.split('');
  let tanks = 0;

  for (let i = 0; i < N; i++) {
    if (arr[i] !== 'H') continue;

    // Already covered by left tank?
    if (i - 1 >= 0 && arr[i - 1] === 'T') {
      continue;
    }

    // Try placing tank to the right
    if (i + 1 < N && arr[i + 1] === '-') {
      arr[i + 1] = 'T';
      tanks++;
      continue;
    }

    // Try placing tank to the left
    if (i - 1 >= 0 && arr[i - 1] === '-') {
      arr[i - 1] = 'T';
      tanks++;
      continue;
    }

    // No way to cover this house
    return -1;
  }

  return tanks;
}
```

---

### 4. Examples

1. `S = "--H-HH--"` → Place at index 3 and 6 → **2**
2. `S = "H"` → Impossible → **-1**
3. `S = "HH-HH"` → Impossible to cover both ends with one plot → **-1**
4. `S = "-H-H-H-H-H"` → Greedy places at positions 2, 5, and 8 → **3**
