import {
  Image,
  Box,
  Text,
  TableActionCell,
  Page,
  Table,
  Card,
  Button,
  TableToolbar,
  Search,
} from "@wix/design-system";

import {
  EditSmall,
  DuplicateSmall,
  DeleteSmall,
} from "@wix/wix-ui-icons-common";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const records = [
  {
    id: "a045b201-ee7d-447c-b0c3-746cba83253c",
    sortOrder: 1644317968.985,
    title: "Some Title",
    description: "Some Description",
    type: "IMAGE",
    image: {
      type: "WIX_MEDIA",
      imageInfo: {
        id: "11062b_12703ed9a6574547bcaed22b1ce44eef~mv2.jpeg",
        url: "https://static.wixstatic.com/media/11062b_12703ed9a6574547bcaed22b1ce44eef~mv2.jpeg",
        height: 4298,
        width: 6446,
        altText: "Some Alt",
        filename: "11062b_12703ed9a6574547bcaed22b1ce44eef~mv2.jpeg",
      },
    },
    createdDate: "2022-02-08T10:59:29Z",
    tags: {
      values: ["image"],
    },
  },
  {
    id: "17c786c6-5d5d-4271-995a-02d007809064",
    sortOrder: 1642505672333,
    title: "Video",
    description: "Video description",
    type: "VIDEO",
    video: {
      type: "YOUTUBE",
      videoInfo: {
        id: "",
        resolutions: [
          {
            url: "https://www.youtube.com/watch?v=NCtzkaL2t_Y&ab_channel=TheBeatlesVEVO",
            height: 0,
            width: 0,
            format: "Youtube",
            quality: null,
            filename: null,
          },
        ],
        url: "https://www.youtube.com/watch?v=NCtzkaL2t_Y&ab_channel=TheBeatlesVEVO",
        posters: [
          {
            id: "468ec5_347f032da9a04e5b9c03ad2a14a07b52~mv2.jpg",
            url: "https://static.wixstatic.com/media/468ec5_347f032da9a04e5b9c03ad2a14a07b52~mv2.jpg",
            height: 720,
            width: 1280,
            altText: null,
            urlExpirationDate: null,
            filename: "468ec5_347f032da9a04e5b9c03ad2a14a07b52~mv2.jpg",
            sizeInBytes: null,
          },
        ],
      },
    },
    createdDate: "2022-01-18T11:34:34Z",
  },
  {
    id: "975a57a1-eccd-4e28-aac5-265be4dbb4f8",
    sortOrder: 1646212412985,
    title: "Mountainous Landscape",
    description: "Mountainous Landscape Description",
    type: "VIDEO",
    video: {
      type: "WIX_MEDIA",
      videoInfo: {
        id: "11062b_20125b6ebe434abd96c4d7773634d1db",
        resolutions: [
          {
            url: "https://video.wixstatic.com/video/11062b_20125b6ebe434abd96c4d7773634d1db/480p/mp4/file.mp4",
            height: 480,
            width: 854,
            format: "mp4",
            quality: "480p",
          },
          {
            url: "https://video.wixstatic.com/video/11062b_20125b6ebe434abd96c4d7773634d1db/720p/mp4/file.mp4",
            height: 720,
            width: 1280,
            format: "mp4",
            quality: "720p",
          },
          {
            url: "https://video.wixstatic.com/video/11062b_20125b6ebe434abd96c4d7773634d1db/1080p/mp4/file.mp4",
            height: 1080,
            width: 1920,
            format: "mp4",
            quality: "1080p",
          },
        ],
        filename: "11062b_20125b6ebe434abd96c4d7773634d1db",
        url: "https://video.wixstatic.com/video/11062b_20125b6ebe434abd96c4d7773634d1db/1080p/mp4/file.mp4",
        posters: [
          {
            id: "11062b_20125b6ebe434abd96c4d7773634d1dbf000.jpg",
            url: "https://static.wixstatic.com/media/11062b_20125b6ebe434abd96c4d7773634d1dbf000.jpg",
            height: 2160,
            width: 3840,
            filename: "11062b_20125b6ebe434abd96c4d7773634d1dbf000.jpg",
          },
          {
            id: "11062b_20125b6ebe434abd96c4d7773634d1dbf001.jpg",
            url: "https://static.wixstatic.com/media/11062b_20125b6ebe434abd96c4d7773634d1dbf001.jpg",
            height: 2160,
            width: 3840,
            filename: "11062b_20125b6ebe434abd96c4d7773634d1dbf001.jpg",
          },
          {
            id: "11062b_20125b6ebe434abd96c4d7773634d1dbf002.jpg",
            url: "https://static.wixstatic.com/media/11062b_20125b6ebe434abd96c4d7773634d1dbf002.jpg",
            height: 2160,
            width: 3840,
            filename: "11062b_20125b6ebe434abd96c4d7773634d1dbf002.jpg",
          },
          {
            id: "11062b_20125b6ebe434abd96c4d7773634d1dbf003.jpg",
            url: "https://static.wixstatic.com/media/11062b_20125b6ebe434abd96c4d7773634d1dbf003.jpg",
            height: 2160,
            width: 3840,
            filename: "11062b_20125b6ebe434abd96c4d7773634d1dbf003.jpg",
          },
        ],
      },
      duration: "20000",
    },
    createdDate: "2022-03-02T09:13:33Z",
  },
];

