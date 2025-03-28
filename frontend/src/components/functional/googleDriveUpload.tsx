import { ChangeEvent, useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { AuthInstance } from "../../types/components";

const CLIENT_ID =
  "601547264835-64ugahcab1hfnu4bi9mml3igt50najic.apps.googleusercontent.com";
//  client secret "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";
const API_KEY = "AIzaSyDlGPsKd3zdgbcuwPZvwJ13CYInLtprukQ";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/drive.file";

const GoogleDriveUpload = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authInstance, setAuthInstance] = useState<AuthInstance | null>();
  const [uploadedID, setUploadedID] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  useEffect(() => {
    if (uploadedID) {
      const newUrl = `https://drive.google.com/thumbnail?id=${uploadedID}&sz=w1000`;
      setUploadedUrl(newUrl);
      console.log(uploadedUrl);
    }
  }, [uploadedID, setUploadedUrl, uploadedUrl]);

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

  const handleSignIn = () => {
    if (authInstance) {
      authInstance.signIn();
    } else {
      return;
    }
  };

  const handleSignOut = () => {
    if (authInstance) {
      authInstance.signOut();
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (event.target.files) {
      file = event.target.files[0];
    }
    if (file) {
      const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: ["17kIU2uibbj5m3LqREPLxkPeOwilOIrlh"], // Optional: specify a folder ID
      };

      const accessToken = gapi.auth.getToken().access_token;
      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", file);
      fetch(
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
          setUploadedID(data.id);
        })
        .catch((error) => console.error("Error uploading file:", error));
    }
  };

  return (
    <div className="flex flex-col item justify-center text-center relative">
      <div className="font-semibold text-lg mb-3">
        Upload attachments to your file here
      </div>
      {isSignedIn ? (
        <div>
          <div
            className=" bg-primary-blue p-3 rounded-full cursor-pointer"
            onClick={() => {
              const item = document.getElementById("addFile");
              if (item) {
                item.click();
              }
            }}
          >
            Add product image
          </div>

          <button
            onClick={handleSignOut}
            className="p-3 rounded-full cursor-pointer"
          >
            Sign Out
          </button>
          <input
            id="addFile"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className=" border border-gray-300 p-3 rounded-lg cursor-pointer"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default GoogleDriveUpload;
