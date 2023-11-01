# numpy-matrix-js

A numpy-like Matrix/Array module for Node JS and Browser JS



# Installation & Set Up


## NPM
In your terminal, type this command to install the module.

```
npm install numpy-matrix-js
```

After that, add this following code to the top of your file to import it.

```
const np = require('numpy-matrix-js')
```

After this, you can now use the functions available in the module.


## Browser

Add this following script tag to your html file.

```
<script type="module">
            import np from "https://unpkg.com/numpy-matrix-js@1.1.1/src/html/index.js"
</script>
```


# Documentation



## Initializing


```np.zeros(rows, cols)```

Creates a new matrix/2d array filled with 0
If you only give 1 parameter, it creates a 1d array.

Parameters   |   What it is   | Required
-------------|----------------|----------
rows         |  number of rows in your array | yes
cols         |  number of columns in your array | no


```np.random.rand(rows, cols)```

Creates a new matrix/2d array of random values

Parameters   |   What it is   | Required
-------------|----------------|----------
rows         |  number of rows in your array | yes
cols         |  number of columns in your array | yes

## Math

```np.matmul(a, b)```

Multiplies 2 matrices together and returns the result.

Note: Like linear algebra, the columns of the first matrix must match the rows of the second matrix.

Parameters    | What it is    | Required
--------------|---------------|----------
a             | First matrix  | Yes
b             | Second matrix | Yes


```np.add(a,b)```

Adds 2 matrices together and returns the result.

Note: Like linear algebra, the dimensions of both matrices needs to match.

Parameters   | What it is    | Required
-------------|---------------|---------
a            | First matrix  | Yes
b            | Second matrix | Yes


```np.subtract(a,b)```

Subtracts 2 matrices and returns the result.

Note: Like linear algebra, the dimensions of both matrices needs to match.

Parameters   | What it is    | Required
-------------|---------------|---------
a            | First matrix  | Yes
b            | Second matrix | Yes

```np.transpose(a)```

Returns the transposed version of the matrix "a".


Parameters   | What it is    | Required
-------------|---------------|---------
a            | Input matrix which needs to be transposed  | Yes





## Built-in Math Functions

### Sigmoid

```np.sigmoid(x)```

Returns the sigmoid value of whatever "x" value you input

### Dsigmoid (Derivative of sigmoid)

```np.dsigmoid(x)```

Returns the dsigmoid value of whatever "x" value you input

### Tanh (Hyperbolic Tangent)

```np.tanh(x)```

Returns the hyperbolic tangent value of whatever "x" value you input

### Softmax

```np.softmax(inputs)```

Applies the softmax function to the inputs array and returns the new result as an array.

### Relu

```np.relu(x)```

Applies the relu function to the value "x" and returns result.

### Leaky Relu

```np.leakyrelu(x)```

Applies the leaky relu function to the value "x" and returns the result.


## Debug

### Info

```
let arr = [[0,0,0],[0,0,0]]
arr.info()
```

Automatically logs the dimensions of the array that you invoke the function on.


### Table

```
let arr = [[0,0,0],[0,0,0]]
arr.table()
```

Automatically prints the array to the console in a neat format

### HasNaN

```
let arr = [[0,0,0],[0,0,0]]
arr.hasNaN()
```

Checks if any of the values of the array are "NaN". If there are values with "NaN", it prints "true" to the console.




# Versions

Latest Versions: 1.1.3

Stable Versions:

- 1.1.3: Fixed debug glitches. Added relu functions
- 1.1.1: Working browser support via static import
