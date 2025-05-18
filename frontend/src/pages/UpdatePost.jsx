import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import NProgress from 'nprogress';
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  updateMetadata,
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


  const addTitleToIframes = (html, title = 'Embedded content') => {
    const div = document.createElement('div');
    div.innerHTML = html;
    div.querySelectorAll('iframe').forEach((iframe) => {
      if (!iframe.hasAttribute('title')) {
        iframe.setAttribute('title', title);
      }
    });
    return div.innerHTML;
  };

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        NProgress.start();
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
    NProgress.done()
  }, [postId]);

  const handleauploadImage = async () => {

    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);

      // Defining metadata here
      const metadata = {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000' // Cache for 1 year
      };

      // Passing metadata as the 3rd argument to uploadBytesResumable
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploudProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
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
      setImageUploadError("Image upload failed");
      setImageUploudProgress(null);
      console.log(err);
    }

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.content1 = addTitleToIframes(formData.content1);
    formData.content2 = addTitleToIframes(formData.content2);
    try {
      NProgress.start();
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
    NProgress.done();
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
          <TextInput
            placeholder="Hashtag"
            id="Hashtag"
            className="flex-1"
            value={formData.hashtag}
            onChange={(e) =>
              setFormData({ ...formData, hashtag: e.target.value })
            }
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select category</option>
            <option value="breaking">Breaking news</option>
            <option value="business">Business</option>
            <option value="climate">Climate</option>
            <option value="documentary">Documentary</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
            <option value="health">Health</option>
            <option value="international">International</option>
            <option value="market">Market</option>
            <option value="most-trending">Most trending</option>
            <option value="people">People</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
            <option value="trending">Trending</option>
            <option value="agriculture">Agriculture</option>
          </Select>
          {formData &&
            (formData.category === "business" ||
              formData.category === "sports" ||
              formData.category === "health" ||
              formData.category === "politics" ||
              formData.category === "entertainment" ||
              formData.category === "education" ||
              formData.category === "breaking" ||
              formData.category === "market" ||
              formData.category === "trending" ||
              formData.category === "international") && (
              <Select
                value={formData.subcategory}
                onChange={(e) => {
                  setFormData({ ...formData, subcategory: e.target.value });
                }}
              >
                {formData.category === "business" ? (
                  <div>
                    <option value="international">International</option>
                    <option value="local">Local</option>
                  </div>
                ) : formData.category === "sports" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="international">International</option>
                    <option value="local">Local</option>
                    <option value="county">County</option>
                    <option value="athletics">Athletics</option>
                    <option value="football">Football</option>
                  </div>
                ) : formData.category === "politics" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="international">International</option>
                    <option value="local">Local</option>
                    <option value="county">County</option>
                  </div>
                ) : formData.category === "entertainment" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="international">International</option>
                    <option value="local">Local</option>
                    <option value="celebrity">Celebrity</option>
                    <option value="podcast">Podcast</option>
                  </div>
                ) : formData.category === "health" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="mantal health">Mental Health</option>
                    <option value="physical therapy">Physical Therapy</option>
                  </div>
                ) : formData.category === "education" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="international">International</option>
                    <option value="local">Local</option>
                    <option value="county">County</option>
                  </div>
                ) : formData.category === "trending" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="international">International</option>
                    <option value="local">Local</option>
                  </div>
                ) : formData.category === "market" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="international">International</option>
                    <option value="local">Local</option>
                    <option value="county">County</option>
                  </div>
                ) : formData.category === "breaking" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="international">International</option>
                    <option value="local">Local</option>
                  </div>
                ) : formData.category === "international" ? (
                  <div>
                    <option>Select Subcategory</option>
                    <option value="africa">Africa</option>
                    <option value="overseas">Overseas</option>
                  </div>
                ) : (
                  <div></div>
                )}
              </Select>
            )}
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
