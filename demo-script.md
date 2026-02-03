# Demo Video Script (2 Minutes)

**0:00 - 0:15 : Introduction**
- "Hello, this is [Your Name] and this is my submission for Assignment 3: College Exam Seat Planner."
- "The goal was to build an app that allocates seats optimizing for lower floors and minimum rooms."

**0:15 - 0:45 : Adding Classrooms (Feature 1 & 2)**
- *Action*: Click 'Add Classroom'.
- *Action*: Add Room A-101 (Floor 1, Capacity 20).
- *Action*: Add Room B-201 (Floor 2, Capacity 50).
- *Say*: "Here you can see the 'Add Classroom' form. I'm adding a couple of rooms on different floors. The data is saved automatically."
- *Action*: Scroll down to show the list.
- *Say*: "All added classrooms are listed below with their details."

**0:45 - 1:30 : Allocation Logic (Feature 3)**
- *Action*: Go to Allocation Panel.
- *Action*: Enter '15' students. Click Allocate.
- *Say*: "Let's allocate 15 students. Since A-101 is on Floor 1, it gets priority."
- *Action*: Enter '30' students. Click Allocate.
- *Say*: "Now if we need 30 seats, the system sees A-101 (20) + B-201 (10) as the best fit to keep students on lower floors while using available space."
- *(Optional - if you want to show error)*: Enter '100' students.
- *Say*: "And if request exceeds capacity, it handles the error gracefully."

**1:30 - 2:00 : Code & Tech Stack**
- *Action*: Briefly show VS Code / GitHub Repo.
- *Say*: "The app is built with Next.js and Tailwind CSS. The logic uses a greedy approach sorting by Floor (Ascending) then Capacity (Descending). Thank you!"
