# Developer's Reflection: Student Mental Health & Wellness Tracker
**Role:** Full-Stack Developer
**Member:** enzo-q - Lorenzo Nheo M. Queñano
**Project:** Student Mental Health & Wellness Tracker (SMHWT)
**Course:** ProfElec2 — KM Capstone

---

### The Hardest Technical Problem
For me, the most challenging technical problem was managing frequent database migrations. As the project evolved, our database structure had to change constantly—such as when we needed to add new tables and rules for forum tags. It was honestly a bit confusing to keep track of these moving pieces, but it taught me how crucial it is as a developer to adapt quickly and ensure the rest of the application stays perfectly in sync with the new data structures.

Another major hurdle was debugging errors in our server-side actions, particularly within the Search feature. Figuring out why the search kept breaking and rewriting the logic to properly filter by titles was a tough process. While we successfully fixed the main crashes, I view it as an ongoing iterative process. I know there is still room for improvement, and I plan to keep optimizing the search logic so users get the smoothest and most accurate experience possible.

---

### Working with AI Assistance
AI was an amazing coding buddy throughout this project. It saved me hours of typing by helping me set up the foundation of the app and writing the repetitive code for our UI loading screens. 

However, I learned quickly that I had to closely double-check its work. Sometimes the AI would confidently make things up—for example, it tried to write in our official changelog that our search feature looked through "peer stories," which wasn't true. It also initially provided the code that caused a glitch where our profile sign-out button would silently fail! Using AI felt like having a really fast intern; it produced great initial drafts, but I still had to actively review, guide, and fix its mistakes before pushing anything to production.

---

### What I Would Do Differently
If I were to build this app again from scratch, I would change two major things about the architecture:

1. **Centralized Layouts:** Instead of manually removing the back arrow and centering the title on every single page file individually, I would design the header inside one "master" layout file. That way, changing the header once would update it automatically across the whole app, saving time and preventing repetitive code.
2. **Linkable Searches:** Right now, our search works using the app's internal component memory. If I started over, I would build it so the search keywords and tags show up in the web address bar (the URL). This would allow users to easily copy, save, and share links to specific search results, making the application much more accessible and user-friendly.