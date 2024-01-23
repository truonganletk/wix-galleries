import {
  Card,
  Page,
  Breadcrumbs,
  ImageViewer,
  Button,
  PopoverMenu,
  IconButton,
} from "@wix/design-system";

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { More, Duplicate, Delete } from "@wix/wix-ui-icons-common";

export default function CreateGallery() {
  const [files, setFiles] = useState([]);
  const hiddenFileInput = useRef(null);

  const handleClickInputButton = (event) => {
    hiddenFileInput.current.click();
  };

  function handleChange(e) {
    console.log(e.target.files);
    if (e.target.files[0]) setFiles([...files, URL.createObjectURL(e.target.files[0])]);
    e.target.value = null;
  }

  const navigate = useNavigate();
  return (
    <Page backgroundImageUrl="abc" height="100vh">
      <Page.Header
        title="Gallery name"
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
                prefixIcon={<Duplicate />}
              />
              <PopoverMenu.MenuItem text="Delete" prefixIcon={<Delete />} />
            </PopoverMenu>
            <Button
              priority="secondary"
              skin="inverted"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        }
      />
      <Page.Content>
        <Card>
          <Card.Content>
            <div style={{ display: "flex", gap: "20px" }}>
              {files.map((img) => (
                <ImageViewer
                  imageUrl={img}
                  showUpdateButton={true}
                  showDownloadButton={true}
                  showRemoveButton={true}
                  updateImageInfo="Change image"
                  downloadImageInfo="Download image"
                  removeImageInfo="Delete image"
                  moreImageInfo="More actions"
                  onDownloadImage={() => {
                    console.log("download");
                  }}
                  onRemoveImage={() => {
                    setFiles(files.filter((file) => file !== img));
                  }}
                />
              ))}
              <input
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                hidden
              />
              <ImageViewer onAddImage={handleClickInputButton} />
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
          >
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </Page.Content>
    </Page>
  );
}
