import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export  function DashProfile() {
  const {currentUser} = useSelector( state=> state.user);
  const [imgFile,setImgFile] = useState(null);
  const [imgFileUrl,setImgFileUrl] = useState(null);
  const [imageFileUploadingProgress,setImageFileUploadingProgress] = useState(null);
  const [imageFileUploaderror,setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  const handleImageClick = (e)=>{
    const file = e.target.files[0];
    if(file){
      setImgFile(file);
      setImgFileUrl(URL.createObjectURL(file));
    }
    console.log(imgFileUrl)
  }
  useEffect(()=>{
    if(imgFile){
      uploadImg();
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
  },[imgFile])
  
  const uploadImg = ()=>{
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName =new Date().getTime() + imgFile.name;
    //the time added makes the filename unique
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,imgFile)
    uploadTask.on(
      'state-changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error)=>{
        setImageFileUploadError('Could not upload image(File Must be atmost 2MB');
        setImgFile(null);
        setImgFileUrl(null)
        
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImgFileUrl(downloadURL);
        });
      },
    );
  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='gap-4 flex flex-col'>
        <input type='file' accept='image/*' hidden onChange={handleImageClick} ref={filePickerRef}/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
        <img 
          src={imgFileUrl || currentUser.profilePicture} 
          alt="User" 
          className={`rounded-full w-full h-full border-4 border-slate-500 object-cover ${imageFileUploadingProgress && imageFileUploadingProgress< 100 && 'opacity-60'}`} 
        />
        {imageFileUploadingProgress<100 && imageFileUploadingProgress>0 && (
            <CircularProgressbar value={imageFileUploadingProgress || 0 } text={`${imageFileUploadingProgress}%`} strokeWidth={5} styles={
              {
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:0,
                  left:0,
                },
                path:{
                  stroke:`rgba(62,152,199,${imageFileUploadingProgress/100})`
                }
              }
            } />
          )}
      </div>
        {imageFileUploaderror && (
          <Alert color='failure'>{imageFileUploaderror}</Alert>
        )}
        <TextInput
        type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username} 
        />
        <TextInput 
          type='email' 
          id='email' 
          placeholder='email' 
          defaultValue={currentUser.email} 
        />
        <TextInput 
          type='password' 
          id='password' 
          placeholder='password'  
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline >
          Update
        </Button>
        <div className='flex justify-between text-red-500 mt-5'>
          <span className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer'> Sign Out </span>
        </div>
        
      </form>
    </div>
  )
}
