import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../firebase/auth"; // adjust path as needed
import { convertFileToBase64 } from "../utils/convertFileToBase64";

type Category = {
  id: string;
  name: string;
};

const AddBlogPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const db = getFirestore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catCol = collection(db, "categories");
        const catSnap = await getDocs(catCol);
        const catList = catSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { name: string }),
        }));
        setCategories(catList);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, db]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setImages((prev) => [...prev, ...filesArray]);

    const base64s = await Promise.all(filesArray.map(convertFileToBase64));
    setBase64Images((prev) => [...prev, ...base64s]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setBase64Images((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to add a blog post.");
      return;
    }
    if (!title.trim() || !content.trim()) {
      alert("Please fill in title and content.");
      return;
    }
    if (!selectedCategoryId) {
      alert("Please select a category.");
      return;
    }
    setUploading(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        images: base64Images,
        categoryId: selectedCategoryId,
        authorUid: user.uid,
        authorName: user.displayName || "Unknown",
        createdAt: new Date().toISOString(),
        views: 0,
      });

      alert("Blog post added successfully!");
      setTitle("");
      setContent("");
      setImages([]);
      setBase64Images([]);
      setSelectedCategoryId("");
      onClose();
    } catch (err) {
      console.error("Error adding blog post:", err);
      alert("Failed to add blog post.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[820px] max-w-full p-8 relative max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          disabled={uploading}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          &#10005;
        </button>

        <h2 className="text-center text-xl font-semibold mb-2">Blog Post</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              disabled={uploading}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 mb-1">
              Content
            </label>
            <input
              id="description"
              type="text"
              placeholder="Content"
              value={content}
              disabled={uploading}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={selectedCategoryId}
              disabled={uploading}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Images</label>
            <label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-purple-600 ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <span className="text-sm text-gray-600 underline">
                Click here to Upload
              </span>
              <input
                multiple
                id="image-upload"
                type="file"
                accept="image/*"
                disabled={uploading}
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {base64Images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4 max-h-40 overflow-auto">
              {base64Images.map((base64, idx) => (
                <div
                  key={idx}
                  className="relative group border border-gray-300 rounded overflow-hidden w-24 h-24"
                >
                  <img
                    src={base64}
                    alt={`preview-${idx}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    disabled={uploading}
                    title="Remove image"
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={uploading}
          className={`mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition w-full ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddBlogPopup;
