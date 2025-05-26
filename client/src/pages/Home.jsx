// src/pages/Home.jsx

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
        Тавтай морилно уу!
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-xl">
        Энэ бол таны СӨХ-ийн мэдээллийг хялбархан хянах, удирдах боломжтой систем юм.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition-all"
        >
          Нэвтрэх
        </Link>
        <Link
          to="/register"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl shadow transition-all"
        >
          Бүртгүүлэх
        </Link>
      </div>

      <footer className="mt-16 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} СӨХ Менежмент Систем
      </footer>
    </div>
  );
};

export default Home;
