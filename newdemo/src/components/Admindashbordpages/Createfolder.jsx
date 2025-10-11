import React, { useState, useEffect } from "react";

 // Vite proxy will forward this to https://api.sslcloudservices.com/auth

const Url_getfolders = "/auth/folders";
const Url_createfolder = "/auth/foldercreate";
const Url_deletefolder = "/auth/folders";
const Url_updatefolder = "/auth/folders";

const FolderManager = () => {
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const fetchFolders = async () => {
    try {
      const res = await fetch( ` ${Url_getfolders}`);
      if (res.ok) {
        const data = await res.json();
        setFolders(data.folders || []);
      } else {
        console.error("Error fetching folders");
      }
    } catch (error) {
      console.error("Server error", error);
    }
  };

  const createFolder = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch( `${Url_createfolder}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: folderName }),
      });

      if (res.ok) {
        alert("Folder created successfully");
        setFolderName("");
        fetchFolders();
      } else {
        alert("Error creating folder");
      }
    } catch (error) {
      console.error("Server error", error);
    }
  };

  const deleteFolder = async (name) => {
    if (!window.confirm(`Delete folder "${name}"?`)) return;

    try {
      const res = await fetch( `${Url_deletefolder}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        alert("Folder deleted");
        fetchFolders();
      } else {
        alert("Error deleting folder");
      }
    } catch (error) {
      console.error("Server error", error);
    }
  };

  const openUpdatePopup = (folder) => {
    setSelectedFolder(folder);
    setUpdateName(folder.name);
    setIsUpdateOpen(true);
  };

  const updateFolder = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch( `${Url_updatefolder}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldName: selectedFolder.name,
          name: updateName,
        }),
      });

      if (res.ok) {
        alert("Folder updated successfully");
        setIsUpdateOpen(false);
        fetchFolders();
      } else {
        const err = await res.json();
        alert(`Error: ${err.message || "Failed to update"}`);
      }
    } catch (error) {
      console.error("Server error", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded space-y-6">
      {/* Create Folder Form */}
      <form onSubmit={createFolder} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
          className="border p-2 rounded flex-1"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Folder
        </button>
      </form>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Folder Name</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {folders.length > 0 ? (
              folders.map((folder, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{folder.name}</td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => openUpdatePopup(folder)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFolder(folder.name)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="p-3 border-b text-center text-gray-500"
                >
                  No folders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {folders.length > 0 ? (
          folders.map((folder, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow border"
            >
              <p className="font-bold">#{index + 1}</p>
              <p><strong>Folder Name:</strong> {folder.name}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => openUpdatePopup(folder)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFolder(folder.name)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No folders found</p>
        )}
      </div>

      {/* Update Popup */}
      {isUpdateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-lg font-semibold mb-4">Update Folder</h2>
            <form onSubmit={updateFolder}>
              <input
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderManager;
