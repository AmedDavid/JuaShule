function Home() {
  return (
    <>
    <section
    className="w-full h-[80vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
    style={{ backgroundImage: "url('/image/library.jpg')" }} >
      
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white p-4  mb-4">Welcome to JuaShule</h1>
      <p className="text-lg  text-white mb-6">A peer-to-peer learning platform for students to share resources, ask questions, and collaborate.</p>
      </div>
      </section>
      <section className="py-16 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-accent">Ask Questions</h2>
          <p>Stuck on a topic? <br></br>Get help from fellow students. Post academic questions in subjects like Math, Kiswahili, and Science.</p>
           <ul className="text-sm text-gray-600 list-disc list-inside text-left mb-4">
              <li>How do I solve a quadratic equation?</li>
              <li>What’s the difference between mitosis and meiosis?</li>
              <li>How do I write a good Kiswahili Insha?</li>
            </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-accent">Share Resources</h2>
          <p>Make learning easier for others and yourself by sharing notes, past papers, or helpful PDFs.</p>
          <ul className="text-sm text-gray-600 list-disc list-inside text-left mb-4">
            <li>Lecture Notes & Handouts</li>
           <li>Past Exam Papers</li>
           <li>Project Reports</li>
           <li>Course Outlines</li>
       </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-accent">Join Study Groups</h2>
          <p>Collaborate with peers in subject-specific groups to revise together, tackle assignments, and prepare for exams more effectively.</p>
           <ul className="text-sm text-gray-600 list-disc list-inside text-left mb-4">
            <li>Maths Discussion Circles</li>
            <li>Essay Writing Practice</li>
            <li>Exam Prep Crash Groups</li>
            <li>Research & Final Year Projects</li>
          </ul>
        </div>
      </div>
      </section>
   
   </>
  );
}

export default Home;