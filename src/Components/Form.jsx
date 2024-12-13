import React, { useEffect, useState } from 'react';
import { PostData, UpdateData } from './Api/PostApi';

const Form = ({ data, setData, UpdatePost, setUpdatePost }) => {
    const [addData, setAddData] = useState({
        title: "",
        body: "",
    });

    let isEmpty = Object.keys(UpdatePost).length === 0;

    // Sync the form data with the `UpdatePost` when it changes
    useEffect(() => {
        if (UpdatePost) {
            setAddData({
                title: UpdatePost.title || "",
                body: UpdatePost.body || "",
            });
        }
    }, [UpdatePost]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addPostData = async () => {
        if (!addData.title || !addData.body) {
            alert("Both title and body are required!");
            return;
        }

        try {
            const res = await PostData(addData);
            if (res.status === 201) {
                setData([...data, res.data]);
                setAddData({ title: "", body: "" });
                setUpdatePost({});
            }
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    const UpdatePostData = async () => {

        try {
            const res = await UpdateData(UpdatePost.id, addData)

            if (res.status === 200) {
                setData((prev) => {
                    return prev.map((curElem) => {
                        return curElem.id === res.data.id ? res.data : curElem;
                    })
                })
                setAddData({ title: "", body: "" });
                setUpdatePost({})
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleFormSubmit = (e,action) => {
        e.preventDefault();
        if (action === "Add") {
            addPostData();
        } else if (action === "Edit") {
            UpdatePostData()
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    autoComplete="off"
                    id="title"
                    name="title"
                    placeholder="Add Title"
                    value={addData.title}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="body">Body</label>
                <input
                    type="text"
                    autoComplete="off"
                    id="body"
                    name="body"
                    placeholder="Add Post"
                    value={addData.body}
                    onChange={handleInputChange}
                />
            </div>
            <button
                type="button"
                onClick={(e) => handleFormSubmit(e, "Add")}
                disabled={!isEmpty}
            >
                Add
            </button>
            {!isEmpty && (
                <button
                    type="button"
                    onClick={(e) => handleFormSubmit(e, "Edit")}
                >
                    Edit
                </button>
            )}
        </form>
    );
};

export default Form;
