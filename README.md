# Ngx-react-query

[react-query](https://tanstack.com/query) for Angular.

## Examples
[https://andrey99z.github.io/query-examples](https://andrey99z.github.io/query-examples)

## Instructions

### Query without parameters
```ts
import { query } from "ngx-react-query";

users$ = query<User[]>(['users-basic'], () => this.api.getUsers());
```

## Contributing

All contributions welcome!
