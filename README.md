# Front-End Technical Test

Welcome to CodeWalnut's front-end technical test using React and the [PokeAPI](https://pokeapi.co/)! The PokeAPI provides an extensive REST and GraphQL API for fetching Pokémon data. In this test, you will build a Pokémon app that utilizes the PokeAPI, and you can choose from different levels of difficulty depending on your experience.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/CW-Codewalnut/codewalnut-front-end-tech-test.git
```

### 2. Install Dependencies

We are using `pnpm` for package management. If you haven't installed `pnpm` yet, you can install it globally by running:

```bash
npm install -g pnpm
```

Once you have `pnpm` installed, run:

```bash
pnpm install
```

### 3. Available Styling Options

The project is set up with **Tailwind CSS** as the default styling solution. However, you can opt to use any of the following:

- **Tailwind (default)**: Already configured in `src/app/globals.css`.
- **CSS**: You can create and use custom CSS styles by modifying or adding to `src/app/globals.css`.
- **Sass**: A basic Sass configuration is already in place. Add your styles to `src/styles/globals.scss`.

You are free to use any styling approach you prefer, these are just the options set up for you already in this project.

### 4. Running the App

To start the development server, run:

```bash
pnpm dev
```

This will launch the app in development mode at [http://localhost:3000](http://localhost:3000).

## Challenge Tiers

### Junior Level

#### Task:

Build a simple **Pokémon search app** that allows users to search for Pokémon by name or ID and display their details.

#### Requirements:

- Use the PokeAPI to fetch Pokémon data.
- Implement a search bar to search by Pokémon name or ID.
- Display the Pokémon’s name, image, and type(s) when a search is performed.
- Ensure the app is **mobile responsive**.

#### Bonus Points:

- Add error handling for invalid searches.
- Display a loading indicator while fetching data.

---

### Mid Level

#### Task:

Create a **Pokémon explorer app** that allows users to browse and view detailed information on Pokémon with pagination.

#### Requirements:

- Fetch and display a list of Pokémon with pagination (using `limit` and `offset` query parameters).
- Implement client-side routing to display individual Pokémon details on a separate page or modal.
- Include Pokémon name, image, type(s), abilities, and stats (HP, Attack, etc.).
- Ensure the app is **fully responsive**.

#### Bonus Points:

- Add sorting and filtering by name, type, or base experience.
- Implement search functionality that filters Pokémon by name.

---

### Senior Level

#### Task:

Build an advanced **Pokémon team management app** that allows users to create and manage a team of Pokémon.

#### Requirements:

- Implement **authentication** (mock authentication is sufficient).
- Allow users to add Pokémon to a team (max 6 per team) and view detailed stats for each team member.
- Display evolution chain, stats, abilities, and moves for each Pokémon.
- Allow users to save and manage multiple teams.
- Implement **client-side routing** using React Router.
- Use a state management solution like **Context API** or **Redux**.

#### Bonus Points:

- Add drag-and-drop functionality to reorder Pokémon in the team.
- Include unit and integration testing.
- Use a data-fetching library like **React Query** for caching and efficient API calls.
- Implement **Dark Mode** and **Light Mode** toggle.

---

## Submission Guidelines

- Fork this repository and submit your solution via a **GitHub repository** link (preferred) or a **zip file**.
- Make sure to include a **README** in your submission with:
  - Setup instructions.
  - Explanation of your approach.
  - Any challenges or trade-offs you encountered.

---

## Evaluation Criteria

- **Code Quality**: We will evaluate your use of clean code practices, meaningful variable names, and comments where necessary.
- **Responsiveness**: The app should work well on both mobile and desktop devices.
- **Functionality**: Ensure that all required features work as expected.
- **Best Practices**: We value the use of best practices in React development, such as proper naming, state management, and component organization.
- **Testing**: Testing is a big part of modern development, so will value the use of testing in your solution.
- **Creativity**: Feel free to add any additional features or enhance the design beyond the requirements.
- **Willingness**: We want people who go the extra mile in everything they do.
