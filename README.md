# MKA-DEV-PRO-MAX ✨

## Description 🚀

This project is a visually stunning and highly interactive personal portfolio application built with Expo, React Native, and TypeScript. It showcases the developer's professional profile, skills, experiences, and projects through a unique 'Quantum Matrix' theme, employing intricate animations and a futuristic UI.

## Table of Contents 📜

- [Project Title & Badges](#project-title--badges)
- [Description](#description-🚀)
- [Table of Contents](#table-of-contents-📜)
- [Features](#features-🌟)
- [Tech Stack](#tech-stack-💻)
- [Installation](#installation--setup-⚙️)
- [Usage](#usage-💡)
- [Project Structure](#project-structure-📂)
- [Contributing](#contributing-🤝)
- [License](#license-📄)
- [Important Links](#important-links-🔗)
- [Footer](#footer-📝)

## Project Title & Badges 🏆

# MKA-DEV-PRO-MAX

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Dev-moe-kyawaung/MKA-DEV-PRO-MAX/blob/main/LICENSE)
[![Expo Version](https://img.shields.io/badge/Expo-~57.0.14-informational)](https://docs.expo.dev/)
[![React Native Version](https://img.shields.io/badge/React%20Native-0.86.2-brightgreen)](https://reactnative.dev/)

## Features 🌟

- **Interactive Quantum Matrix UI:** A unique and immersive visual theme with futuristic animations and effects.
- **Animated Backgrounds:** Dynamic matrix rain, particle fields, and quantum grids create an engaging environment.
- **Personalized Profile:** Detailed display of the developer's bio, experience, certifications, and contact information.
- **Skill Visualization:** Interactive charts and meters to showcase proficiency levels and entanglement across various skills.
- **Quantum Node Graph:** A visual representation of project architecture and system interdependencies.
- **AI Orb Interaction:** An animated AI orb that reacts to user input and triggers particle bursts, visualizing architectural decisions.
- **Cross-Platform Compatibility:** Built with Expo, ensuring functionality on both iOS and Android.
- **Smooth Navigation:** Intuitive bottom tab navigation for easy access to different sections.
- **Dynamic Content Loading:** Uses `react-native-reanimated` for smooth animations and transitions.
- **Contact Form & Social Links:** Integrated form for direct messaging and links to the developer's social profiles.

## Tech Stack 💻

- **Languages:** TypeScript, JSON, Markdown
- **Frameworks/Libraries:** React Native, Expo, React Navigation, React Native Reanimated, Expo Linear Gradient, Expo Vector Icons, React Native Gesture Handler
- **Environment:** Node.js
- **Build Tools:** Expo CLI

## Installation & Setup ⚙️

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dev-moe-kyawaung/MKA-DEV-PRO-MAX.git
    cd MKA-DEV-PRO-MAX
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the application:**
    - For development server:
      ```bash
      npm start
      # or
      yarn start
      ```
    - To run on Android emulator/device:
      ```bash
      npm run android
      # or
      yarn android
      ```
    - To run on iOS simulator/device:
      ```bash
      npm run ios
      # or
      yarn ios
      ```
    - To run on the web:
      ```bash
      npm run web
      # or
      yarn web
      ```

## Usage 💡

This application serves as a personal portfolio and a demonstration of advanced React Native and Expo capabilities. It is designed to be run on mobile devices (iOS/Android) or in a web browser.

- **Navigation:** Use the bottom tab bar to switch between different sections: Matrix (Home), Nodes, Skills, About, and Connect.
- **Interactions:** Tap on elements like the AI Orb or nodes in the graph to trigger animations and explore project details.
- **Contact:** Use the 'Connect' screen to send a message directly via email or explore social media links.

## Project Structure 📂

```
 MKA-DEV-PRO-MAX/
 ├── .claude/
 │   └── settings.json
 ├── components/
 │   ├── AIOrb.tsx
 │   ├── MatrixRain.tsx
 │   ├── ParticleField.tsx
 │   ├── QuantumGraph.tsx
 │   ├── QuantumGrid.tsx
 │   ├── QuantumScene.tsx
 │   └── QuantumUI.tsx
 ├── screens/
 │   ├── AboutScreen.tsx
 │   ├── ConnectScreen.tsx
 │   ├── HomeScreen.tsx
 │   ├── NodesScreen.tsx
 │   └── SkillsScreen.tsx
 ├── lib/
 │   ├── data.ts
 │   └── quantum.ts
 ├── node_modules/
 ├── App.tsx
 ├── AGENTS.md
 ├── CLAUDE.md
 ├── index.ts
 ├── LICENSE
 ├── README.md
 ├── tsconfig.json
 ├── package.json
 ├── eas.json
 └── vercel.json
```

## Installation ⚙️

1.  **Prerequisites:**
    *   Node.js and npm (or Yarn)
    *   Expo CLI installed globally (`npm install -g expo-cli`)

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dev-moe-kyawaung/MKA-DEV-PRO-MAX.git
    cd MKA-DEV-PRO-MAX
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage 💡

Once installed, you can run the application using Expo CLI:

- **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

This will launch the Expo Go app on your emulator/device or open it in a web browser, allowing you to interact with the portfolio.

### Key Features in Action 🚀

- **Interactive UI:** Navigate through different sections using the bottom tab bar.
- **Animated Backgrounds:** Experience the matrix rain, particle fields, and quantum grids that react dynamically.
- **Profile Exploration:** View detailed information about the developer's background, skills, and experience.
- **Graph Visualization:** Interact with the Quantum Node Graph on the 'Nodes' screen to understand project architecture.
- **AI Orb Interaction:** Tap the AI Orb on the 'Home' and 'Nodes' screens to trigger particle bursts and visualize architectural decisions.

## Project Structure 📂

-   **`components/`**: Contains reusable UI components and visual elements like `AIOrb`, `QuantumGraph`, `MatrixRain`, etc.
-   **`screens/`**: Houses the different views/pages of the application (`HomeScreen`, `AboutScreen`, `SkillsScreen`, etc.).
-   **`lib/`**: Includes utility functions, data models, and design tokens (`quantum.ts`, `data.ts`).
-   **`App.tsx`**: The main application entry point, setting up navigation.
-   **`index.ts`**: Registers the root component for Expo.
-   **`package.json`**: Manages project dependencies and scripts.
-   **`tsconfig.json`**: TypeScript configuration.

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the existing style and includes appropriate tests if applicable.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Important Links 🔗

-   **Live Demo (Expo):** `https://www.designarena.ai/preview/mobile?expo=exp%3A%2F%2Fu.expo.dev%2F552f0665-e30d-4f11-9ea9-97bc22a22809%2Fgroup%2F46a2a6f8-958b-4dff-bfe7-992b1449466c&web=https%3A%2F%2F12vxcd-chkc5fum0-arcadawebapps3.vercel.app`
-   **Developer's GitHub:** `https://github.com/Dev-moe-kyawaung`
-   **Developer's Portfolio Website:** `https://dev-moe-kyawaung.github.io/`

## Footer 📝

© 2026 MKA · PRO | [MKA-DEV-PRO-MAX](https://github.com/Dev-moe-kyawaung/MKA-DEV-PRO-MAX)

Built with ❤️ by Moe Kyaw Aung.

--- Feel free to fork, like, and star the repository! ⭐ Issues and suggestions are always welcome. 💖


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**