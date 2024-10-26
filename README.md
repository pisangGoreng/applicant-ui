# Applicants Tracker

[Watch the video](https://drive.google.com/file/d/1BehhtIYNfIYKRsiObPubFx7xiFBx7xjX/view)

## Features

- Role & Status Filtering

  Filter applicants by their role (e.g., Developer, Designer) and status (e.g., Pending, Approved, Rejected).

- Search Functionality

  Easily search for applicants by name or keywords.

- Pagination

  Navigate through large sets of applicants using paginated views.

- Add New Applicants

  Create and store new applicants with relevant details through a simple form.

## Installation

1. Clone the Repository:

```bash
git clone ...
cd applicant-ui
```

2. Install Dependencies:

```bash
npm install
```

3. Set Environment Variables:
   Create a .env.local file in the root directory and add your configuration

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

4. Run the Application:

```bash
npm run dev
```

The application will be running on http://localhost:3000.

## Usage/Examples

1. Home Page:
   Displays a list of applicants with options for:

- Filtering by role or status.
- Searching using the search bar.
- Pagination to navigate between pages.

2. Add New Applicant:

- Click the "Add Applicant" button.
- Fill in the form with applicant details (e.g., Name, Role, Status).
- Submit to add the new applicant to the system

## API Reference

#### Get all applicant

```http
  GET /applicants
```

Fetch a list of applicants with optional filtering, search, and pagination.

#### Get all applicant

```http
  POST /applicants
```

Add a new applicant to the database.

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `email`         | `string` | **Required & Unique**             |
| `name`          | `string` | **Required**.                     |
| `phoneNumber`   | `string` | **Required & Unique**.            |
| `yoe`           | `number` | **Required**. Years of experience |
| `location`      | `string` | **Required**. Country name        |
| `resumeLink`    | `string` | **Required**. URL link the CV     |
| `applicantRole` | `number` | **Required**                      |

#### Get all applicant status

```http
  GET /applicants-status
```

Fetch a list of applicants status

```http
  GET /applicants-role
```

Fetch a list of applicants role

## Tech Stack

**Client:** Next, Redux, Redux toolkit, Shadcn, TailwindCSS
