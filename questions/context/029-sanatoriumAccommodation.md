## SanatoriumAccommodation

**Easy**  
**40 min**  
*Find the minimum number of rooms needed to accommodate all guests in a sanatorium according to their preferences.*

### Task description

There are N guests (numbered from 0 to N−1) in a sanatorium waiting to be assigned a room. In each room, any number of guests can be accommodated. However, not all guests like to have a lot of roommates.

You are given an array A of N integers: the K-th guest wants to be in a room that contains at most A[K] guests, including themselves.

### Write a function:

```python
function solution(A);
```

that, given the array A, returns the minimum number of rooms needed to accommodate all guests.

### Examples:

1. Given A = [1, 1, 1, 1, 1],  
   your function should return **5**.  
   *Each guest should be accommodated in their own separate room.*

2. Given A = [2, 1, 4],  
   your function should return **2**.  
   *The second guest should be accommodated in one room and the other two guests in another room.*

3. Given A = [2, 7, 2, 9, 8],  
   your function should return **2**.  
   *The first and the third guests should be accommodated in one room and the other three guests in another room.*

4. Given A = [7, 3, 1, 1, 4, 5, 4, 9],  
   your function should return **4**.  
   *The guests can be accommodated as follows: the first two guests in one room, the third and the fourth guests in two single rooms, and the other guests in another room.*

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];  
- each element of array A is an integer within the range [1..100,000].

---
## SanatoriumAccommodation

**Step-by-Step Explanation**

### Step 1: Understand the Problem  
We have \(N\) guests, each with a preference \(A[k]\) meaning they want at most \(A[k]\) guests (including themselves) in their room.  
We must partition all guests into the **fewest** rooms, where in each room the total number of guests does not exceed **any** occupant’s preference.

---

### Step 2: Key Insight & Greedy Strategy  
1. **Sort** the array \(A\) in **ascending** order.  
2. Build rooms one by one, **filling** each with as many of the smallest-preference guests as possible.  
3. Maintain three variables:
   - `rooms` = number of completed rooms  
   - `inRoom` = count of guests in the current room  
   - `roomStartPref` = preference of the first guest in the current room  
4. Iterate through sorted \(A\):
   - **If** `inRoom === 0` (starting a new room):  
     - `roomStartPref = A[i]`  
     - `inRoom = 1`  
   - **Else if** `inRoom + 1 > roomStartPref` (adding the next guest would exceed the smallest preference):  
     - Close the current room: `rooms++`  
     - Start a new room with this guest:  
       - `roomStartPref = A[i]`  
       - `inRoom = 1`  
   - **Else**:  
     - `inRoom++` (guest fits)  
5. After the loop, **if** `inRoom > 0`, close the last room: `rooms++`.

This works because sorting ensures the first guest in each room has the **smallest** preference, and enforcing `inRoom ≤ roomStartPref` satisfies every occupant.

---

### Step 3: Examples

- **Example 1**  
  - Input: `A = [1, 1, 1, 1, 1]`  
  - Process: each guest’s preference is 1 → no two can share → **5** rooms.  
  - Output: `5`

- **Example 2**  
  - Input: `A = [2, 1, 4]`  
  - Sorted: `[1,2,4]`  
    - Room1: start with 1 → can hold only itself → close (rooms=1)  
    - Room2: start with 2, then add 4 → `inRoom=2 ≤ 2` → close at end  
  - **2** rooms.  
  - Output: `2`

- **Example 3**  
  - Input: `A = [2, 7, 2, 9, 8]`  
  - Sorted: `[2,2,7,8,9]`  
    - Room1: 2,2 → `inRoom=2 ≤ 2`, next 7 would make `inRoom=3>2` → close (rooms=1)  
    - Room2: 7,8,9 → all fit → close → **2** rooms.  
  - Output: `2`

- **Example 4**  
  - Input: `A = [7, 3, 1, 1, 4, 5, 4, 9]`  
  - Sorted: `[1,1,3,4,4,5,7,9]`  
    - Room1: 1 → close  
    - Room2: 1,3 → close  
    - Room3: 4,4,5 → `inRoom=3 ≤ 4`, next 7 would make 4>4 → close  
    - Room4: 7,9 → close  
  - **4** rooms.  
  - Output: `4`

---

```ts
function solution(A: number[]): number {
  A.sort((a, b) => a - b);

  let rooms = 0;
  let inRoom = 0;
  let roomStartPref = Infinity;

  for (const pref of A) {
    if (inRoom === 0) {
      // starting a new room
      roomStartPref = pref;
      inRoom = 1;
    } else if (inRoom + 1 > roomStartPref) {
      // next guest won't fit under the smallest preference
      rooms++;
      roomStartPref = pref;
      inRoom = 1;
    } else {
      inRoom++;
    }
  }

  if (inRoom > 0) rooms++;
  return rooms;
}
```
