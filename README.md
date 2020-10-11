# dcollect
**Demo object**
```js
let o = [{
        make: "audi",
        model: "r8",
        year: "2012"
    },
    {
        make: "audi",
        model: "rs5",
        year: "2013"
    },
    {
        make: "ford",
        model: "mustang",
        year: "2012"
    },
    {
        make: "ford",
        model: "fusion",
        year: "2015"
    },
    {
        make: "kia",
        model: "optima",
        year: "2012"
    }];
```
**where**    
`where(field, condition, target)`
```js
let collect = new dcollect(o);
let filter = collect.query().where("year", "=", "2012").get();
console.log(filter);
/* out
 data: [
    { make: 'audi', model: 'r8', year: '2012' },
    { make: 'ford', model: 'mustang', year: '2012' },
    { make: 'kia', model: 'optima', year: '2012' }
  ]
*/
```

**whereLike**    
`whereLike(field, target, i = false)`
```js
let collect = new dcollect(o);
let filter = collect.query().whereLike("make", "ford").get();
console.log(filter);
/* out
[
  { make: 'ford', model: 'mustang', year: '2012' },
  { make: 'ford', model: 'fusion', year: '2015' }
]
*/

let collect = new dcollect(o);
let filter = collect.query().whereLike("make", "Ford").get();
console.log(filter);
/* out
[]
*/

let collect = new dcollect(o);
let filter = collect.query().whereLike("make", "Ford", true).get();
console.log(filter);
/* out
[
  { make: 'ford', model: 'mustang', year: '2012' },
  { make: 'ford', model: 'fusion', year: '2015' }
]
*/

```

**whereIn**      
`whereIn(field, data)`
```js
let collect = new dcollect(o);
let filter = collect.query().whereIn("make", ["ford", "kia"]).get();
console.log(filter);
/* out
[
  { make: 'ford', model: 'mustang', year: '2012' },
  { make: 'ford', model: 'fusion', year: '2015' },
  { make: 'kia', model: 'optima', year: '2012' }
]
*/
```

**whereNotIn**      
`whereIn(field, data)`
```js
let collect = new dcollect(o);
let filter = collect.query().whereNotIn("make", ["ford", "kia"]).get();
console.log(filter);
/* out
[
  { make: 'audi', model: 'r8', year: '2012' },
  { make: 'audi', model: 'rs5', year: '2013' }
]
*/
```

**rawFilter**    
`rawFilter(callback)`
```js
let collect = new dcollect(o);
let filter = collect.query().rawFilter(function(item) {
  return item.model === "mustang";
}).get();
console.log(filter);
/* out
[ { make: 'ford', model: 'mustang', year: '2012' } ]
*/
```

**orderBy**    
`orderBy(field, sortType)`    
sortType : asc||desc
```js
let collect = new dcollect(o);
let filter = collect.query().orderBy("year", "asc").get();
console.log(filter);
/* out
[
  { make: 'audi', model: 'r8', year: '2012' },
  { make: 'ford', model: 'mustang', year: '2012' },
  { make: 'kia', model: 'optima', year: '2012' },
  { make: 'audi', model: 'rs5', year: '2013' },
  { make: 'ford', model: 'fusion', year: '2015' }
]
*/

let collect = new dcollect(o);
let filter = collect.query().orderBy("year", "desc").get();
console.log(filter);
/* out
[
  { make: 'ford', model: 'fusion', year: '2015' },
  { make: 'audi', model: 'rs5', year: '2013' },
  { make: 'audi', model: 'r8', year: '2012' },
  { make: 'ford', model: 'mustang', year: '2012' },
  { make: 'kia', model: 'optima', year: '2012' }
]
*/
```

**groupBy**     
`groupBy(field)`` 
```js
let collect = new dcollect(o);
let filter = collect.query().groupBy("make").get();
console.log(filter);
/* out
[
  audi: [
    { make: 'audi', model: 'r8', year: '2012' },
    { make: 'audi', model: 'rs5', year: '2013' }
  ],
  ford: [
    { make: 'ford', model: 'mustang', year: '2012' },
    { make: 'ford', model: 'fusion', year: '2015' }
  ],
  kia: [ { make: 'kia', model: 'optima', year: '2012' } ]
]
*/
```

**count**
```js
let collect = new dcollect(o);
let filter = collect.query().count();
console.log(filter);
/* out: 5 */
```
**sum**     
`sum(field)`
```js
let collect = new dcollect(o);
let filter = collect.query().sum("year");
console.log(filter);
/* out: 10064 */
```

## example
**chain use**

```js
let collect = new dcollect(o);
let filter = collect.query()
    .where("year", "=", "2012")
    .whereLike("make", "audi")
    .get();
console.log(filter);
/* out:
  [ { make: 'audi', model: 'r8', year: '2012' } ]
*/
```

```js
let collect = new dcollect(o);
let filter = collect.query()
    .where("year", "=", "2012")
    .orderBy("make", "asc")
    .get();
console.log(filter);
/* out:
[
  { make: 'audi', model: 'r8', year: '2012' },
  { make: 'ford', model: 'mustang', year: '2012' },
  { make: 'kia', model: 'optima', year: '2012' }
]
*/
```

