# College Exam Seat Planner

A web application that intelligently allocates college exam seats. It prioritizes using the **minimum number of classrooms** while giving preference to **lower-floor classrooms**.

## Features

- **Add Classroom**: Easily add classroom details (Room ID, Capacity, Floor No, Washroom proximity).
- **View Classrooms**: List of all available rooms with delete functionality.
- **Smart Allocation**: 
  - Uses a Greedy Algorithm to find the optimal classroom distribution.
  - Sorts by **Floor Ascending** (Priority 1) and **Capacity Descending** (Priority 2).
- **Data Persistence**: Uses LocalStorage to save your classroom data automatically.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Language**: TypeScript

## Getting Started

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd seat-planner
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

This project is ready to be deployed on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Deploy! (No environment variables needed).
