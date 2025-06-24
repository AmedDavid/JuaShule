function Groups(){
   return (
  <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/image/background.jpg')" }}
>
    <div className="bg-white p-10 rounded-2xl shadow-lg  w-[85%] max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 ">Create a Group</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Group Name</label>
          <input type="email" className="w-full border rounded px-4 py-2" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Group Description</label>
          <input type="password" className="w-full border rounded px-4 py-2" />
        </div>
        <button type="submit" className="w-[30%] bg-primary text-white py-2 rounded">
          Create Group
        </button>
      </form>
    </div>
    

  </div>
);
}
export default Groups