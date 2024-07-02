# CoinTrackX

![License](https://img.shields.io/github/license/FarzadMohtasham/CoinTrackX)
![Stars](https://img.shields.io/github/stars/FarzadMohtasham/CoinTrackX)
![Issues](https://img.shields.io/github/issues/FarzadMohtasham/CoinTrackX)

CoinTrackX is a simple and open-source platform for tracking your coins profit/loss, made with React.js and TypeScript.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to CoinTrackX! This project is designed to help you track the profit and loss of your cryptocurrency investments. It offers a clean and intuitive interface built with modern web technologies.

## Features

- Track multiple cryptocurrencies
- View profit/loss in real-time
- Simple and intuitive UI
- Secure and private

## Installation

To get started with CoinTrackX, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/FarzadMohtasham/CoinTrackX.git
    cd CoinTrackX
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Usage

Once the server is running, open your browser and navigate to `http://localhost:3000`. Here, you can start tracking your cryptocurrency investments.

## Tech Stack

- **Frontend:**
  - React
  - Zustand
  - Styled-Components
  - Recharts
  - Chakra UI

- **Backend:**
  - Supabase

- **Utilities:**
  - TanStack Query
  - Axios
  - React Hook Form
  - React Hot Toast

- **Build Tools:**
  - TypeScript
  - Vite

## Project Structure

The project structure is as follows:
├── public
│ ├── index.html
│ └── ...
├── src
│ ├── components
│ │ └── YourComponent.tsx
│ ├── hooks
│ ├── pages
│ ├── services
│ ├── store
│ ├── styles
│ ├── App.tsx
│ ├── main.tsx
│ └── ...
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts


## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure to update tests as appropriate.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to explore, use, and contribute to CoinTrackX! Happy coding!
