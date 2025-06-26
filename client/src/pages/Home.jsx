import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';

function Home() {
  return (
    <>
      <section
        className="w-full h-[80vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/image/library.jpg')" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white p-4 mb-4 drop-shadow-lg">Welcome to JuaShule</h1>
          <p className="text-lg text-white mb-6 drop-shadow">A peer-to-peer learning platform for students to share resources, ask questions, and collaborate.</p>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-10">
          <Card className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-accent-700 dark:text-accent-300 text-xl">Ask Questions</CardTitle>
              <CardDescription className="text-zinc-600 dark:text-zinc-300 font-medium">Stuck on a topic? Get help from fellow students. Post academic questions in subjects like Math, Kiswahili, and Science.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 list-disc list-inside text-left mb-2">
                <li>How do I solve a quadratic equation?</li>
                <li>What's the difference between mitosis and meiosis?</li>
                <li>How do I write a good Kiswahili Insha?</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-accent-700 dark:text-accent-300 text-xl">Share Resources</CardTitle>
              <CardDescription className="text-zinc-600 dark:text-zinc-300 font-medium">Make learning easier for others and yourself by sharing notes, past papers, or helpful PDFs.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 list-disc list-inside text-left mb-2">
                <li>Lecture Notes & Handouts</li>
                <li>Past Exam Papers</li>
                <li>Project Reports</li>
                <li>Course Outlines</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-accent-700 dark:text-accent-300 text-xl">Join Study Groups</CardTitle>
              <CardDescription className="text-zinc-600 dark:text-zinc-300 font-medium">Collaborate with peers in subject-specific groups to revise together, tackle assignments, and prepare for exams more effectively.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 list-disc list-inside text-left mb-2">
                <li>Maths Discussion Circles</li>
                <li>Essay Writing Practice</li>
                <li>Exam Prep Crash Groups</li>
                <li>Research & Final Year Projects</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Home;