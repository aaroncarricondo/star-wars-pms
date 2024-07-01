# Star Wars - Planet Management System

[Preview](https://starwarspms.web.app/)

## Setup and run
In order to execute the application:
1. You'll need to [install](https://bun.sh/docs/installation) bun in your system.
2. In the root folder run `` bun install ``.
3. Finally execute the application with `` bun dev ``.

## Unit tests
In order to test the application:
1. You'll need to [install](https://bun.sh/docs/installation) bun in your system.
2. In the root folder run `` bun install ``.
3. Finally execute the tests with `` bun test ``.

## End-to-end test
*To be implemented*


## Considerations
### Packages
The packages for this project have been selected to ensure minimum package dependency, while fastening development.

### Forms
Inferred from the data retrieved from the GraphQL API, the following restrictions where applied for the planet creation/edition form:
1. Name -> Required.
2. Diameter -> Optional.
3. Climates -> Required. Options are retrieved from all planets climates.
4. Terrains -> Required. Options are retrieved from all planets terrains.
5. Population -> Optional.
