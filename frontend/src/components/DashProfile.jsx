import { Alert, Button, TextInput, Spinner, Modal } from "flowbite-react";
//import {MdAdd} from 'react-icons/md'
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateFail,
  updateSuccess,
  updateStartAgain,
  refresh,
  deleteStart,
  deleteSuccess,
  deleteFail,
  signoutSuccess,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export function DashProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refresh());
  }, []);
  const { currentUser } = useSelector((state) => state.user);
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =useState(null);
  const [imageFileUploaderror, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const handleImageClick = (e) => {
    const file = e.target.files[0];
    setUpdateUserSuccess(null);
    if (file) {
      setImgFile(file);
      dispatch(updateStartAgain());
      setImgFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imgFile) {
      uploadIng();
      /*service firebase.storage {
        match /b/{bucket}/o {
          match /{allPaths=**} {
            allow read;
            allow write: if 
            request.resource.size < 2 * 1024 * 1024 &&
            request.resource.contentType.matches('image/.*');
          }
        }
      }*/
    }
  }, [imgFile]);

  const uploadIng = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgFile.name;
    //the time added makes the filename unique
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state-changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image(File Must be atmost 2MB"
        );
        setImageFileUploading(false);
        setImgFile(null);
        setImgFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setUpdateUserSuccess(null);
    dispatch(updateStartAgain());
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return dispatch(updateFail("You haven't made any Changes"));
      //This checks if the formData is empty
    }
    if (imageFileUploading) {
      return dispatch(
        updateFail("The new Profile picture is still uploading,Please wait")
      );
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFail(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("UserProfile Updated successfully");
      }
    } catch (err) {
      dispatch(updateFail(err.message));
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFail(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (err) {
      dispatch(deleteFail(err.message));
    }
  };
  const handleSignout = async (req, res, next) => {
    try {
      const res = await fetch("/api/user/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageClick}
          ref={filePickerRef}
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imgFileUrl || currentUser.profilePicture}
            alt="User"
            className={`rounded-full w-full h-full border-4 border-slate-500 object-cover ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
          {imageFileUploadingProgress < 100 &&
            imageFileUploadingProgress > 0 && (
              <CircularProgressbar
                value={imageFileUploadingProgress || 0}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62,152,199,${
                      imageFileUploadingProgress / 100
                    })`,
                  },
                }}
              />
            )}
        </div>
        {imageFileUploaderror && (
          <Alert color="failure">{imageFileUploaderror}</Alert>
        )}
        {updateUserSuccess && (
          <Alert color="success">{updateUserSuccess}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />

        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}

        <Button
          disabled={loading || imageFileUploading}
          type="submit"
          gradientDuoTone="purpleToBlue"
          className="focus:ring-0"
          outline
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Updating...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
        <Link to={"/create-post"}>
          {currentUser.isAdmin && (
            <Button
              gradientDuoTone="purpleToPink"
              type="button"
              className="w-full focus:ring-0"
            >
              Create Post
            </Button>
          )}
        </Link>
        <div className="flex justify-between text-red-500 mt-5">
          <span onClick={() => setShowModal(true)} className="cursor-pointer">
            Delete Account
          </span>
          <span onClick={handleSignout} className="cursor-pointer">
            {" "}
            Sign Out{" "}
          </span>
        </div>
      </form>
      <Modal
        show={showModal}
        size="md"
        popup
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 mx-auto text-gray-400 dark:text-gray-200" />
            <h3 className="text-lg text-gray-500 dark:text-gray-400 mb-5">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="focus:ring-0"
                color="failure"
                onClick={handleDeleteUser}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="focus:ring-0"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
