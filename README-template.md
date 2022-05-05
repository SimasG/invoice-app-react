\*\*\*CONSIDERATIONS\*\*\*

1. EDIT INVOICE ROUTING
   Should I open it via routing or nested components?

Routing:
GOOD: More proper/uniform -> would follow app's underlying routing structure
BAD: More difficult to implement (conditional rendering not working as expected)
BAD: Multiple shared state requirements

Nested Components:
GOOD: Easy to implement
GOOD: No need to share state across multiple non-nested components
BAD: Not as proper/uniform

**_QUESTIONS_**

1. How properly am I using uuids?
2. How to include more complex logic in state, like math (e.g. if qty = 2 & price = 300, then total should automatically be 2 x 300 = 600)
3. How to pre-fill invoice data in the EditInvoiceModal? Curveball: pre-filling the data for mapped items.

// useEffect(() => {
// itemList.forEach((item) => {
// let totalPrice = parseInt(item.qty) \* parseInt(item.price);
// setTotal({ total: totalPrice });
// });
// }, [itemList]);

// console.log(total);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
