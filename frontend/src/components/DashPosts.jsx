import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NProgress from 'nprogress';
import { Table, Modal, Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        NProgress.start();
        if (currentUser.isSuperAdmin) {
          const res = await fetch(`/api/post/getposts`);
          const data = await res.json();
          if (res.ok) {
            setPosts(data.posts);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        } else {
          const res = await fetch(
            `/api/post/getposts?userId=${currentUser._id}`
          );
          const data = await res.json();
          if (res.ok) {
            setPosts(data.posts);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }finally{
        NProgress.done();
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    setShowMoreLoading(true);
    if (currentUser.isAdmin && currentUser.isSuperAdmin) {
      try {
        NProgress.start();
        const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
        const data = await res.json();
        if (res.ok) {
          setShowMoreLoading(false);
          setPosts((prev) => [...prev, ...data.posts]);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
      NProgress.done();
    } else {
      try {
        NProgress.start();
        const res = await fetch(
          `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
        );
        const data = await res.json();
        if (res.ok) {
          setShowMoreLoading(false);
          setPosts((prev) => [...prev, ...data.posts]);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
      NProgress.done();
    }
  };
  const handleDeletePost = async () => {
    setShowModal(false);

    try {
      NProgress.start();
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
    NProgress.done();
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-transparent scrollbar-thumb-transparent dark:scrollbar-track-transparent">
      {currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable className="shadow-mb">
            <Table.Head className="">
              <Table.HeadCell>No.</Table.HeadCell>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {posts.map((post,index) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                    {index + 1 + "."}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="font-medium min-w-72">
                    {post.title}
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="text-red-600 font-medium hover:cursor-pointer  underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center py-7"
            >
              {showMoreLoading ? <Spinner className="w-5 h-5" /> : "Show More"}
            </button>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl" />
        </div>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="focus:ring-0"
                color="failure"
                onClick={handleDeletePost}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="focus:ring-0"
                color="gray"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
