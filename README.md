# Project Management Dashboard

A simple, static Project Management Dashboard built with React and Vite. This project provides a basic UI to view and manage projects, tasks, team members, and notifications.

## Features

- **Dashboard Controls**: Centralized controls for searching, filtering, and sorting.
- **Projects**: View a list of projects with their status, category, and owner.
- **Tasks**: Create and view tasks with priorities (`Low`, `Medium`, `High`), status (`Active`, `Completed`), and assignees.
- **Team Members**: View a list of users, their roles, and task workloads.
- **Notifications**: Stay updated with recent activity, including task completion notifications.
- **Statistics**: Overview of Total Projects, Active Tasks, Completed Tasks, High Priority Tasks, and User counts.

## Developer B Completed Rounds Summary

- **Round 1**: Task Priority (`Low`, `Medium`, `High`) & display priority badges.
- **Round 2**: Task Priority Filter (`All`, `Low`, `Medium`, `High`) in `getTasks()`.
- **Round 3**: Active Tasks Statistic in `calculateStats()`.
- **Round 4**: Project status and category filter controls on Dashboard.
- **Round 5**: Rebase & integration onto `main`.
- **Round 6**: Task verification and test coverage.
- **Round 7**: Task Assignment and assignee reassignment logic (`assignTask`).
- **Round 8**: Task Completion Workflow & Notification dispatch (`completeTask`).
- **Round 9**: Connected Dashboard Task Overview (Total, Active, Completed tasks).
- **Round 10**: Final Integration and validation.

## Developer D Completed Rounds Summary

- **Round 1**: Task Status Filter (`All`, `Active`, `Completed`) in `getTasks()` and UI.
- **Round 2**: Task Assignee Filter (filter tasks by selected team member).
- **Round 3**: High-Priority Task Statistic in `calculateStats()` and dashboard badge.
- **Round 4**: Project Sorting UI (`A-Z` and `Z-A`) in dashboard controls.
- **Round 5**: Rebase & dashboard integration with Reset Controls.
- **Round 6**: Final dashboard verification across all controls.
- **Round 7**: Team Member Filter (filter projects and tasks simultaneously).
- **Round 8**: Dashboard Notifications unread count badge & mark-as-read workflow.
- **Round 9**: Team Performance Statistics & Highest Workload User in `calculateStats()`.
- **Round 10**: Full Dashboard Integration Challenge validation.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Lucide React (Icons)

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

## Production Build

```bash
npm run build
```
