# Testing with Jest
Fromi comes with [Jest](https://jestjs.io/) setted up.  
Jest allows testing our app and making test cases.  

<br/>  

## Creating a test
For creating a test, we should create a `src/tests/myTest.test.ts`.  
For instance, lets check that our `hasFields()` function still works correctly!

```{code-block} js
:caption: /src/tests/sample.test.ts
import { hasFields } from "../lib/utils/fields"

describe("A Sample Test", () => {
    test("hasFields should return true with sample object", () => {
        const myObject = {name: "John", surname:"Pork"}
        const myObjectVerified = hasFields(myObject, ["name", "surname"])

        expect(myObjectVerified).toBe(true)
    })
})
```

In this test, we import the function, and we pass it a test case.  
In this case, we are testing that `hasFields should return true with sample object`.  
Finally, we get the output and compare it with what is expected to happen, in our case, we were expecting that the output were true.

<br/>  

## Start testing
Now that we have a test, we can probe them with:  
```npm test```  
Which will result in an output similar to:
```
 PASS  src/tests/sample.test.ts (13.617 s)
  A Sample Test
    √ hasFields should return true with sample object (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        16.467 s
```

<br/>  

For more info check the [official jest documentation](https://jestjs.io/)