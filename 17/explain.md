### Part 1
Realized that division operators here are effectively binary right shift (>>). Thus all operations are simple binary operations.

### Part 2

It’s important to understand a loop in the program.

For every iteration:
- it makes some calculations (obviously, different for everyone’s input);
- prints the result;
- removes the last three bits from register A.

Thus, the last output will be derived from only three bits—top three bits of initial register A value.
The second last output will be derived from top 6 bits, then top 9 bits, etc.

Solution:
1. Remove the last operator from the program code. This will give you just the inner part of the loop. You will use it to calculate individual output values.
2. Look at all possible 3-bit combinations from the smallest to the largest (these are simply decimal numbers 0 to 7). Put every combination in register A, run the program for every combination, and see if the output matches the last number in the input program code.
3. For the first found combination of 3 bits, add 3 more bits to the right. Check all combinations of the newly added 3 bits, find the first combination for which the resulting 6 bits produce a second last number in your input.
4. By doing this recursively, you’ll find all the bits of the result value.

