
# Tech Hub

## Description

This project is a web application built with React and Laravel. It features a table component with search and pagination functionality, and it includes pages for viewing posts.

## Live Demo

You can view the live project at: [https://inertia-initial.onrender.com/](https://inertia-initial.onrender.com/)

## Prerequisites

Before running the project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (includes npm)
- [Composer](https://getcomposer.org/)
- [Docker](https://www.docker.com/) (if you plan to use Docker)

## Getting Started

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### Setting Up the Backend

1.  Navigate to the Laravel project directory.
    
2.  Install the PHP dependencies:
    
    ```bash
    composer install 
    ```
    
3.  Copy the example environment file and update the environment variables:
    ```bash
    cp .env.example .env
    ```
    
4.  Generate the application key:
	```bash
    php artisan key:generate 
    ```
    
5.  Run the database migrations (ensure your database is configured in `.env`):
	```bash
	php artisan migrate
	```
6.  Start the Laravel development server:
    ```bash
	php artisan serve
	```

### Setting Up the Frontend

1.  Navigate to the React project directory.
    
2.  Install the JavaScript dependencies:
    ```bash
	npm install
	```
    
3.  Start the React development server:
	```bash
	npm start
	```
### Running with Docker

To run the project using Docker, follow these steps:

1.  Pull the Docker image:
	```bash
    docker pull nischalraii/inertia
    ```
3.  Run the Docker container:
	```bash
	docker run -p 8000:8000 nischalraii/inertia
	```

    
    The application should now be accessible at `http://localhost:8000`.
    
4.  To view the Docker image, visit: [Docker Hub](https://hub.docker.com/r/nischalraii/inertia/tags).
    

## Usage

-   **Table Component:** The table component includes search functionality for filtering items by title and category. It also supports pagination.
-   **Viewing Posts:** Click on a post title in the table to navigate to the detailed view of that post.

## Contributing

If you wish to contribute to this project, please follow the standard fork-and-pull request workflow:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes.
4.  Push your branch to your forked repository.
5.  Submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


