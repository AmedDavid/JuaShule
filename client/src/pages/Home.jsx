function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to JuaShule</h1>
      <p className="text-lg mb-6">A peer-to-peer learning platform for students to share resources, ask questions, and collaborate.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-secondary">Ask Questions</h2>
          <p>Post and answer academic questions in subjects like Maths and Kiswahili.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-secondary">Share Resources</h2>
          <p>Upload and download study notes and past papers.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-secondary">Join Study Groups</h2>
          <p>Collaborate with peers for group revision.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;