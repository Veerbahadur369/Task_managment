import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaUpload,
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaDownload,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  /* File icon based on extension */
  const getFileIcon = (ext) => {
    if (!ext) return <FaFileAlt />;
    if (ext === "pdf") return <FaFilePdf />;
    if (["png", "jpg", "jpeg", "gif"].includes(ext))
      return <FaFileImage />;
    if (["doc", "docx"].includes(ext)) return <FaFileWord />;
    return <FaFileAlt />;
  };

  /* Fetch documents */
  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/users/documents",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 🔹 Normalize backend response
      const formattedDocs = res.data.documents.map((doc) => ({
        id: doc.id,
        name: doc.documentName,
        url: doc.documentUrl,
        status: doc.status,
        createdAt: doc.createdAt,
        type: doc.documentName.split(".").pop().toLowerCase(),
      }));

      setDocuments(formattedDocs);
    } catch (error) {
      toast.error("Failed to load documents");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  /* Upload document */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.warn("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:4000/api/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Document uploaded successfully");

      // 🔹 Add uploaded document immediately
      const uploaded = res.data.data;
      setDocuments((prev) => [
        {
          id: uploaded.id,
          name: uploaded.documentName,
          url: uploaded.documentUrl,
          status: uploaded.status,
          createdAt: uploaded.createdAt,
          type: uploaded.documentName.split(".").pop().toLowerCase(),
        },
        ...prev,
      ]);

      setFile(null);
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
     const handleDownload = async (id, name) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/documents/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Download failed");
      console.error(error);
    }    
  }   
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-8"
    >
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center gap-3">
        <FaFileAlt className="text-emerald-600 text-2xl" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Documents
        </h2>
      </div>

      {/* Upload Section */}
      <form
        onSubmit={handleUpload}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4"
      >
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Upload Document
        </label>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-xl file:border-0
                       file:bg-emerald-600 file:text-white
                       hover:file:bg-emerald-700"
          />

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center justify-center gap-2 px-6 py-2
                       rounded-xl bg-emerald-600 text-white font-medium
                       hover:bg-emerald-700 transition disabled:opacity-60"
          >
            <FaUpload />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500 dark:text-gray-400">
          Loading documents...
        </p>
      )}

      {/* Empty State */}
      {!loading && documents.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center">
          <FaFileAlt className="mx-auto text-4xl text-gray-400 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No documents uploaded yet.
          </p>
        </div>
      )}

      {/* Documents Grid */}
      {!loading && documents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 space-y-3"
            >
              <div className="flex items-center gap-3 text-emerald-600 min-text-4xl">
                {getFileIcon(doc.type)}
                <span className="font-semibold text-gray-800 dark:text-white truncate">
                  {doc.name}
                </span>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: <span className="font-medium">{doc.status}</span>
              </p>

              <p className="text-xs text-gray-400">
                Uploaded on{" "}
                {new Date(doc.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDownload(doc.id, doc.name)}
                className="w-full px-4 py-2   bg-emerald-600 text-white rounded-xl  hover:bg-emerald-700"
              >
                download <FaDownload className="inline-block ml-2" />
              </button> 
                 
              
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default UserDocuments;
