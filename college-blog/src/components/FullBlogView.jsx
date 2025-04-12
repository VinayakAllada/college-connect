
//import img1 from "./assets/leetcode.jpg"
//import img2 from "./assets/leetcode.jpg"
//import img3 from "./assets/leetcode.jpg"

//import React, { useState } from "react";
//import Slider from "react-slick";
//import {
//  FaArrowLeft,
//  FaArrowRight,
//  FaHeart,
//  FaRegHeart,
//  FaShareAlt,
//} from "react-icons/fa";
//import { toast } from "react-toastify";
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

//const SampleNextArrow = ({ onClick }) => (
//  <div
//    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-3xl text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700"
//    onClick={onClick}
//  >
//    <FaArrowRight />
//  </div>
//);

//const SamplePrevArrow = ({ onClick }) => (
//  <div
//    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-3xl text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700"
//    onClick={onClick}
//  >
//    <FaArrowLeft />
//  </div>
//);

//const FullBlogView = () => {
//  const [liked, setLiked] = useState(false);
//  const [likes, setLikes] = useState(120);

//  const blog = {
//    title: "Exploring React's Power",
//    description: `<p>React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable UI components, manage application state, and build responsive apps efficiently.</p>
//      <p><strong>Features:</strong> Component-based, Virtual DOM, Declarative views, Fast rendering.</p>
//      <p>Learn more at <a href="https://reactjs.org" target="_blank">React Official Docs</a></p>`,
//    images: [
//       img1,img2,img3
//    ],
//    pdfs: [
//      {
//        name: "React Guide PDF",
//        url: "https://www.africau.edu/images/default/sample.pdf",
//      },
//    ],
//  };

//  const handleLike = () => {
//    setLiked(!liked);
//    setLikes((prev) => (liked ? prev - 1 : prev + 1));
//  };

//  const handleShare = () => {
//    const dummyURL = window.location.href;
//    navigator.clipboard.writeText(dummyURL);
//    toast.success("Blog URL copied to clipboard!");
//  };

//  const sliderSettings = {
//    dots: true,
//    infinite: true,
//    speed: 500,
//    nextArrow: <SampleNextArrow />,
//    prevArrow: <SamplePrevArrow />,
//    slidesToShow: 1,
//    slidesToScroll: 1,
//  };

//  return (
//    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
//      <h1 className="text-3xl font-bold mb-6 text-blue-700">{blog.title}</h1>

//      {/* Image Slider with Cover + Others */}
//      <div className="relative mb-4">
//        <Slider {...sliderSettings}>
//          {blog.images.map((img, i) => (
//            <div key={i}>
//              <img
//                src={img}
//                alt={`blog-img-${i}`}
//                className="w-full h-96 object-cover rounded"
//              />
//            </div>
//          ))}
//        </Slider>

//        {/* Like and Share Buttons */}
//        <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-20">
//          <button
//            onClick={handleLike}
//            className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow text-red-500 hover:text-red-600"
//          >
//            {liked ? <FaHeart /> : <FaRegHeart />}
//            <span>{likes}</span>
//          </button>
//          <button
//            onClick={handleShare}
//            className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow text-blue-600 hover:text-blue-800"
//          >
//            <FaShareAlt />
//            <span className="text-sm">Share</span>
//          </button>
//        </div>
//      </div>

//      {/* Blog Description */}
//      <div
//        className="prose max-w-full"
//        dangerouslySetInnerHTML={{ __html: blog.description }}
//      />

//      {/* PDFs */}
//      {blog.pdfs.length > 0 && (
//        <div className="mt-6">
//          <h2 className="text-xl font-semibold mb-2">Attached PDFs</h2>
//          <ul className="list-disc list-inside">
//            {blog.pdfs.map((pdf, idx) => (
//              <li key={idx}>
//                <a
//                  href={pdf.url}
//                  target="_blank"
//                  rel="noreferrer"
//                  className="text-blue-600 hover:underline"
//                >
//                  📄 {pdf.name}
//                </a>
//              </li>
//            ))}
//          </ul>
//        </div>
//      )}

//      {/* Comments Section */}
//      <div className="mt-10">
//        <h2 className="text-xl font-semibold mb-3">Comments</h2>
//        <p className="text-gray-500 italic">No comments yet.</p>
//        <textarea
//          placeholder="Leave a comment..."
//          rows={4}
//          className="w-full mt-3 p-3 border border-gray-300 rounded-md focus:outline-blue-500"
//        />
//        <button className="mt-3 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//          Post Comment
//        </button>
//      </div>
//    </div>
//  );
//};

//export default FullBlogView;
import React, { useState } from "react";
import Slider from "react-slick";
import img1 from "./assets/leetcode.jpg"
import img2 from "./assets/leetcode.jpg"
import img3 from "./assets/leetcode.jpg"
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-3xl text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700"
    onClick={onClick}
  >
    <FaArrowRight />
  </div>
);

const SamplePrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-3xl text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700"
    onClick={onClick}
  >
    <FaArrowLeft />
  </div>
);

const FullBlogView = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(120);

  const blog = {
    title: "Exploring React's Power",
    description: `<p>React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable UI components, manage application state, and build responsive apps efficiently.</p>
      <p><strong>Features:</strong> Component-based, Virtual DOM, Declarative views, Fast rendering.</p>
      <p>Learn more at <a href="https://reactjs.org" target="_blank">React Official Docs</a></p>`,
    images: [
           img1,img2,img3
    ],
    pdfs: [
      {
        name: "React Guide PDF",
        url: "https://www.africau.edu/images/default/sample.pdf",
      },
    ],
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    const dummyURL = window.location.href;
    navigator.clipboard.writeText(dummyURL);
    toast.success("Blog URL copied to clipboard!");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">{blog.title}</h1>

      {/* Image Slider with Cover + Others */}
      <div className="relative mb-4">
        <Slider {...sliderSettings}>
          {blog.images.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={`blog-img-${i}`}
                className="w-full h-96 object-cover rounded"
              />
            </div>
          ))}
        </Slider>

        {/* Like and Share Buttons */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-20">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow text-red-500 hover:text-red-600"
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span>{likes}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow text-blue-600 hover:text-blue-800"
          >
            <FaShareAlt />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {/* Blog Description */}
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      {/* PDFs */}
      {blog.pdfs.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Attached PDFs</h2>
          <ul className="list-disc list-inside">
            {blog.pdfs.map((pdf, idx) => (
              <li key={idx}>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  📄 {pdf.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Comments</h2>
        <p className="text-gray-500 italic">No comments yet.</p>
        <textarea
          placeholder="Leave a comment..."
          rows={4}
          className="w-full mt-3 p-3 border border-gray-300 rounded-md focus:outline-blue-500"
        />
        <button className="mt-3 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default FullBlogView;

