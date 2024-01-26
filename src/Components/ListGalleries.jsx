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
import apiService from "../utils/apiService";

function ListGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [filterGalleries, setFilterGalleries] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.get("progallery/v2/galleries");
      setGalleries(
        data.galleries.map((gallery) => ({
          ...gallery,
          name: gallery.name || "Untitled",
        }))
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    galleries &&
      setFilterGalleries(
        galleries.filter(({ name }) =>
          name ? name.toLowerCase().includes(filter.toLowerCase()) : true
        )
      );
  }, [filter, galleries]);

  const columns = [
    {
      title: "",
      width: "72px",
      render: (row) => (
        <Image
          width="72px"
          height="48px"
          src={
            row.items[0].type === "IMAGE"
              ? row.items[0].image.imageInfo.url
              : row.items[0].video.videoInfo.posters[0].url
          }
        />
      ),
    },
    {
      title: "Title",
      render: (row) => (
        <Box direction="vertical" gap="3px">
          <Text size="medium" weight="normal">
            {row.name}
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
              onClick: async () => {
                const data = await apiService.post("progallery/v2/galleries", {
                  gallery: {
                    name: rowData.name,
                    items: rowData.items,
                  },
                });
                setGalleries((prevGalleries) => [
                  data.gallery,
                  ...prevGalleries,
                ]);
              },
            },
            {
              text: "Delete",
              icon: <DeleteSmall />,
              onClick: async () => {
                await apiService.delete(`progallery/v2/galleries/${rowData.id}`);
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
        <Table data={filterGalleries} columns={columns} titleBarDisplay={false}>
          <Page.Sticky>
            <Card>
              <TableToolbar>
                <TableToolbar.ItemGroup position="start">
                  <TableToolbar.Item>
                    <Text size="small">{filterGalleries.length} galleries</Text>
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
