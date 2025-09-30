import React from "react";

export default function App() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-4xl font-extrabold text-green-600 mb-4 text-center">
                HumaneBench Website
            </h1>
            <p className="text-lg text-gray-700 text-center max-w-md">
                In the works! Currently just a simple placeholder.
            </p>
            <footer className="mt-12 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} HumaneBench
            </footer>
        </div>
    );
}
