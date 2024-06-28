# Star Wars - Planet Management System

## Setup and run
In order to execute the application:
1. You'll need to [install](https://bun.sh/docs/installation) bun in your system.
2. In the root folder run `` bun install ``.
3. Finally execute the application with `` bun dev ``.


## Considerations
Inferred from the data retrieved from the GraphQL API, the following restrictions where applied for the planet creation (form):
1. Name -> Required.
2. Diameter -> Optional.
3. Climates -> Required, with unknown as default value, can't be cleared.
4. Terrains -> Required, with unknown as default value, can't be cleared.
5. Population -> Optional.
