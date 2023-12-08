# gregbak.com

Welcome to the repository for my [portfolio website](https://gregbak.com)! This project showcases my skills and projects as a senior software engineer and technical artist.
Thank you for checking out my portfolio website! If you have any questions or suggestions, feel free to reach out to me directly! 🚀

<details>
<summary>Table of Contents</summary>
1. Technologies Used
2. Project Structure
3. License
</details>

## Main Technologies
* TypeScript + React
* Next.js
* DatoCMS & GraphQL
* Three.js & three fiber
* lucide icons

## Project Structure

The project structure follows the conventions of a typical Next.js application with a new `app router` approach:
* `app/` - routes & views. almost every entry is wrapped in `[locale]` slug, as a way to work around broken i18n in Next.js@14.0.3 
* `assets/` - custom SVG icons wrapped in a React component for better customisation.
* `components/` - React components. I'm not a fan of putting components inside of `app/` or `pages/` as going through each folder gets messy 
* `public/` - public assets for next.js. 
* `queries/` - graphQL queries for routes and page configs
* `sections/` - view and page sections. It's my habit to put composed components separately, but in a _normal_ project the'd live in an `app/` or `pages/` dir
* `theme/` - style init & JoyUI theme variables. Added a custom `secondary` color that will be used in later development :) 
* `types/` - some custom type declarations and empty declarations to mute TypeScript warnings that didn't make sense.
* `util/` - utility functions & hooks (that i'll put into a separate `hooks/` dir later)

* `tests/` - there are no tests, as you can see. I decided the priority is to release the website and tests will be added later. At work I write tests alongside the code, the pipeline is set up, I also create git `pre-commit` hooks etc. 

## License
All rights reserved :)