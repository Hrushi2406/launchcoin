import React from "react";

export function UploadImage({ seturl }) {
  const [image, setimage] = React.useState("");

  const uploadImage = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("cloud_name", "djmkshevy");
    data.append("upload_preset", "zis5oua2");
    data.append("api_key", "922768619792316");
    fetch("  https://api.cloudinary.com/v1_1/djmkshevy/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        seturl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const handleonChange = (file) => {
    setimage(file);
    uploadImage(file);
  };

  return (
    <div className="max-w-md w-full my-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 tracking-wide text-left"
        htmlFor="file_input"
      >
        Token Icon
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        onChange={(e) => handleonChange(e.target.files[0])}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p>
    </div>
  );
}
