# RecyclingTrucks

**Medium**  
50 min  
Calculate the time needed by three recycling trucks to collect all trash in a street.

---

## Task description

There are N houses (numbered from 0 to N-1) along a street. In each of them, recyclable trash (plastic, glass, metal) is collected into separate bags.

There are three trucks that collect the trash. Each of them collects a separate type of trash (the first collects plastic, the second, glass and the third, metal). All the trucks begin and end their jobs at the starting end of the street. Passing from the starting point to house number 0 takes D[0] minutes. Passing between houses number K-1 and K (for K in the range 1 to N-1) takes D[K] minutes. Loading one bag onto the truck takes one minute.

For example, D = [2, 5] means that passing between the starting point and house number 0 takes 2 minutes and passing between house number 0 and 1 takes 5 minutes.

Each of the houses has already collected some bags (or possibly no bags) of recyclable trash. The number of bags that house number K has collected is recorded in string T[K], composed of letters 'P' (plastic), 'G' (glass) and 'M' (metal). For example, T[1] = "GMG" means that house number 1 has collected two bags of glass and one bag of metal. Each house may collect more than one bag of each type.

All of the trucks start their jobs simultaneously. Each finishes its job after collecting all of the bags of the given type of trash and returning back to the starting point. What is the minimum number of minutes that will pass before all the trucks finish all the jobs?

Write a function:

```function solution(D, T);```

that, given array D of N integers and array T of N strings, returns the minimum number of minutes needed by the trucks to finish all the jobs.

---

### Examples:

1. Given D = [2, 5], T = ["PGP", "M"], the function should return 15. The truck collecting plastic needs to go to house number 0, collect two bags and go back, which takes 2 + 1 + 1 + 2 = 6 minutes. The truck collecting glass needs 5 minutes: 2 minutes to go to house number 0, 1 minute to collect a bag and 2 minutes to return to the starting point. The truck collecting metal will go straight to house number 1, collect a bag and go back in 7 + 1 + 7 = 15 minutes. After 15 minutes all of the trash will have been collected and all trucks will have returned to the starting point.

2. Given D = [3, 2, 4], T = ["MPM", "", "G"], the function should return 19. The truck collecting glass needs the most time: 3 + 2 + 4 + 1 + 4 + 2 + 3 = 19.

3. Given D = [2, 1, 1, 2], T = ["", "PP", "PP", "GM", ""], the function should return 12. The truck collecting plastic needs 12 minutes, whereas the trucks collecting glass and metal both need 11 minutes to finish their jobs.

---

Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of array D is an integer within the range [1..100];
- each element of array T is a string consisting of letters 'P', 'G' or 'M';
- S, the total length of all strings, is an integer within the range [0..100,000].

```ts
function solution(D: number[], T: string[]): number {
  const N = D.length;
  // Compute prefix distances: time from start to house i
  const dist = Array(N).fill(0);
  dist[0] = D[0];
  for (let i = 1; i < N; i++) {
    dist[i] = dist[i - 1] + D[i];
  }

  // Track for each type: total bags and furthest house index
  const total = { P: 0, G: 0, M: 0 };
  const furthest = { P: -1, G: -1, M: -1 };

  for (let i = 0; i < N; i++) {
    for (const ch of T[i]) {
      total[ch as 'P'|'G'|'M']++;
      furthest[ch as 'P'|'G'|'M'] = i;
    }
  }

  // For each type, compute time if any bags exist
  function timeFor(type: 'P'|'G'|'M'): number {
    const cnt = total[type];
    if (cnt === 0) return 0;
    const idx = furthest[type];
    const travel = 2 * dist[idx];  // go there and back
    return travel + cnt;           // plus 1 minute per bag
  }

  // The overall finish time is the maximum over the three trucks
  return Math.max(
    timeFor('P'),
    timeFor('G'),
    timeFor('M')
  );
}
```

**Explanation of Key Steps**

1. **Prefix distances**: `dist[i]` is the one‐way travel time from the depot to house `i`.
2. **Counting**: We tally total number of `P`, `G`, `M` bags and record the highest index `i` where each appears.
3. **Per‐truck time**:

   * If a truck has no bags, its time is 0.
   * Otherwise, it must travel to the furthest house with its type and back (`2*dist[idx]`), plus load each bag for 1 minute each (`+ total[type]`).
4. **Answer**: Since trucks work in parallel, the overall finish time is the **maximum** of the three individual times.

This runs in **O(N + S)** time and **O(N)** space, where `S` is total length of all `T[i]`.
