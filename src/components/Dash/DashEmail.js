import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmailEditor from "react-email-editor";
import axios from "axios";
import { Grid } from "@mantine/core";

function DashEmail() {
  
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      var { design, html } = data;
      const post_data = {
        mtem: design,
        mailbody: html,
      };
      //axios.post('https://server.shopex.io/mailtemp.php', post_data);
    });
  };

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      const post_data = { mtem: design };
      //axios.post('https://server.shopex.io/mailtemp.php', post_data);
      //alert('Design JSON has been logged in your developer console.');
    });
  };

  /////
  const getDesign = () => {
    axios
      .get("https://server.shopex.io/mailtemp.php")
      .then(function (response) {
        // handle success
        //var back_to_html = stringify(response.data);
        //console.log(back_to_html);
        emailEditorRef.current.editor.loadDesign(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  /////

  const LoadHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      const c = html;
      emailEditorRef.current.editor.loadDesign(design);
      console.log(c);
    });
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>exportHtml</button>
      </div>

      <div>
        <button onClick={saveDesign}>Save HTML</button>
      </div>

      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  );
}

export default DashEmail;
