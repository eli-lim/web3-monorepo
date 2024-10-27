# Web3 Full-stack Mono-repo Example

![image](./README-dev.gif)

This is a full-stack mono-repo example for web3 projects.

It includes a NextJS front-end, a Node.js back-end, and a foundry subproject to maintain smart contracts.

The smart contracts produce Typescript bindings for use in both the frontend and backend,
allowing for **type safety across the entire stack**.

The frontend and backend are set up to communicate with each other using tRPC.

## Setting up
```shell
# Install foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Use the project's node version
nvm install 
nvm use

# Use the project's package manager
corepack enable

# Install dependencies
pnpm install

# Start the whole stack
# Give it a moment while it downloads a postgres container image and spins it up
pnpm dev
```

> [!NOTE]
> Notice that you don't have to run any build steps.
> The repo doesn't use any `postinstall` scripts either.
> Everything is handled robustly by Turbo.

---

## How it works

### Turbo-charged workspaces

[Turborepo](https://turbo.build/) is used to manage task dependencies in a highly performant way. It does so by
[parallelizing tasks](https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks) and
[caching](https://turbo.build/repo/docs/crafting-your-repository/caching)
where appropriate. The onus is on the developer to define the
dependencies between tasks and whether their respective outputs can be cached.

This drastically improves DX by automating steps in the development process that would otherwise
be manual.

1. Code generation + compilation:
   ```mermaid
   graph LR
       c[contracts .sol] --generate--> a[artifacts .json]
       a --generate--> ts[typescript\nbindings]
       ts --imported--> backend
       ts --imported--> frontend
       backend --generate--> sdk
       sdk --imported--> frontend
   ```
2. Full-stack development:
   ```mermaid
   graph LR
     s((dev)) --> c
     c[code generation + compilation] --> backend[start:backend]
     c --> frontend[start:frontend]
     c --> chain[start:testing-chain]
     chain --> deploy[deploy:contracts]
     backend --> e((ready))
     frontend --> e
     deploy --> e
   ```

Traditionally, one would have to either:

1. Manually run each step during build / development - painful and time-consuming
2. Write scripts (imperatively) to automate the process - error-prone, no built-in caching

Turbo allows us to declaratively define the dependencies between tasks and let it handle the rest.

### turbo watch

This entire process can be run in `watch` mode, which means any changes to any source code will
trigger the necessary downstream tasks to be re-run.
