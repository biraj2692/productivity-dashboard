# Productivity Dashboard

A clean, modern, and interactive dashboard designed to help users track their productivity, manage tasks, and visualize their workflow metrics.

## ✨ Features

-   **Task Management:** Add, edit, delete, and mark tasks as complete.
-   **Pomodoro Timer:** A built-in timer to help you practice the Pomodoro technique for focused work sessions.
-   **Habit Tracker:** Visually track your daily habits and build streaks.
-   **Local Storage:** Your data is persisted in your browser's local storage, so it remains until you clear it.
-   **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.

## 🚀 Live Demo

Check out the live application here: https://biraj2692.github.io/productivity-dashboard/

## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
-   **Charts:** [Chart.js](https://www.chartjs.org/)
-   **Icons:** [Font Awesome](https://fontawesome.com/) or [Boxicons](https://boxicons.com/)
-   **Fonts:** [Google Fonts](https://fonts.google.com/)
-   **Deployment:** Vercel / Netlify / GitHub Pages

## 📦 Installation & Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/biraj2692/productivity-dashboard.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd productivity-dashboard
    ```
3.  **Open the project:**
    *   Since this is a static site, you can simply open the `index.html` file in your web browser.
    *   **For a better development experience,** use a local server. If you have Python installed:
        ```bash
        # For Python 3.x
        python -m http.server 8000
        ```
    *   If you have Node.js installed, you can use `live-server`:
        ```bash
        npx live-server
        ```
4.  **Open your browser:** Go to `http://localhost:8000` (or the port provided by your local server).

## 🎯 How to Use

1.  **Tasks:**
    *   Click "Add Task" to create a new to-do item.
    *   Click the checkbox to mark a task as complete. It will be moved to the "Completed" section.

2.  **Pomodoro Timer:**
    *   Set your desired work and break intervals (e.g., 25 min work, 5 min break).
    *   Click "Start" to begin the timer. The app will notify you when each session is over.

3.  **Habit Tracker:**
    *   Add habits you want to track daily.
    *   Click on a day's circle for a habit to mark it as complete and build your streak.
