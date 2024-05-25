<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">rxg-todos</h3>
  <p align="center">
    Manage your tasks for easily! 
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#testing">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A software that helps to manage and organize your day easily.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Java](https://www.java.com/en/)
- [Springboot](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [shadcnUI](https://ui.shadcn.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You need to install

1. [jdk v17](https://www.oracle.com/in/java/technologies/downloads/#java17)
2. [maven v3.9](https://maven.apache.org/download.cgi)
3. [Node v20](https://nodejs.org/en/)
4. [pnpm](https://pnpm.io/)
5. [Docker](https://docs.docker.com/get-docker/)
6. [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the and get into repo

   ```sh
   git clone https://github.com/reenphygeorge/rxg-todos.git
   ```
   
   ```sh
   cd rxg-todos/
   ```

2. Start database with docker.

   > Make sure docker daemon is running.

   ```sh
   docker compose up
   ```

3. Copy the `.env.example` for each applications to `.env` in the same directory and fill the values required

4. Start the api dev server

   ```sh
   cd api/
   ```
   ```sh
   mvn clean install
   ```
   ```sh
   mvn spring-boot:run
   ```

5. Start the web application dev server and open `http://localhost:3000`

   ```sh
   cd ui/
   ```
   ```sh
   pnpm install
   ```
   ```sh
   pnpm dev
   ```
   
<p align="right">(<a href="#top">back to top</a>)</p>

### Testing

> Make sure database is running in docker.

   ```sh
   cd api/
   ```
   
   ```sh
   mvn test
   ```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!
