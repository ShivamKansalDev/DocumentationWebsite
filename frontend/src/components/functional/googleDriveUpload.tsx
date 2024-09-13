/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { AuthInstance, GoogleDriveProps } from "../../types/components";

const CLIENT_ID =
  "601547264835-64ugahcab1hfnu4bi9mml3igt50najic.apps.googleusercontent.com";
const API_KEY = "AIzaSyDlGPsKd3zdgbcuwPZvwJ13CYInLtprukQ";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/drive.file";

const GoogleDriveUpload: React.FC<GoogleDriveProps> = (props) => {
  const { addQuestion, setAddQuestion, inputFiles, addNewQuestion } = props;
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [authInstance, setAuthInstance] = useState<AuthInstance | null>();
  const [submit, setSubmit] = useState<boolean | null>(null);
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          setAuthInstance(auth);
          auth.isSignedIn.listen(setIsSignedIn);
          setIsSignedIn(auth.isSignedIn.get());
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  useEffect(() => {
    if (submit) {
      if (links.length < inputFiles.length) {
        handleFileUpload(links.length);
      } else if (links.length === inputFiles.length) {
        addNewQuestion().then(() => {
          setSubmit(false);
        });
      }
    }
  }, [submit, links]);

  const handleFileUpload = async (index: number, edit: boolean = false) => {
    const file = inputFiles[index];
    if (file && !edit) {
      const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: ["1mRwpc_MpHlhM_hvGzmqeBf1pDJyun295"], // Optional: specify a folder ID
      };

      const accessToken = gapi.auth.getToken().access_token;
      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", file);

      await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
          body: form,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded:", data);
          const url = `https://drive.google.com/thumbnail?id=${data.id}&sz=w1000`;
          const uploadedLinks = Array.from(links);
          uploadedLinks.push(url);
          if (uploadedLinks.length === inputFiles.length) {
            setAddQuestion({
              ...addQuestion,
              attachments: uploadedLinks,
            });
          }
          setLinks(uploadedLinks);
        })
        .catch((error) => console.error("Error uploading file:", error));
    } else if (file && edit) {
      return;
    }
  };

  return (
    <div className="flex flex-col item justify-center text-center relative">
      <div className="font-semibold text-lg mb-3">
        Upload attachments to your file here
      </div>
      {isSignedIn ? (
        <div className="flex flex-col gap-2">
          <>
            <div
              className="border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-light-primary hover:text-white"
              onClick={() => setSubmit(true)}
            >
              Upload files
            </div>
            <button
              onClick={() => {
                if (authInstance) {
                  authInstance.signOut();
                }
              }}
              className="border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-light-primary hover:text-white"
            >
              Sign Out
            </button>
          </>
        </div>
      ) : (
        <button
          onClick={() => {
            if (authInstance) {
              authInstance.signIn();
            }
          }}
          className="border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-light-primary hover:text-white"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default GoogleDriveUpload;
