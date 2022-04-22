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
