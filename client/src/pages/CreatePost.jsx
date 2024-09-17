import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 mx-auto max-w-3xl min-h-screen'>
      <h1 className='text-center font-semibold text-3xl my-7'>Create Post</h1>
      <form className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput required placeholder='Title' id='title' className='flex-1'/>
        <Select>
          <option value='uncategorized'>Select category</option>
          <option value='sports'>sports</option>
          <option value='business'>business</option>
          <option value='health'>health</option>
          <option value='politics'>politics</option>
          <option value='entertainment'>entertainment</option>
          <option value='general'>general</option>
          <option value='Technology'>Technology</option>
          <option value='international'>international</option>
          <option value='education'>education</option>
        </Select>
      </div>
      <div className="flex gap-4 items-center justify-between border-4 border-dotted border-teal-500 p-3">
        <FileInput type='file' accept='images/*' />
        <Button type='button' gradientDuoTone='purpleToBlue' outline>Upload Image</Button>
      </div>
      <ReactQuill theme='snow' placeholder='Write something' className='h-72 mb-12' required />
      <Button gradientDuoTone='purpleToPink' type='submit'>Publish</Button>
      </form>
    </div>
  )
}
