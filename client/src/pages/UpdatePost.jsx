import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUploudProgress, setImageUploudProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [fetchError, setFetchError] = useState();
  const { postId } = useParams();

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setFetchError(data.message);
          return;
        }
        if (res.ok) {
          setFetchError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  const handleauploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("please Select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploudProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("image Upload failed");
          setImageUploudProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploudProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (err) {
      setImageUploadError("image upload failed");
      setImageUploudProgress(null);
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setFetchError(data.message);
        return;
      }
      if (res.ok) {
        setFetchError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (err) {
      setFetchError("Something went wrong.");
    }
  };
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  return (
    <div className="p-3 mx-auto max-w-3xl min-h-screen">
      <h1 className="text-center font-semibold text-3xl my-7">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            value={formData.title}
            required
            placeholder="Title"
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select category</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
            <option value="health">People</option>
            <option value="politics">Politics</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
            <option value="Technology">Technology</option>
            <option value="international">International</option>
            <option value="education">Education</option>
            <option value="breaking">Breaking news</option>
            <option value="trending">Trending</option>
            <option value="most-trending">Most Trending</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-dotted border-teal-500 p-3">
          <FileInput
            type="file"
            accept="images/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            className="focus:ring-0"
            type="button"
            onClick={handleauploadImage}
            gradientDuoTone="purpleToBlue"
            outline
            disabled={imageUploudProgress}
          >
            {imageUploudProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploudProgress}
                  text={`${imageUploudProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="Upload"
            className="w-full h-72 object-cover"
          />
        )}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {fetchError && <Alert color="failure">{fetchError}</Alert>}
        {formData.content1 && formData.content2 && (
          <div className="flex flex-col gap-2">
            <ReactQuill
              modules={modules}
              value={formData.content1}
              theme="snow"
              placeholder="Write something"
              className="h-full mb-12"
              required
              onChange={(value) =>
                setFormData({ ...formData, content1: value })
              }
            />
            <ReactQuill
              modules={modules}
              value={formData.content2}
              theme="snow"
              placeholder="Write something"
              className="h-full mb-12"
              required
              onChange={(value) =>
                setFormData({ ...formData, content2: value })
              }
            />
          </div>
        )}
        <Button
          className="focus:ring-0"
          gradientDuoTone="purpleToPink"
          type="submit"
        >
          Update Post
        </Button>
      </form>
    </div>
  );
}
