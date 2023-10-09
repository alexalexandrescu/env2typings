# env2typings

A CLI utility to generate TypeScript typings for environment variables.

## Introduction

env2typings is a simple command-line utility that automates the process of generating TypeScript type declarations based on your .env files. This ensures type safety and autocompletion for process environment variables in TypeScript projects.

## Installation

To install env2typings globally:

```bash
npm install -g env2typings
```

## Usage

Basic Usage
Run the tool in a directory that contains a .env file:

```bash
env2typings
```

By default, this will create a process-env.d.ts file in the same directory.

### Custom .env File and Output Path
To specify a custom path for the .env file and the output .d.ts file:

```bash
env2typings --env-file=path/to/your/.env --output=path/to/output.d.ts
```

### Dry Run
To see the generated type declarations without writing to a file:

```bash
env2typings --dry-run
```

## Local Development

If you'd like to contribute or simply test out the utility in a local environment, follow these steps:

1. Clone the Repository:
```bash
git clone https://github.com/alexalexandrescu/env2typings.git
cd env2typings
```

2. Install Dependencies:
   Before you can run the utility locally, you need to install its dependencies:

```bash
npm install
```
3. Link the Package:
   To use the command-line utility locally, you'll need to link it:

```bash
npm link
```

After running this command, you can use the env2typings command globally.

## API

### CLI Arguments
- `--env-file`: (Optional) Path to your `.env` file. Defaults to `.env` if it exists in the current directory.
- `--output`: (Optional) Path for the output `.d.ts` file. Defaults to `process-env.d.ts`.
- `--dry-run`: (Optional) Prints the generated type declarations to the console without writing to a file.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Ensure to run tests with:

```bash
npm test
```

## License

MIT