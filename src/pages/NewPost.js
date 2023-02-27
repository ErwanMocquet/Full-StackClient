import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

function NewPost() {
  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required("You must write something here"),
  });

  const onSubmit = (data) => {
    axios
      .post("https://full-stack-follow-through.herokuapp.com/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            className="inputCreatePost"
            name="title"
            placeholder="Ex. Title.."
          />
          <label>Post:</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            className="inputCreatePost"
            name="postText"
            placeholder="Ex. your post content.."
          />
          <button onSubmit={onSubmit} type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default NewPost;
