import { ROLES } from "./roles";

const teacherClassesWorkspace = {
  eyebrow: "Teacher Module",
  title: "My Classes",
  description:
    "Track daily classes, subject assignments, upcoming sessions, and classroom readiness from one focused workspace.",
  searchPlaceholder: "Search subjects, batches, rooms, or teaching slots",
  filters: ["All", "Live", "Upcoming", "Completed"],
  stats: [
    { label: "Assigned Classes", value: "4", detail: "Across theory and lab sessions" },
    { label: "Sessions Today", value: "5", detail: "2 completed, 1 live, 2 upcoming" },
    { label: "Average Attendance", value: "89%", detail: "Higher than last week by 3%" },
    { label: "Pending Follow-ups", value: "3", detail: "Materials, quiz review, and lab summary" },
  ],
  quickActions: [
    { label: "Show Live Session", filter: "Live" },
    { label: "Review Upcoming", filter: "Upcoming" },
    { label: "Focus Section B", query: "Section B" },
  ],
  activity: [
    { title: "Attendance synced", detail: "Data Structures attendance uploaded for Section A.", time: "09:32 AM" },
    { title: "Materials shared", detail: "Operating Systems revision notes sent to Class 3B.", time: "Yesterday" },
    { title: "Quiz pending review", detail: "Database Systems short quiz still needs score entry.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Open Session Focus", active: "Focus Active" },
  records: [
    {
      id: "class-1",
      name: "Data Structures",
      subtitle: "CSE 2022 - Section A",
      status: "Live",
      filterValue: "Live",
      metricLabel: "Attendance",
      metricValue: "91%",
      progress: 91,
      summary: "Morning lecture on tree traversal with a live coding walkthrough and in-class practice.",
      tags: ["09:00 AM", "Room L-204", "68 students"],
      facts: [
        { label: "Faculty", value: "Teacher User" },
        { label: "Lesson Plan", value: "DFS, BFS, complexity recap" },
        { label: "Next Deliverable", value: "Upload worksheet by 12:30 PM" },
        { label: "Batch Health", value: "Strong participation" },
      ],
      checklist: [
        { id: "roster", label: "Roster verified", done: true },
        { id: "attendance", label: "Attendance submitted", done: true },
        { id: "worksheet", label: "Worksheet uploaded", done: false },
      ],
      latestNote: "Most students handled traversal questions well, but recursion examples still need reinforcement.",
      pinned: true,
      primaryActive: true,
    },
    {
      id: "class-2",
      name: "Database Systems",
      subtitle: "CSE 2022 - Section B",
      status: "Upcoming",
      filterValue: "Upcoming",
      metricLabel: "Preparedness",
      metricValue: "84%",
      progress: 84,
      summary: "Afternoon session covering normalization and schema design with a mini problem sheet.",
      tags: ["01:00 PM", "Lab 2", "62 students"],
      facts: [
        { label: "Faculty", value: "Teacher User" },
        { label: "Focus Topic", value: "1NF to BCNF examples" },
        { label: "Lab Setup", value: "Projector ready, SQL sandbox pending" },
        { label: "Risk Flag", value: "2 students below 65%" },
      ],
      checklist: [
        { id: "slides", label: "Slides uploaded", done: true },
        { id: "sandbox", label: "SQL sandbox verified", done: false },
        { id: "followup", label: "Low attendance follow-up drafted", done: false },
      ],
      latestNote: "Need one more practical example around partial dependency before class starts.",
      pinned: false,
      primaryActive: false,
    },
    {
      id: "class-3",
      name: "Operating Systems Lab",
      subtitle: "CSE 2023 - Section A",
      status: "Upcoming",
      filterValue: "Upcoming",
      metricLabel: "Lab Completion",
      metricValue: "76%",
      progress: 76,
      summary: "Hands-on shell scripting lab with process scheduling observations and terminal practice.",
      tags: ["03:15 PM", "Lab 4", "54 students"],
      facts: [
        { label: "Lab Topic", value: "Shell automation basics" },
        { label: "Lab Assistant", value: "Assigned" },
        { label: "Submission Window", value: "Closes at 05:30 PM" },
        { label: "Need Attention", value: "3 missing submissions from last lab" },
      ],
      checklist: [
        { id: "machines", label: "Systems checked", done: true },
        { id: "repo", label: "Starter repo shared", done: true },
        { id: "rubric", label: "Rubric posted", done: false },
      ],
      latestNote: "Students requested a short demo on shell variables before they begin the practical.",
      pinned: false,
      primaryActive: false,
    },
    {
      id: "class-4",
      name: "Computer Networks",
      subtitle: "CSE 2022 - Section A",
      status: "Completed",
      filterValue: "Completed",
      metricLabel: "Completion",
      metricValue: "100%",
      progress: 100,
      summary: "Completed packet switching lecture with quiz closure and recap on OSI layers.",
      tags: ["Yesterday", "Room B-112", "59 students"],
      facts: [
        { label: "Topic Closed", value: "OSI and TCP/IP mapping" },
        { label: "Quiz Average", value: "17 / 20" },
        { label: "Backlog", value: "0 pending tasks" },
        { label: "Class Mood", value: "Engaged" },
      ],
      checklist: [
        { id: "quiz", label: "Quiz evaluated", done: true },
        { id: "summary", label: "Class summary mailed", done: true },
        { id: "recording", label: "Session recording archived", done: true },
      ],
      latestNote: "This batch is ready to move to transport layer protocols next week.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const teacherStudentsWorkspace = {
  eyebrow: "Teacher Module",
  title: "Students",
  description:
    "Monitor your roster, spot attendance risk early, and schedule mentoring or parent outreach quickly.",
  searchPlaceholder: "Search students by name, roll number, batch, or attendance",
  filters: ["All", "On Track", "At Risk", "Follow-up"],
  stats: [
    { label: "Roster Size", value: "184", detail: "Across 4 active teaching groups" },
    { label: "At Risk", value: "12", detail: "Below the 75% threshold" },
    { label: "Mentor Follow-ups", value: "7", detail: "Need teacher response this week" },
    { label: "Parents Contacted", value: "5", detail: "Updated in the last 3 days" },
  ],
  quickActions: [
    { label: "Show At Risk", filter: "At Risk" },
    { label: "Open Follow-ups", filter: "Follow-up" },
    { label: "Search Section A", query: "Section A" },
  ],
  activity: [
    { title: "Mentor note added", detail: "Aarav Sharma counseling update saved successfully.", time: "11:05 AM" },
    { title: "Attendance alert", detail: "Anaya Kapoor crossed below 65% in Database Systems.", time: "Today" },
    { title: "Parent outreach", detail: "Email template prepared for three students in Section B.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Schedule Follow-up", active: "Follow-up Scheduled" },
  records: [
    {
      id: "student-1",
      name: "Aarav Sharma",
      subtitle: "22CSE001 - CSE 2022 - Section A",
      status: "On Track",
      filterValue: "On Track",
      metricLabel: "Attendance",
      metricValue: "94%",
      progress: 94,
      summary: "Consistent performer with strong attendance and timely assignment submissions.",
      tags: ["Mentor Group A", "DS + CN", "High participation"],
      facts: [
        { label: "Guardian Contact", value: "Available" },
        { label: "Recent Risk", value: "None" },
        { label: "Latest Submission", value: "On time" },
        { label: "Intervention Need", value: "No action required" },
      ],
      checklist: [
        { id: "mentor", label: "Mentor notes updated", done: true },
        { id: "feedback", label: "Assessment feedback shared", done: true },
        { id: "review", label: "Monthly review logged", done: false },
      ],
      latestNote: "A reliable student who can help lead peer revision sessions before internal exams.",
      pinned: true,
      primaryActive: false,
    },
    {
      id: "student-2",
      name: "Anaya Kapoor",
      subtitle: "22CSE008 - CSE 2022 - Section B",
      status: "At Risk",
      filterValue: "At Risk",
      metricLabel: "Attendance",
      metricValue: "64%",
      progress: 64,
      summary: "Attendance dropped steadily over the last two weeks and needs urgent tracking.",
      tags: ["Database Systems", "Needs outreach", "Section B"],
      facts: [
        { label: "Guardian Contact", value: "Pending confirmation" },
        { label: "Last Present", value: "2 days ago" },
        { label: "Subject Concern", value: "Database Systems" },
        { label: "Risk Level", value: "High" },
      ],
      checklist: [
        { id: "call", label: "Parent call scheduled", done: false },
        { id: "mentor", label: "Mentor slot assigned", done: true },
        { id: "notice", label: "Warning notice prepared", done: false },
      ],
      latestNote: "Needs a parent call and a one-on-one catch-up before the next attendance review window.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "student-3",
      name: "Kabir Singh",
      subtitle: "22CSE003 - CSE 2023 - Section A",
      status: "Follow-up",
      filterValue: "Follow-up",
      metricLabel: "Attendance",
      metricValue: "78%",
      progress: 78,
      summary: "Recovered from low attendance recently but still needs structured follow-up for continuity.",
      tags: ["OS Lab", "Improving", "Weekly review"],
      facts: [
        { label: "Guardian Contact", value: "Completed" },
        { label: "Recent Improvement", value: "+9% this month" },
        { label: "Support Plan", value: "Weekly checkpoint" },
        { label: "Risk Level", value: "Moderate" },
      ],
      checklist: [
        { id: "checkpoint", label: "Weekly checkpoint booked", done: true },
        { id: "lab", label: "Lab backlog cleared", done: false },
        { id: "email", label: "Recovery mail sent", done: true },
      ],
      latestNote: "Momentum is improving, but lab completion still needs one more week of follow-through.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "student-4",
      name: "Myra Nair",
      subtitle: "22CSE026 - CSE 2023 - Section B",
      status: "On Track",
      filterValue: "On Track",
      metricLabel: "Attendance",
      metricValue: "88%",
      progress: 88,
      summary: "Steady class participation with good consistency in both lectures and labs.",
      tags: ["Networks", "Good standing", "Section B"],
      facts: [
        { label: "Guardian Contact", value: "Available" },
        { label: "Latest Review", value: "Positive" },
        { label: "Intervention Need", value: "None" },
        { label: "Assignment Health", value: "No backlog" },
      ],
      checklist: [
        { id: "record", label: "Review record saved", done: true },
        { id: "feedback", label: "Internal marks published", done: false },
        { id: "mentor", label: "Mentor update needed", done: false },
      ],
      latestNote: "Can be considered for student ambassador support during the next lab cycle.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const adminStudentsWorkspace = {
  eyebrow: "Admin Module",
  title: "Students",
  description:
    "Manage the college-wide student directory, monitor onboarding health, and keep risk groups visible for action.",
  searchPlaceholder: "Search students, batches, departments, or enrollment status",
  filters: ["All", "Active", "At Risk", "Pending"],
  stats: [
    { label: "Total Students", value: "1,284", detail: "Across 12 departments and 3 academic years" },
    { label: "Pending Profiles", value: "27", detail: "Need document or guardian completion" },
    { label: "Attendance Risk", value: "63", detail: "Cross-department students below threshold" },
    { label: "New Admissions", value: "114", detail: "Added this academic cycle" },
  ],
  quickActions: [
    { label: "Review Pending", filter: "Pending" },
    { label: "Risk Group", filter: "At Risk" },
    { label: "Search Computer Science", query: "Computer Science" },
  ],
  activity: [
    { title: "Bulk import complete", detail: "32 student records synced from admissions desk.", time: "10:15 AM" },
    { title: "Document reminder", detail: "Reminder triggered for incomplete student files.", time: "Today" },
    { title: "Section migration", detail: "12 records moved to the updated batch allocation.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Start Review", active: "Review In Progress" },
  records: [
    {
      id: "admin-student-1",
      name: "Riya Sharma",
      subtitle: "21CSE042 - Computer Science",
      status: "At Risk",
      filterValue: "At Risk",
      metricLabel: "Attendance",
      metricValue: "61%",
      progress: 61,
      summary: "Needs administrative follow-up alongside department counseling due to repeated low attendance.",
      tags: ["Sem 5", "Guardian verified", "Hosteller"],
      facts: [
        { label: "Department", value: "Computer Science" },
        { label: "Batch", value: "2021 - A" },
        { label: "Profile Completeness", value: "100%" },
        { label: "Escalation", value: "Department + parent" },
      ],
      checklist: [
        { id: "profile", label: "Profile verified", done: true },
        { id: "warning", label: "Warning letter generated", done: true },
        { id: "meeting", label: "Intervention meeting scheduled", done: false },
      ],
      latestNote: "Administrative escalation should stay aligned with the HOD plan this week.",
      pinned: true,
      primaryActive: true,
    },
    {
      id: "admin-student-2",
      name: "Ishita Verma",
      subtitle: "22ECE014 - Electronics",
      status: "Active",
      filterValue: "Active",
      metricLabel: "Profile",
      metricValue: "98%",
      progress: 98,
      summary: "Strong academic standing with all primary records already verified.",
      tags: ["Sem 4", "Scholarship", "Day scholar"],
      facts: [
        { label: "Department", value: "Electronics" },
        { label: "Batch", value: "2022 - B" },
        { label: "Guardian Contact", value: "Verified" },
        { label: "Portal Status", value: "Healthy" },
      ],
      checklist: [
        { id: "idcard", label: "ID card issued", done: true },
        { id: "guardian", label: "Guardian details checked", done: true },
        { id: "fee", label: "Fee ledger synced", done: false },
      ],
      latestNote: "One finance sync remains, but the student record itself is in excellent shape.",
      pinned: false,
      primaryActive: false,
    },
    {
      id: "admin-student-3",
      name: "Farhan Ali",
      subtitle: "23MEC022 - Mechanical",
      status: "Pending",
      filterValue: "Pending",
      metricLabel: "Profile",
      metricValue: "72%",
      progress: 72,
      summary: "Admission record exists, but supporting documents and hostel declaration are still incomplete.",
      tags: ["New admission", "Docs pending", "Hostel request"],
      facts: [
        { label: "Department", value: "Mechanical" },
        { label: "Batch", value: "2023 - A" },
        { label: "Missing Item", value: "Guardian declaration" },
        { label: "Portal Status", value: "Waiting completion" },
      ],
      checklist: [
        { id: "docs", label: "Academic documents uploaded", done: true },
        { id: "declaration", label: "Guardian declaration received", done: false },
        { id: "section", label: "Section allocation locked", done: false },
      ],
      latestNote: "Complete guardian declaration before finalizing hostel accommodation.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const hodCoursesWorkspace = {
  eyebrow: "HOD Module",
  title: "Courses",
  description:
    "Review department courses, monitor delivery health, and keep each batch aligned with syllabus milestones.",
  searchPlaceholder: "Search courses, faculty owners, semesters, or curriculum blocks",
  filters: ["All", "Core", "Lab", "Elective"],
  stats: [
    { label: "Department Courses", value: "18", detail: "Core, lab, and elective delivery tracked here" },
    { label: "Syllabus On Track", value: "14", detail: "Four courses need closer attention" },
    { label: "Labs Active", value: "5", detail: "Practical sessions running this week" },
    { label: "Faculty Leads", value: "11", detail: "Assigned across semesters 1 to 8" },
  ],
  quickActions: [
    { label: "View Labs", filter: "Lab" },
    { label: "Show Electives", filter: "Elective" },
    { label: "Search Sem 5", query: "Sem 5" },
  ],
  activity: [
    { title: "Course plan revised", detail: "Operating Systems now includes two extra remediation sessions.", time: "09:50 AM" },
    { title: "Lab rubric shared", detail: "Networks lab rubric distributed to all section leads.", time: "Today" },
    { title: "Syllabus milestone", detail: "Data Structures crossed 70% syllabus completion.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Review Course Plan", active: "Plan Under Review" },
  records: [
    {
      id: "course-1",
      name: "Data Structures",
      subtitle: "Sem 3 - Core Course",
      status: "Core",
      filterValue: "Core",
      metricLabel: "Syllabus",
      metricValue: "72%",
      progress: 72,
      summary: "Strong progress with regular assessment rhythm and healthy attendance across batches.",
      tags: ["Owner: Prof. Priyanka Mane", "4 credits", "Batch A/B"],
      facts: [
        { label: "Assessment Window", value: "Internal 2 in 10 days" },
        { label: "Delivery Risk", value: "Low" },
        { label: "Batch Spread", value: "2 active batches" },
        { label: "Support Need", value: "None" },
      ],
      checklist: [
        { id: "plan", label: "Lesson plan locked", done: true },
        { id: "assessment", label: "Assessment draft approved", done: true },
        { id: "moderation", label: "Moderation notes archived", done: false },
      ],
      latestNote: "A strong reference course for the department's third-semester delivery standards.",
      pinned: true,
      primaryActive: false,
    },
    {
      id: "course-2",
      name: "Operating Systems Lab",
      subtitle: "Sem 5 - Lab Course",
      status: "Lab",
      filterValue: "Lab",
      metricLabel: "Execution",
      metricValue: "66%",
      progress: 66,
      summary: "Lab progression is acceptable but still behind the planned checkpoint by one week.",
      tags: ["Owner: Prof. Aarti Deshmukh", "2 credits", "Lab block"],
      facts: [
        { label: "Pending Item", value: "Lab rubric version 2" },
        { label: "Equipment Health", value: "Stable" },
        { label: "Risk Level", value: "Moderate" },
        { label: "Catch-up Plan", value: "Weekend practical slot" },
      ],
      checklist: [
        { id: "labplan", label: "Practical map approved", done: true },
        { id: "rubric", label: "Rubric finalized", done: false },
        { id: "catchup", label: "Catch-up schedule shared", done: false },
      ],
      latestNote: "Best handled with an extra catch-up lab before internals begin.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "course-3",
      name: "AI for Engineers",
      subtitle: "Sem 6 - Elective",
      status: "Elective",
      filterValue: "Elective",
      metricLabel: "Enrollment",
      metricValue: "43",
      progress: 86,
      summary: "Popular elective with strong sign-ups and steady student feedback after the first unit.",
      tags: ["Owner: Visiting Faculty", "3 credits", "Open elective"],
      facts: [
        { label: "Enrollment Strength", value: "High" },
        { label: "Delivery Pace", value: "On track" },
        { label: "Feedback Tone", value: "Very positive" },
        { label: "Need Attention", value: "Project rubric by next week" },
      ],
      checklist: [
        { id: "orientation", label: "Elective orientation done", done: true },
        { id: "rubric", label: "Project rubric published", done: false },
        { id: "mentor", label: "Faculty mentor linked", done: true },
      ],
      latestNote: "A good candidate to showcase in the department elective brochure next term.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const studentCoursesWorkspace = {
  eyebrow: "Student Module",
  title: "My Courses",
  description:
    "See your active subjects, track each course standing, and know exactly where to focus before assessments.",
  searchPlaceholder: "Search your courses, credits, or attendance standing",
  filters: ["All", "Core", "Lab", "Elective"],
  stats: [
    { label: "Active Courses", value: "5", detail: "Current semester load" },
    { label: "Healthy Attendance", value: "3", detail: "Courses at or above 80%" },
    { label: "Need Recovery", value: "2", detail: "Requires regular attendance push" },
    { label: "Credits This Term", value: "19", detail: "Across theory and practical" },
  ],
  quickActions: [
    { label: "Open Labs", filter: "Lab" },
    { label: "Find Recovery Courses", query: "Need support" },
    { label: "Show Elective", filter: "Elective" },
  ],
  activity: [
    { title: "Assignment posted", detail: "Database Systems assignment 4 is now available.", time: "10:25 AM" },
    { title: "Attendance updated", detail: "Operating Systems lecture marked absent for Apr 24.", time: "Today" },
    { title: "Project reminder", detail: "Software Engineering mini project review due this Friday.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Pin Course Plan", active: "Pinned to Focus" },
  records: [
    {
      id: "my-course-1",
      name: "Data Structures",
      subtitle: "Core - 4 credits",
      status: "Core",
      filterValue: "Core",
      metricLabel: "Attendance",
      metricValue: "83%",
      progress: 83,
      summary: "Solid course standing with room to improve before internals.",
      tags: ["Faculty: Teacher User", "Mon/Wed/Fri", "On track"],
      facts: [
        { label: "Classes Held", value: "42" },
        { label: "Classes Attended", value: "35" },
        { label: "Next Class", value: "Monday 09:00 AM" },
        { label: "Support Need", value: "Low" },
      ],
      checklist: [
        { id: "notes", label: "Lecture notes revised", done: true },
        { id: "practice", label: "Weekly practice completed", done: false },
        { id: "doubts", label: "Doubt list prepared", done: false },
      ],
      latestNote: "A good subject to keep above 85% before the next internal assessment.",
      pinned: true,
      primaryActive: true,
    },
    {
      id: "my-course-2",
      name: "Operating Systems",
      subtitle: "Core - 4 credits",
      status: "Core",
      filterValue: "Core",
      metricLabel: "Attendance",
      metricValue: "61%",
      progress: 61,
      summary: "Needs immediate recovery through consistent attendance and extra revision support.",
      tags: ["Faculty: Prof. Aarti Deshmukh", "Need support", "Threshold risk"],
      facts: [
        { label: "Classes Held", value: "36" },
        { label: "Classes Attended", value: "22" },
        { label: "Next Class", value: "Tuesday 11:00 AM" },
        { label: "Recovery Need", value: "High" },
      ],
      checklist: [
        { id: "planner", label: "Recovery plan created", done: true },
        { id: "meeting", label: "Faculty meeting booked", done: false },
        { id: "revision", label: "Revision session attended", done: false },
      ],
      latestNote: "This is the subject that needs the most attention over the next two weeks.",
      pinned: false,
      primaryActive: false,
    },
    {
      id: "my-course-3",
      name: "Software Engineering Lab",
      subtitle: "Lab - 2 credits",
      status: "Lab",
      filterValue: "Lab",
      metricLabel: "Attendance",
      metricValue: "88%",
      progress: 88,
      summary: "Healthy practical performance with good attendance and steady project activity.",
      tags: ["Lab", "Project team", "Friday slot"],
      facts: [
        { label: "Classes Held", value: "18" },
        { label: "Classes Attended", value: "16" },
        { label: "Project Status", value: "Prototype ready" },
        { label: "Support Need", value: "Low" },
      ],
      checklist: [
        { id: "project", label: "Project milestone submitted", done: true },
        { id: "demo", label: "Demo deck prepared", done: false },
        { id: "feedback", label: "TA feedback reviewed", done: true },
      ],
      latestNote: "Project momentum is good and just needs a cleaner demo narrative.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const teacherFacultyWorkspace = {
  eyebrow: "Faculty Module",
  title: "Teachers",
  description:
    "Review faculty allocation, pending coverage, and mentoring support across teaching teams.",
  searchPlaceholder: "Search faculty by name, subject, allocation, or support status",
  filters: ["All", "Scheduled", "Pending", "Mentoring"],
  stats: [
    { label: "Department Faculty", value: "18", detail: "Including permanent and visiting roles" },
    { label: "Pending Coverage", value: "3", detail: "Sessions still need backup allocation" },
    { label: "Mentoring Links", value: "11", detail: "Faculty paired with new teachers" },
    { label: "Healthy Loads", value: "14", detail: "Teaching balance looks stable" },
  ],
  quickActions: [
    { label: "Pending Coverage", filter: "Pending" },
    { label: "Mentoring View", filter: "Mentoring" },
    { label: "Find Database", query: "Database" },
  ],
  activity: [
    { title: "Coverage assigned", detail: "Networks lecture backup confirmed for Section A.", time: "08:55 AM" },
    { title: "Mentor pair updated", detail: "A senior faculty mentor linked to a new teaching hire.", time: "Today" },
    { title: "Load review", detail: "Teaching load audit prepared for the next HOD meeting.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Start Allocation Review", active: "Review Running" },
  records: [
    {
      id: "teacher-1",
      name: "Prof. Priyanka Mane",
      subtitle: "Data Structures - Senior Faculty",
      status: "Scheduled",
      filterValue: "Scheduled",
      metricLabel: "Teaching Load",
      metricValue: "92%",
      progress: 92,
      summary: "Strong classroom delivery and reliable attendance closure across all assigned batches.",
      tags: ["Mentor", "Batch A/B", "Stable"],
      facts: [
        { label: "Assigned Courses", value: "2" },
        { label: "Weekly Sessions", value: "11" },
        { label: "Mentor Capacity", value: "Available" },
        { label: "Escalations", value: "None" },
      ],
      checklist: [
        { id: "plan", label: "Teaching plan reviewed", done: true },
        { id: "load", label: "Load audit completed", done: true },
        { id: "mentor", label: "Mentor notes updated", done: false },
      ],
      latestNote: "A stable anchor faculty member for curriculum pacing and mentoring.",
      pinned: true,
      primaryActive: false,
    },
    {
      id: "teacher-2",
      name: "Prof. Aarti Deshmukh",
      subtitle: "Operating Systems - Lab + Theory",
      status: "Pending",
      filterValue: "Pending",
      metricLabel: "Coverage",
      metricValue: "71%",
      progress: 71,
      summary: "Needs schedule balancing after an extra lab section was added this term.",
      tags: ["Lab heavy", "Needs support", "Sem 5"],
      facts: [
        { label: "Assigned Courses", value: "3" },
        { label: "Weekly Sessions", value: "14" },
        { label: "Mentor Capacity", value: "Limited" },
        { label: "Support Need", value: "Backup coverage" },
      ],
      checklist: [
        { id: "backup", label: "Backup faculty identified", done: false },
        { id: "timetable", label: "Updated timetable shared", done: true },
        { id: "labload", label: "Lab load rebalanced", done: false },
      ],
      latestNote: "A small redistribution of lab sessions would bring this faculty load back into a healthy range.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "teacher-3",
      name: "Prof. Padma Nimbhore",
      subtitle: "Computer Networks - Assistant Professor",
      status: "Mentoring",
      filterValue: "Mentoring",
      metricLabel: "Mentoring",
      metricValue: "3 mentees",
      progress: 88,
      summary: "Supports new faculty onboarding while maintaining solid class delivery.",
      tags: ["Mentor", "Networks", "Strong feedback"],
      facts: [
        { label: "Assigned Courses", value: "1" },
        { label: "Weekly Sessions", value: "8" },
        { label: "Mentees", value: "3 faculty members" },
        { label: "Support Need", value: "None" },
      ],
      checklist: [
        { id: "mentee", label: "Mentee review completed", done: true },
        { id: "feedback", label: "Faculty feedback shared", done: true },
        { id: "next", label: "Next mentor session planned", done: false },
      ],
      latestNote: "An ideal faculty lead for supporting newer hires without affecting classroom quality.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const adminDepartmentsWorkspace = {
  eyebrow: "Admin Module",
  title: "Departments",
  description:
    "Oversee department capacity, staffing, attendance health, and expansion readiness from one admin view.",
  searchPlaceholder: "Search departments, HOD names, capacity, or readiness status",
  filters: ["All", "Stable", "Needs Support", "Expansion"],
  stats: [
    { label: "Departments", value: "12", detail: "Academic units currently configured" },
    { label: "Stable Units", value: "8", detail: "Healthy staffing and attendance trend" },
    { label: "Needs Support", value: "3", detail: "Coverage or attendance needs intervention" },
    { label: "Expansion Ready", value: "2", detail: "Prepared for additional intake" },
  ],
  quickActions: [
    { label: "Needs Support", filter: "Needs Support" },
    { label: "Expansion Ready", filter: "Expansion" },
    { label: "Search Science", query: "Science" },
  ],
  activity: [
    { title: "Capacity updated", detail: "Computer Science intake updated for next semester.", time: "10:40 AM" },
    { title: "Support request", detail: "Civil department requested an additional lab assistant.", time: "Today" },
    { title: "Review complete", detail: "Business school staffing review closed successfully.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Open Admin Review", active: "Review In Progress" },
  records: [
    {
      id: "dept-1",
      name: "Computer Science",
      subtitle: "HOD: Vijaykumar Mantri",
      status: "Stable",
      filterValue: "Stable",
      metricLabel: "Attendance",
      metricValue: "92%",
      progress: 92,
      summary: "Strong attendance, healthy staffing, and stable lab infrastructure across all active batches.",
      tags: ["312 students", "18 faculty", "2 labs"],
      facts: [
        { label: "Current Intake", value: "180 per year" },
        { label: "Infrastructure", value: "Healthy" },
        { label: "Escalations", value: "Low" },
        { label: "Next Review", value: "In 2 weeks" },
      ],
      checklist: [
        { id: "capacity", label: "Capacity audit completed", done: true },
        { id: "staffing", label: "Staffing map approved", done: true },
        { id: "intake", label: "Intake adjustment published", done: false },
      ],
      latestNote: "A benchmark department for attendance and operational readiness.",
      pinned: true,
      primaryActive: false,
    },
    {
      id: "dept-2",
      name: "Civil Engineering",
      subtitle: "HOD: Dr. K. Raghavan",
      status: "Needs Support",
      filterValue: "Needs Support",
      metricLabel: "Attendance",
      metricValue: "81%",
      progress: 81,
      summary: "Needs operational help around faculty coverage and a more consistent attendance intervention plan.",
      tags: ["204 students", "11 faculty", "Lab assistant requested"],
      facts: [
        { label: "Current Issue", value: "Coverage gap in surveying lab" },
        { label: "Infrastructure", value: "Adequate" },
        { label: "Escalations", value: "Moderate" },
        { label: "Next Review", value: "This Friday" },
      ],
      checklist: [
        { id: "coverage", label: "Coverage request raised", done: true },
        { id: "lab", label: "Lab support assigned", done: false },
        { id: "risk", label: "Risk group plan approved", done: false },
      ],
      latestNote: "This unit would benefit most from a quick staffing intervention before exams.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "dept-3",
      name: "Applied Sciences",
      subtitle: "HOD: Dr. Ritu Sengar",
      status: "Expansion",
      filterValue: "Expansion",
      metricLabel: "Readiness",
      metricValue: "87%",
      progress: 87,
      summary: "Infrastructure and staffing indicate strong readiness for the next intake cycle expansion.",
      tags: ["166 students", "9 faculty", "Growth ready"],
      facts: [
        { label: "Current Intake", value: "120 per year" },
        { label: "Infrastructure", value: "Expansion ready" },
        { label: "Escalations", value: "Minimal" },
        { label: "Next Review", value: "Next month" },
      ],
      checklist: [
        { id: "space", label: "Classroom space validated", done: true },
        { id: "faculty", label: "Faculty forecast approved", done: false },
        { id: "budget", label: "Budget note prepared", done: true },
      ],
      latestNote: "A strong candidate for controlled capacity increase in the coming academic year.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const superAdminInstitutesWorkspace = {
  eyebrow: "Super Admin",
  title: "Institutes",
  description:
    "Track multi-campus readiness, admin ownership, and operational consistency across the wider organization.",
  searchPlaceholder: "Search institutes, campuses, owners, or rollout status",
  filters: ["All", "Active", "Review", "Launch"],
  stats: [
    { label: "Institutes", value: "6", detail: "Managed under the central platform" },
    { label: "Active Rollouts", value: "4", detail: "Campuses already using attendance workflows" },
    { label: "Pending Reviews", value: "2", detail: "Need policy or admin verification" },
    { label: "New Launches", value: "1", detail: "Scheduled this quarter" },
  ],
  quickActions: [
    { label: "Show Reviews", filter: "Review" },
    { label: "Launch Queue", filter: "Launch" },
    { label: "Search South", query: "South" },
  ],
  activity: [
    { title: "Campus synced", detail: "North City Institute reporting pipeline verified.", time: "08:30 AM" },
    { title: "Admin owner changed", detail: "Regional admin reassigned for South Valley campus.", time: "Today" },
    { title: "Launch prep", detail: "Westbridge onboarding checklist is 90% complete.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Open Rollout Review", active: "Review Running" },
  records: [
    {
      id: "inst-1",
      name: "North City Institute",
      subtitle: "Primary engineering campus",
      status: "Active",
      filterValue: "Active",
      metricLabel: "Platform Readiness",
      metricValue: "96%",
      progress: 96,
      summary: "Fully active campus with healthy admin coverage and steady attendance reporting.",
      tags: ["1,820 students", "3 admins", "Live"],
      facts: [
        { label: "Regional Owner", value: "Priya Sharma" },
        { label: "Policy Sync", value: "Complete" },
        { label: "Support Volume", value: "Low" },
        { label: "Last Audit", value: "Last week" },
      ],
      checklist: [
        { id: "owner", label: "Owner verified", done: true },
        { id: "policy", label: "Policy synced", done: true },
        { id: "audit", label: "Audit archived", done: false },
      ],
      latestNote: "Stable and suitable for benchmarking other campuses against.",
      pinned: true,
      primaryActive: false,
    },
    {
      id: "inst-2",
      name: "South Valley Institute",
      subtitle: "Regional sciences campus",
      status: "Review",
      filterValue: "Review",
      metricLabel: "Platform Readiness",
      metricValue: "74%",
      progress: 74,
      summary: "Core setup is present, but admin ownership and policy review still need closure.",
      tags: ["940 students", "2 admins", "Needs review"],
      facts: [
        { label: "Regional Owner", value: "Awaiting final approval" },
        { label: "Policy Sync", value: "In progress" },
        { label: "Support Volume", value: "Moderate" },
        { label: "Last Audit", value: "This month" },
      ],
      checklist: [
        { id: "owner", label: "Regional owner approved", done: false },
        { id: "policy", label: "Policy review completed", done: false },
        { id: "rollout", label: "Rollout sign-off prepared", done: true },
      ],
      latestNote: "Ownership clarity is the main remaining blocker before full activation.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "inst-3",
      name: "Westbridge Campus",
      subtitle: "Upcoming business school launch",
      status: "Launch",
      filterValue: "Launch",
      metricLabel: "Launch Readiness",
      metricValue: "89%",
      progress: 89,
      summary: "Almost launch-ready with strong local enthusiasm and most setup tasks already complete.",
      tags: ["620 students", "1 admin", "Launch queue"],
      facts: [
        { label: "Regional Owner", value: "S. Narayanan" },
        { label: "Policy Sync", value: "Ready" },
        { label: "Support Volume", value: "Expected low" },
        { label: "Go-live Target", value: "Next month" },
      ],
      checklist: [
        { id: "admins", label: "Admin access provisioned", done: true },
        { id: "training", label: "Training completed", done: true },
        { id: "goLive", label: "Go-live sign-off completed", done: false },
      ],
      latestNote: "This campus is close enough that only final sign-off is left.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const superAdminAdminsWorkspace = {
  eyebrow: "Super Admin",
  title: "Admins",
  description:
    "Manage platform admins, ownership spans, and compliance follow-ups without leaving the operations layer.",
  searchPlaceholder: "Search admins by name, region, ownership, or compliance state",
  filters: ["All", "Online", "Audit", "Rotation"],
  stats: [
    { label: "Platform Admins", value: "14", detail: "Across central and regional operations" },
    { label: "Currently Online", value: "6", detail: "Available in the active operations window" },
    { label: "Audits Due", value: "3", detail: "Require permission review this week" },
    { label: "Rotation Queue", value: "2", detail: "Ownership changes planned soon" },
  ],
  quickActions: [
    { label: "Open Audits", filter: "Audit" },
    { label: "Rotation Queue", filter: "Rotation" },
    { label: "Search Regional", query: "Regional" },
  ],
  activity: [
    { title: "Access reviewed", detail: "Two regional admin roles were revalidated.", time: "09:05 AM" },
    { title: "Rotation planned", detail: "Ownership handover prepared for East cluster.", time: "Today" },
    { title: "Permissions updated", detail: "New alert privileges granted to the reporting admin.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Open Access Review", active: "Review Running" },
  records: [
    {
      id: "admin-1",
      name: "Priya Sharma",
      subtitle: "Central Operations Admin",
      status: "Online",
      filterValue: "Online",
      metricLabel: "Ownership",
      metricValue: "3 campuses",
      progress: 94,
      summary: "Senior operations admin with stable ownership and minimal exception volume.",
      tags: ["Central team", "Attendance ops", "Stable"],
      facts: [
        { label: "Permissions", value: "Full operations" },
        { label: "Last Audit", value: "Passed" },
        { label: "Support Volume", value: "Low" },
        { label: "Rotation Need", value: "None" },
      ],
      checklist: [
        { id: "audit", label: "Access audit completed", done: true },
        { id: "handover", label: "Handover notes refreshed", done: true },
        { id: "backup", label: "Backup owner named", done: false },
      ],
      latestNote: "A dependable anchor admin for cross-campus monitoring and escalations.",
      pinned: true,
      primaryActive: false,
    },
    {
      id: "admin-2",
      name: "Rahul Menon",
      subtitle: "Regional Admin - South Cluster",
      status: "Audit",
      filterValue: "Audit",
      metricLabel: "Ownership",
      metricValue: "2 campuses",
      progress: 79,
      summary: "Needs an access review after recent campus ownership changes in the region.",
      tags: ["Regional", "Permissions review", "Needs audit"],
      facts: [
        { label: "Permissions", value: "Regional operations" },
        { label: "Last Audit", value: "Due now" },
        { label: "Support Volume", value: "Moderate" },
        { label: "Rotation Need", value: "Possible" },
      ],
      checklist: [
        { id: "audit", label: "Access audit completed", done: false },
        { id: "owner", label: "Ownership map updated", done: true },
        { id: "backup", label: "Backup owner confirmed", done: false },
      ],
      latestNote: "Audit this account before the next regional reporting cycle begins.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "admin-3",
      name: "Nikita Arora",
      subtitle: "Reporting Admin - East Cluster",
      status: "Rotation",
      filterValue: "Rotation",
      metricLabel: "Ownership",
      metricValue: "1 campus",
      progress: 83,
      summary: "A role transition is planned soon, so handover quality matters more than new allocations.",
      tags: ["Reporting", "Transition", "Handover"],
      facts: [
        { label: "Permissions", value: "Reports and alerts" },
        { label: "Last Audit", value: "Passed" },
        { label: "Support Volume", value: "Low" },
        { label: "Rotation Need", value: "Immediate" },
      ],
      checklist: [
        { id: "handover", label: "Handover deck prepared", done: true },
        { id: "successor", label: "Successor briefed", done: false },
        { id: "closeout", label: "Access closeout plan drafted", done: false },
      ],
      latestNote: "Keep the transition structured to avoid reporting ownership gaps.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const superAdminUsersWorkspace = {
  eyebrow: "Super Admin",
  title: "Users",
  description:
    "See a unified user directory with status visibility, cross-role activity clues, and support-ready record detail.",
  searchPlaceholder: "Search users by role, email, department, or support state",
  filters: ["All", "Active", "Pending", "Support"],
  stats: [
    { label: "Total Users", value: "1,426", detail: "Students, teachers, HODs, admins, and support users" },
    { label: "Active Sessions", value: "311", detail: "Live platform activity right now" },
    { label: "Pending Accounts", value: "24", detail: "Waiting for activation or verification" },
    { label: "Support Flags", value: "11", detail: "Need manual ops help" },
  ],
  quickActions: [
    { label: "Pending Accounts", filter: "Pending" },
    { label: "Support Flags", filter: "Support" },
    { label: "Search Teachers", query: "Teacher" },
  ],
  activity: [
    { title: "New user batch", detail: "18 accounts imported from the admissions connector.", time: "07:55 AM" },
    { title: "Activation reminders", detail: "Pending staff accounts reminded automatically.", time: "Today" },
    { title: "Support ticket linked", detail: "A user support case was attached to the global directory.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Open Support Review", active: "Review In Progress" },
  records: [
    {
      id: "user-1",
      name: "teacher@college.edu",
      subtitle: "Teacher - Computer Science",
      status: "Active",
      filterValue: "Active",
      metricLabel: "Session Health",
      metricValue: "Healthy",
      progress: 93,
      summary: "Regularly active teaching account with stable usage and no support issues.",
      tags: ["Teacher", "Verified", "Stable"],
      facts: [
        { label: "User Role", value: "TEACHER" },
        { label: "Department", value: "Computer Science" },
        { label: "Last Login", value: "Today 08:42 AM" },
        { label: "Support State", value: "None" },
      ],
      checklist: [
        { id: "verify", label: "Email verified", done: true },
        { id: "role", label: "Role assignment checked", done: true },
        { id: "device", label: "Recent device review", done: false },
      ],
      latestNote: "A healthy example account for the core teaching workflow.",
      pinned: true,
      primaryActive: false,
    },
    {
      id: "user-2",
      name: "newstaff@college.edu",
      subtitle: "Teacher - Electronics",
      status: "Pending",
      filterValue: "Pending",
      metricLabel: "Session Health",
      metricValue: "Awaiting activation",
      progress: 68,
      summary: "Newly created account that still needs first login and full onboarding closure.",
      tags: ["Teacher", "Pending activation", "New"],
      facts: [
        { label: "User Role", value: "TEACHER" },
        { label: "Department", value: "Electronics" },
        { label: "Last Login", value: "Never" },
        { label: "Support State", value: "Activation pending" },
      ],
      checklist: [
        { id: "verify", label: "Email verified", done: false },
        { id: "role", label: "Role assignment checked", done: true },
        { id: "welcome", label: "Welcome instructions sent", done: true },
      ],
      latestNote: "Activation is the last meaningful blocker before this account becomes usable.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "user-3",
      name: "student.help@college.edu",
      subtitle: "Support User - Student Services",
      status: "Support",
      filterValue: "Support",
      metricLabel: "Session Health",
      metricValue: "Needs follow-up",
      progress: 75,
      summary: "Support-linked account with recent exceptions that should be reviewed centrally.",
      tags: ["Support", "Ticket linked", "Manual follow-up"],
      facts: [
        { label: "User Role", value: "SUPPORT" },
        { label: "Department", value: "Student Services" },
        { label: "Last Login", value: "Yesterday 05:12 PM" },
        { label: "Support State", value: "Ticket open" },
      ],
      checklist: [
        { id: "ticket", label: "Support ticket linked", done: true },
        { id: "access", label: "Permission issue reviewed", done: false },
        { id: "close", label: "Resolution confirmed", done: false },
      ],
      latestNote: "A short support review should be enough to clear the remaining exception.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const studentProfileWorkspace = {
  eyebrow: "Student Module",
  title: "Profile",
  description:
    "Keep your academic identity, support documents, and request history organized in one simple place.",
  searchPlaceholder: "Search profile sections, requests, documents, or personal status",
  filters: ["All", "Active", "Submitted", "Planned"],
  stats: [
    { label: "Profile Completion", value: "92%", detail: "Almost everything needed is already in place" },
    { label: "Documents Linked", value: "6", detail: "ID, guardian, address, and academic records" },
    { label: "Open Requests", value: "2", detail: "One leave plan and one document refresh" },
    { label: "Semester Status", value: "Active", detail: "Current enrollment healthy" },
  ],
  quickActions: [
    { label: "Open Requests", query: "request" },
    { label: "Show Submitted", filter: "Submitted" },
    { label: "Plan Next Steps", filter: "Planned" },
  ],
  activity: [
    { title: "Profile refreshed", detail: "Guardian phone number was updated successfully.", time: "Today" },
    { title: "Request drafted", detail: "Leave request saved for next week review.", time: "Yesterday" },
    { title: "Document sync", detail: "Student ID card file checked against records.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Pin For Action", active: "Pinned" },
  records: [
    {
      id: "profile-1",
      name: "Academic Identity",
      subtitle: "Semester 6 enrollment and core profile data",
      status: "Active",
      filterValue: "Active",
      metricLabel: "Completion",
      metricValue: "96%",
      progress: 96,
      summary: "Core academic profile is strong with only a minor verification step remaining.",
      tags: ["Enrollment active", "Semester 6", "Verified"],
      facts: [
        { label: "Program", value: "B.Tech Computer Science" },
        { label: "Batch", value: "2023 - A" },
        { label: "Mentor", value: "Teacher User" },
        { label: "Pending Item", value: "Emergency contact reconfirmation" },
      ],
      checklist: [
        { id: "program", label: "Program details verified", done: true },
        { id: "mentor", label: "Mentor mapped", done: true },
        { id: "contact", label: "Emergency contact reconfirmed", done: false },
      ],
      latestNote: "Only one profile confirmation remains before this section is fully complete.",
      pinned: true,
      primaryActive: false,
    },
    {
      id: "profile-2",
      name: "Leave Request Tracker",
      subtitle: "Upcoming and recent student requests",
      status: "Planned",
      filterValue: "Planned",
      metricLabel: "Requests",
      metricValue: "2 open",
      progress: 78,
      summary: "Two requests need attention, including one leave plan for the next class cycle.",
      tags: ["Request flow", "Needs review", "Student action"],
      facts: [
        { label: "Latest Draft", value: "Medical leave for Apr 30" },
        { label: "Approval State", value: "Awaiting submission" },
        { label: "Past Requests", value: "3 resolved" },
        { label: "Need Attention", value: "Attach doctor note if needed" },
      ],
      checklist: [
        { id: "draft", label: "Request draft prepared", done: true },
        { id: "submit", label: "Request submitted", done: false },
        { id: "support", label: "Supporting note attached", done: false },
      ],
      latestNote: "Finish the supporting note before submitting the request to avoid delays.",
      pinned: false,
      primaryActive: true,
    },
    {
      id: "profile-3",
      name: "Document Wallet",
      subtitle: "Student ID, address, and verification files",
      status: "Submitted",
      filterValue: "Submitted",
      metricLabel: "Documents",
      metricValue: "6 files",
      progress: 90,
      summary: "Most files are already synced, with one address proof update planned later this term.",
      tags: ["Documents", "Synced", "Secure"],
      facts: [
        { label: "ID Card", value: "Available" },
        { label: "Address Proof", value: "Needs refresh in June" },
        { label: "Guardian File", value: "Verified" },
        { label: "Storage State", value: "Healthy" },
      ],
      checklist: [
        { id: "id", label: "ID card stored", done: true },
        { id: "guardian", label: "Guardian proof checked", done: true },
        { id: "address", label: "Address proof refresh scheduled", done: false },
      ],
      latestNote: "This section is healthy and only needs a scheduled refresh later.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

const adminSettingsWorkspace = {
  eyebrow: "Control Center",
  title: "Settings",
  description:
    "Manage platform behavior, attendance policy defaults, and system guardrails without leaving the app shell.",
  searchPlaceholder: "Search settings, policies, schedules, or platform controls",
  filters: ["All", "Enabled", "Review", "Scheduled"],
  stats: [
    { label: "Policy Blocks", value: "9", detail: "Attendance, alerts, access, and reporting controls" },
    { label: "Enabled Controls", value: "6", detail: "Currently active platform behaviors" },
    { label: "Need Review", value: "2", detail: "Changes waiting for admin confirmation" },
    { label: "Scheduled Updates", value: "1", detail: "One setting changes at next term start" },
  ],
  quickActions: [
    { label: "Review Needed", filter: "Review" },
    { label: "Scheduled", filter: "Scheduled" },
    { label: "Search Attendance", query: "Attendance" },
  ],
  activity: [
    { title: "Policy edited", detail: "Low attendance threshold draft updated from 70% to 75%.", time: "09:15 AM" },
    { title: "Reporting cadence", detail: "Monthly report schedule confirmed for next term.", time: "Today" },
    { title: "Parent portal", detail: "Link expiry setting reviewed and kept unchanged.", time: "Yesterday" },
  ],
  primaryAction: { inactive: "Mark For Review", active: "Review Tagged" },
  records: [
    {
      id: "settings-1",
      name: "Attendance Threshold Policy",
      subtitle: "Default warning and escalation levels",
      status: "Review",
      filterValue: "Review",
      metricLabel: "Current Threshold",
      metricValue: "75%",
      progress: 75,
      summary: "Defines when warnings and escalations should trigger for low attendance cases.",
      tags: ["Attendance", "Escalation", "Priority"],
      facts: [
        { label: "Warning Trigger", value: "Below 75%" },
        { label: "Critical Trigger", value: "Below 65%" },
        { label: "Last Updated", value: "This week" },
        { label: "Needs Action", value: "Approval" },
      ],
      checklist: [
        { id: "draft", label: "Draft updated", done: true },
        { id: "approve", label: "Admin approval complete", done: false },
        { id: "publish", label: "Publish note prepared", done: false },
      ],
      latestNote: "This should be reviewed before the next automated alert cycle runs.",
      pinned: true,
      primaryActive: true,
    },
    {
      id: "settings-2",
      name: "Parent Portal Access",
      subtitle: "Link behavior and communication safeguards",
      status: "Enabled",
      filterValue: "Enabled",
      metricLabel: "Link Expiry",
      metricValue: "7 days",
      progress: 88,
      summary: "Secure parent access is active with controlled expiry and reminder behavior.",
      tags: ["Portal", "Secure", "Enabled"],
      facts: [
        { label: "Expiry Window", value: "7 days" },
        { label: "Reminder Mode", value: "Enabled" },
        { label: "Last Review", value: "Last month" },
        { label: "Need Action", value: "None" },
      ],
      checklist: [
        { id: "expiry", label: "Expiry window checked", done: true },
        { id: "reminder", label: "Reminder copy reviewed", done: true },
        { id: "audit", label: "Security audit attached", done: false },
      ],
      latestNote: "This setting is in good shape and only needs a periodic security note attached.",
      pinned: false,
      primaryActive: false,
    },
    {
      id: "settings-3",
      name: "Monthly Executive Reports",
      subtitle: "Automated reporting cadence",
      status: "Scheduled",
      filterValue: "Scheduled",
      metricLabel: "Run Time",
      metricValue: "1st Monday",
      progress: 82,
      summary: "Scheduled reporting is configured for the next term, pending final sign-off.",
      tags: ["Reports", "Automation", "Scheduled"],
      facts: [
        { label: "Cadence", value: "Monthly" },
        { label: "Audience", value: "Admins + HODs" },
        { label: "Last Test", value: "Passed" },
        { label: "Need Action", value: "Final sign-off" },
      ],
      checklist: [
        { id: "template", label: "Template verified", done: true },
        { id: "recipients", label: "Recipients confirmed", done: true },
        { id: "signoff", label: "Final sign-off collected", done: false },
      ],
      latestNote: "A final sign-off is all that remains before this automation can be relied on every month.",
      pinned: false,
      primaryActive: false,
    },
  ],
};

function cloneWorkspace(workspace) {
  return JSON.parse(JSON.stringify(workspace));
}

function getTeacherStudentsWorkspace() {
  return cloneWorkspace(teacherStudentsWorkspace);
}

function getAdminStudentsWorkspace() {
  return cloneWorkspace(adminStudentsWorkspace);
}

function getTeacherFacultyWorkspace() {
  return cloneWorkspace(teacherFacultyWorkspace);
}

function getHodCoursesWorkspace() {
  return cloneWorkspace(hodCoursesWorkspace);
}

function getStudentCoursesWorkspace() {
  return cloneWorkspace(studentCoursesWorkspace);
}

function getAdminSettingsWorkspace() {
  return cloneWorkspace(adminSettingsWorkspace);
}

export function getModuleWorkspace(pathname, role) {
  if (pathname === "/classes") {
    return cloneWorkspace(teacherClassesWorkspace);
  }

  if (pathname === "/students") {
    return role === ROLES.ADMIN ? getAdminStudentsWorkspace() : getTeacherStudentsWorkspace();
  }

  if (pathname === "/teachers") {
    return getTeacherFacultyWorkspace();
  }

  if (pathname === "/courses") {
    return role === ROLES.STUDENT ? getStudentCoursesWorkspace() : getHodCoursesWorkspace();
  }

  if (pathname === "/departments") {
    return cloneWorkspace(adminDepartmentsWorkspace);
  }

  if (pathname === "/institutes") {
    return cloneWorkspace(superAdminInstitutesWorkspace);
  }

  if (pathname === "/admins") {
    return cloneWorkspace(superAdminAdminsWorkspace);
  }

  if (pathname === "/users") {
    return cloneWorkspace(superAdminUsersWorkspace);
  }

  if (pathname === "/profile") {
    return cloneWorkspace(studentProfileWorkspace);
  }

  if (pathname === "/settings") {
    return getAdminSettingsWorkspace();
  }

  return null;
}
