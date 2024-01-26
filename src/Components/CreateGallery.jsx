import {
  Card,
  Page,
  Breadcrumbs,
  ImageViewer,
  Button,
  PopoverMenu,
  IconButton,
  EditableTitle,
} from "@wix/design-system";

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { More, Duplicate, Delete } from "@wix/wix-ui-icons-common";
import apiService from "../utils/apiService";
import uuid4 from "uuid4";

export default function CreateGallery() {
  const [files, setFiles] = useState([]);
  const [galleryName, setGalleryName] = React.useState("Untitled Gallery");
  const [editingImage, setEditingImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const hiddenFileInput = useRef(null);

  const handleClickInputButton = (event) => {
    hiddenFileInput.current.click();
  };

  async function handleChange(e) {
    setIsLoading(true);
    let fileUrl;

    if (e.target.files[0]) {
      // Generate an upload URL
      const fileName = uuid4() + "." + e.target.files[0].name.split(".")[1];
      const uploadUrl = await apiService.post(
        "site-media/v1/files/generate-upload-url",
        {
          mimeType: e.target.files[0].type,
          fileName: fileName,
          sizeInBytes: "",
          parentFolderId: "",
          private: false,
          labels: [],
          externalInfo: {},
        }
      );

      const uploadResponse = await apiService.uploadFile(
        uploadUrl.uploadUrl,
        e.target.files[0],
        fileName
      );

      if (uploadResponse.file.mediaType === "IMAGE") {
        fileUrl = {
          type: uploadResponse.file.mediaType,
          image: {
            type: uploadResponse.file.mediaType,
            imageInfo: {
              id: uploadResponse.file.id,
              url: uploadResponse.file.url,
            },
          },
        };
      } else {
        fileUrl = {
          type: uploadResponse.file.mediaType,
          video: {
            type: uploadResponse.file.mediaType,
            videoInfo: {
              id: uploadResponse.file.id,
              url: uploadResponse.file.url,
              posters: uploadResponse.file.media.video.posters,
            },
          },
        };
      }
    }
    if (e.target.files[0])
      if (editingImage) {
        setFiles(files.map((img) => (img === editingImage ? fileUrl : img)));
        setEditingImage(null);
      } else setFiles([...files, fileUrl]);
    e.target.value = null;
    setIsLoading(false);
  }

  async function handleCreateGallery() {
    await apiService.post("progallery/v2/galleries", {
      gallery: {
        name: galleryName,
        items: files,
      },
    });
    navigate("/");
  }

  return (
    <Page backgroundImageUrl="abc" height="100vh">
      <Page.Header
        title={
          <EditableTitle
            value={galleryName}
            onChange={(e) =>
              isLoading ? null : setGalleryName(e.target.value)
            }
          />
        }
        breadcrumbs={
          <Breadcrumbs
            activeId="0"
            items={[
              { id: "1", value: "Site Galleries" },
              { id: "2", value: "Gallery item" },
            ]}
          />
        }
        showBackButton
        onBackClicked={() => {
          navigate(-1);
        }}
        actionsBar={
          <div style={{ display: "flex", gap: "20px" }}>
            <PopoverMenu
              triggerElement={
                <IconButton skin="inverted">
                  <More />
                </IconButton>
              }
            >
              <PopoverMenu.MenuItem
                text="Duplicate"
                disabled={isLoading}
                prefixIcon={<Duplicate />}
              />
              <PopoverMenu.MenuItem
                text="Delete"
                disabled={isLoading}
                prefixIcon={<Delete />}
                onClick={() => navigate(-1)}
              />
            </PopoverMenu>
            <Button
              priority="secondary"
              skin="inverted"
              onClick={() => {
                navigate(-1);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateGallery} disabled={isLoading}>
              Create
            </Button>
          </div>
        }
      />
      <Page.Content>
        <Card>
          <Card.Content>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {files.map((img) => (
                <ImageViewer
                  key={
                    img.type === "IMAGE"
                      ? img.image.imageInfo.id
                      : img.video.videoInfo.id
                  }
                  imageUrl={
                    img.type === "IMAGE"
                      ? img.image.imageInfo.url
                      : img.video.videoInfo.posters[0].url
                  }
                  showUpdateButton={true}
                  showDownloadButton={true}
                  showRemoveButton={true}
                  updateImageInfo="Change image"
                  downloadImageInfo="Download image"
                  removeImageInfo="Delete image"
                  moreImageInfo="More actions"
                  onDownloadImage={() => {
                    window.open(
                      img.type === "IMAGE"
                        ? img.image.imageInfo.url
                        : img.video.videoInfo.url
                    );
                  }}
                  onRemoveImage={() => {
                    setFiles(files.filter((file) => file !== img));
                  }}
                  onUpdateImage={() => {
                    setEditingImage(img);
                    handleClickInputButton();
                  }}
                  disabled={isLoading}
                />
              ))}
              <input
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                hidden
              />
              <ImageViewer
                onAddImage={handleClickInputButton}
                disabled={isLoading}
              />
            </div>
          </Card.Content>
        </Card>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            justifyContent: "end",
          }}
        >
          <Button
            priority="secondary"
            skin="inverted"
            onClick={() => {
              navigate(-1);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateGallery} disabled={isLoading}>
            Create
          </Button>
        </div>
      </Page.Content>
    </Page>
  );
}
