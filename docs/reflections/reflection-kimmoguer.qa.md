# QA / Docs Lead Reflection
**Deliverable:** S5-QA-04  
**Author:** @kimmoguer  
**Branch:** feature/qa-docs  
**Sprint:** S5 — Polish & Docs  

---

When I first got assigned as QA / Docs Lead, I honestly thought it was going to be the "easy" role. Write some test cases, check if buttons work, write stuff down. I figured the developer role was where all the hard work was. I was wrong, and this reflection is basically me admitting that.

The most surprising bug we found was TC-018 — the intermittent parsing error on the Search & Retrieve feature. What made it surprising wasn't the bug itself, it was how hard it was to catch. The first time I ran the test, results just didn't show up and a "parsing error" message flashed for maybe two seconds before disappearing. If I had been doing an informal walkthrough instead of a structured test case, I probably would have assumed it was a one-time glitch and moved on. The fact that the bug only failed consistently on the first search after page load made it easy to miss. You had to specifically test it cold — fresh page load, no prior cache — to reproduce it reliably. That really changed how I think about testing. Edge cases aren't always the weird inputs. Sometimes it's just timing.

The hardest part of my role wasn't writing the test cases. It was maintaining discipline about when to file a GitHub Issue versus when to just tell the developer informally. Early on I caught a couple of small issues and just messaged @enzo-q directly without filing anything. That felt faster in the moment, but by the time I needed to write the Failure Analysis Report, I had no paper trail for those bugs. I had to go back and reconstruct what happened from memory and chat logs, which is exactly the kind of thing a QA process is supposed to prevent. Lesson learned the hard way.

On top of the project workload, I also ran into unexpected technical difficulties on my end. My PC suddenly stopped booting, which significantly disrupted my ability to continue testing and documentation work. For about five days or even more, I had to troubleshoot the issue, considering multiple possible causes such as a dead PSU or a faulty motherboard. The uncertainty made it difficult to plan work, since I wasn’t sure if the system would be recoverable at all. After a series of tests and resets, I eventually identified that the root cause was related to the CMOS battery. Resetting it allowed the system to boot again. While the issue was ultimately fixable, the time spent diagnosing it highlighted how dependent QA work is on a stable environment, and how quickly productivity can drop when that stability is lost.

If I could do this differently, I would start the GitHub Wiki much earlier. I left the User Guide until Sprint 5 and by then I was also finishing the Failure Analysis, the test case results, and the CHANGELOG — all at the same time. The Wiki requires screenshots from the live app, and those took longer than expected to coordinate because the app was still getting final fixes in S5. In a real project, documentation should be written incrementally as features ship, not assembled all at once at the end when everyone is already stressed about the deadline.

Overall, being QA taught me that the documentation is not separate from the project — it is part of the project. A bug that isn't filed doesn't exist. A feature that isn't documented might as well not work. That sounds obvious written out, but it took actually doing it to understand why it matters.


---

*S5-QA-04 | @kimmoguer | feature/qa-docs*
