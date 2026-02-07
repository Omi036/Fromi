# Getting Started

Clone the repo and setup the dependencies:
```bash
git clone https://github.com/Omi036/Fromi
cd Fromi
npm run setup
```
For starting the project:
```bash
npm run start
```
If you need to reset logs and dist folders you can use
```bash
npm run purge
```

## Philosophy

In this framework:

- Managers handle the operations (e.g., logging, database access, etc.).

- Models define data structures and provide an interface for interacting with them.

- The Main Library contains utility functions and providers that Models or Managers may use.

Models allow developers to interact with data like `User.createOne({...})` or `User.findOne({...})` without worrying about the details of database queries or storage management.

By keeping this separation:

- Business logic stays in Managers,

- Data structure definitions stay in Models,

- The codebase remains modular and maintainable.