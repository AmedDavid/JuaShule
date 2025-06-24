function Home() {
  return (
    <>
    <section
    className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    style={{ backgroundImage: "url('/image/library.jpg')" }} >
      
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white p-4  mb-4">Welcome to JuaShule</h1>
      <p className="text-lg  text-white mb-6">A peer-to-peer learning platform for students to share resources, ask questions, and collaborate.</p>
      </div>
      </section>
      <section className="py-16 bg-gray-50">
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
      </section>
   
   </>
  );
}

export default Home;