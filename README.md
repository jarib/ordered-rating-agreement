# ordered-rating-agreement

Calculate the agreement/polarization of ordered rating scales using Cees van der Eijk's (2001) measure of agreement A.

### Usage:

Pass in frequency of each category. Get the agreement between -1 and 1;

```javascript
const { agreement } = require('agreement');

agreement([10, 0, 0, 0, 0, 0, 0]);
// => 1

agreement([10, 10, 10, 10, 10, 10, 10]);
// => 0

agreement([30, 40, 210, 130, 530, 50, 10]);
// => 0.61
```
