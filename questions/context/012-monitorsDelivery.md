# MonitorsDelivery

**Easy**  
**40 min**

Given a set of orders, calculate how many of them can be fulfilled.

---

## Task description

A technology company announced that a new supply of P monitors would soon be available at their store. There were N orders (numbered from 0 to N−1) placed by customers who wanted to buy those monitors. The K-th order has to be delivered to a location at distance D[K] from the store and is for exactly C[K] monitors.

Now the time has come for the monitors to be delivered. The orders will be fulfilled one by one. To minimize the shipping time, it has been decided that the deliveries will be made in order of increasing distance from the store. If there are many customers at the same distance, they can be processed in any order. Monitors to more distant customers will be delivered only once all orders to customers closer to the store have already been fulfilled.

**What is the maximum total number of orders that can be fulfilled?**

Write a function:

``` ts
function solution(D, C, P);
```

that, given two arrays of integers D and C, and an integer P, returns the maximum total number of orders that can be fulfilled.

---

### Examples:

1. Given  
   D = [5, 11, 1, 3],  
   C = [6, 1, 3, 2],  
   P = 7,  
   the function should return **2**.  
   The customers at distances 1 and 3 will have their orders fulfilled: 3 + 2 = 5 monitors will be delivered.

2. Given  
   D = [10, 15, 1],  
   C = [10, 1, 2],  
   P = 3,  
   the function should return **1**.  
   Only the order for the customer at distance 1 will be fulfilled.

3. Given  
   D = [11, 18, 1],  
   C = [9, 18, 8],  
   P = 7,  
   the function should return **0**.

4. Given  
   D = [1, 4, 2, 5],  
   C = [4, 9, 2, 3],  
   P = 19,  
   the function should return **4**.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of arrays D and C is an integer within the range [1..1,000,000,000];
- P is an integer within the range [0..1,000,000,000].


# Task 12

## MonitorsDelivery

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You're given:
- `D[i]`: distance of the i-th order
- `C[i]`: number of monitors needed for that order
- `P`: total number of monitors available

**Goal:**  
- Fulfill **as many orders as possible**
- Orders are fulfilled **in increasing order of distance**
- Can **only fulfill an order if enough monitors remain**
- Once you skip an order due to insufficient monitors, all **more distant orders are ignored**

---

### Step 2: Strategy

1. Combine `D` and `C` into a single array of `{distance, count}` pairs.
2. Sort this array by distance (ascending).
3. Traverse the sorted list:
   - Deduct monitor count (`C[i]`) from available supply (`P`)
   - If not enough monitors remain to fulfill an order → **stop**
4. Count how many orders were fulfilled before stopping.

---

### Step 3: TypeScript Code

```ts
function solution(D: number[], C: number[], P: number): number {
  const N = D.length;
  const orders = [];

  for (let i = 0; i < N; i++) {
    orders.push({ distance: D[i], count: C[i] });
  }

  orders.sort((a, b) => a.distance - b.distance);

  let fulfilled = 0;

  for (let order of orders) {
    if (P >= order.count) {
      P -= order.count;
      fulfilled++;
    } else {
      break; // Cannot fulfill this order, stop further processing
    }
  }

  return fulfilled;
}
```

---

### Step 4: Example Walkthrough

**Input:**
- D = [5, 11, 1, 3]
- C = [6, 1, 3, 2]
- P = 7

**Sorted Orders by Distance:**
- (1, 3) → fulfill → P = 4
- (3, 2) → fulfill → P = 2
- (5, 6) → skip (not enough)
- (11, 1) → skip (farther than 5)

**Output:** `2`

---

### Step 5: Time & Space Complexity

- **Time:** O(N log N) — sorting
- **Space:** O(N) — for storing orders

Efficient for up to 100,000 orders.
