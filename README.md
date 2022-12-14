# Image Processing API

This project aims to give a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project can serves two purposes: to prepare for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects.

For this project, refactor and test as much as possible while you are building. Since you are using TypeScript and an unfamiliar library, it is sometimes easier to write and build in plain JS to see what your functions return; remember your submission needs to be in TypeScript. As your skills improve, typing in TypeScript will feel more intuitive. Make sure to remove any debugging code from your final submission.

## Getting Started

1. **Initialize your project.**
Install the project dependencies by running: `npm install`
   The dependencies for this project include Express, Sharp, TypeScript, Jasmine, Eslint, and Prettier and their corresponding typescript language type definitions.

2. **Script commands** 
- Servers
> Dev server: `npm start`

> Build server: `npm run serve`
- Testing: `npm test --silent`
- Formatting & Linting: `npm run lint --silent`
3. **Endpoints**
Images are accessible with `http://localhost:3000/api/image?filename=<filename>&width=<width>&height=<height>`.
The `width` and `height` query strings are optional.
## License

[License](LICENSE.txt)