function ListGalleries() {
  const [galleries, setGalleries] = useState(records);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setGalleries(
      records.filter(({ title }) =>
        title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter]);

  const columns = [
    {
      title: "",
      width: "72px",
      render: (row) => (
        <Image
          width="72px"
          height="48px"
          src={
            row.type === "IMAGE"
              ? row.image.imageInfo.url
              : row.video.videoInfo.posters[0].url
          }
        />
      ),
    },
    {
      title: "Title",
      render: (row) => (
        <Box direction="vertical" gap="3px">
          <Text size="medium" weight="normal">
            {row.title}
          </Text>
          <Text size="tiny" weight="thin" secondary>
            {row.totalItems || 0} items .
            {moment(row.createdDate).format("MMM Do")}
          </Text>
        </Box>
      ),
      width: "40%",
    },
    {
      render: (rowData) => (
        <TableActionCell
          size="small"
          // primaryAction={primaryAction}
          secondaryActions={[
            {
              text: "Copy gallery ID",
              icon: <DuplicateSmall />,
              onClick: () => {
                navigator.clipboard.writeText(rowData.id);
              },
            },
            {
              text: "Edit gallery",
              icon: <EditSmall />,
              onClick: () => {
                navigate(`edit/${rowData.id}`);
              },
            },
            {
              divider: true,
            },
            {
              text: "Duplicate",
              icon: <DuplicateSmall />,
              onClick: () => {
                setGalleries((prevGalleries) => [...prevGalleries, rowData]);
              },
            },
            {
              text: "Delete",
              icon: <DeleteSmall />,
              onClick: () => {
                setGalleries((prevGalleries) =>
                  prevGalleries.filter((gallery) => gallery.id !== rowData.id)
                );
              },
            },
          ]}
          numOfVisibleSecondaryActions={0}
          popoverMenuProps={{ appendTo: "window" }}
          moreActionsTooltipText="More actions"
        />
      ),
    },
  ];

  return (
    <Page height="100vh">
      <Page.Header
        title="List Galleries"
        actionsBar={
          <Link to="create">
            <Button>+ Add Gallery</Button>
          </Link>
        }
      />
      <Page.Content>
        <Table data={galleries} columns={columns} titleBarDisplay={false}>
          <Page.Sticky>
            <Card>
              <TableToolbar>
                <TableToolbar.ItemGroup position="start">
                  <TableToolbar.Item>
                    <Text size="small">{galleries.length} galleries</Text>
                  </TableToolbar.Item>
                </TableToolbar.ItemGroup>
                <TableToolbar.ItemGroup position="end">
                  <TableToolbar.Item>
                    <Search
                      size="small"
                      onChange={(event) => setFilter(event.target.value)}
                      onClear={() => setFilter("")}
                    />
                  </TableToolbar.Item>
                </TableToolbar.ItemGroup>
              </TableToolbar>
            </Card>
          </Page.Sticky>
          <Card>
            <Table.Content titleBarVisible={false} />
          </Card>
        </Table>
      </Page.Content>
    </Page>
  );
}

export default ListGalleries;
