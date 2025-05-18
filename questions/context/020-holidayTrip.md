# HolidayTrip

**Easy**  
**40 min**

Calculate the minimum number of cars needed to take all of the passengers.

---

## Task description

A group of friends is going on holiday together.  
They have come to a meeting point (the start of the journey) using N cars.  
There are P[K] people and S[K] seats in the K-th car for K in range [0..N−1].  
Some of the seats in the cars may be free, so it is possible for some of the friends to change the car they are in.

The friends have decided that, in order to be ecological, they will leave some cars parked at the meeting point and travel with as few cars as possible.

Write a function:

``` ts
function solution(P, S);
```

that, given two arrays P and S, consisting of N integers each, returns the minimum number of cars needed to take all of the friends on holiday.

---

### Examples:

1. Given  
   P = [1, 4, 1]  
   S = [1, 5, 1],  
   the function should return **2**.  
   A person from car number 0 can travel in car number 1 instead.

2. Given  
   P = [4, 4, 2, 4]  
   S = [5, 5, 2, 5],  
   the function should return **3**.  
   One person from car number 2 can travel in car number 0 and the other in car number 3.

3. Given  
   P = [2, 3, 4, 2]  
   S = [2, 5, 7, 2],  
   the function should return **2**.  
   Passengers can be moved from car number 0 to car number 1 and from car 3 to car 2.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of arrays P and S is an integer within the range [1..9];
- every friend had a seat in the car they came in;  
  that is, P[K] ≤ S[K] for each K within the range [0..N−1].


# Task 20

## HolidayTrip

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You are given:
- `P[i]` = number of people in car `i`
- `S[i]` = number of seats in car `i`

All friends are at the meeting point, and we want to **use the minimum number of cars**  
so that **all people are transported**, possibly changing cars.

---

### Step 2: Strategy

1. **Total people** = sum of `P`
2. Sort all cars by **number of seats (descending)** — prioritize cars with more capacity
3. Pick cars one by one (starting from largest) until **total capacity ≥ total people**
4. Count how many cars were needed

---

### Step 3: TypeScript Code

```ts
function solution(P: number[], S: number[]): number {
  const N = P.length;
  const totalPeople = P.reduce((a, b) => a + b, 0);

  const capacities = S.slice().sort((a, b) => b - a); // descending

  let carsUsed = 0;
  let seatsAccumulated = 0;

  for (let seat of capacities) {
    seatsAccumulated += seat;
    carsUsed++;
    if (seatsAccumulated >= totalPeople) break;
  }

  return carsUsed;
}
```

---

### Step 4: Example

**Input:**  
P = [2, 3, 4, 2]  
S = [2, 5, 7, 2]

- Total people = 11
- Sorted seats = [7, 5, 2, 2]
- Add 7 → total = 7 → 1 car
- Add 5 → total = 12 ≥ 11 → 2 cars used

**Output:** 2

---

### Step 5: Time & Space Complexity

- **Time:** O(N log N) — sorting
- **Space:** O(N) — for seat copy

Efficient for N up to 100,000.
