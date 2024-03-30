# Cat Gallery React App

## Overview

Welcome to the Cat Gallery React App! This application showcases a collection of adorable cat images fetched from [The Cat API](https://thecatapi.com/). It's a fun and engaging way to explore the world of feline photography.

## Features

-   Fetches and displays cat images from The Cat API.
-   Responsive design for a great viewing experience on all devices.
-   Easy-to-use interface for browsing through the gallery.

## Local Development Setup

### Prerequisites

-   Node.js (v14.0.0 or later)
-   npm (v6.14.0 or later)

### Installation

1. Clone the repository:

```
git@github.com:nwesber/react-cat-gallery.git
```

2. Navigate to the project directory:

```
cd react-cat-gallery
```

3. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm run start
```

The application will be available at `http://localhost:3000`.

## Third-Party APIs

-   **The Cat API**: This application uses [The Cat API](https://thecatapi.com/) to fetch cat images. You'll need to sign up for an API key to use the service.

## Production Deployment Steps

### Prerequisites

-   A hosting service (e.g., Netlify, Vercel, AWS S3, Google Cloud Run)
-   A domain name (optional)

### Deployment

1. **Build the Application**:

```
npm run build
```

This command creates a `build` directory with a production build of your app.

2. **Deploy to Your Hosting Service**:
    - **AWS S3**:
        - Create an S3 bucket in the AWS Management Console.
        - Enable static website hosting for the bucket.
        - Upload the contents of the `build` directory to the bucket.
        - Set the bucket policy to make the website publicly accessible.
        - Configure your domain to point to the S3 bucket's website endpoint.
    - **Google Cloud Run**:
        - Build your container image:
            - `gcloud builds submit --tag gcr.io/your-project-id/cat-gallery-react`
        - Deploy the container to Cloud Run:
            - `gcloud run deploy --image gcr.io/your-project-id/cat-gallery-react --platform managed`
        - Follow the instructions to map a custom domain to your Cloud Run service.
3. **Configure Your Domain (Optional)**:
    - Follow the instructions provided by your hosting service to configure your domain.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before getting started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out to us at `contact@example.com`.

---

**Happy browsing!**
