import React from 'react'

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronDown : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text style={{ fontWeight: 500 }} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.values(item).some((value) => value.toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return [...data].sort((a, b) => {
    if (payload.reversed) {
      return b[sortBy].localeCompare(a[sortBy]);
    }
    return a[sortBy].localeCompare(b[sortBy]);
  });
}

const initialData: RowData[] = [
  {
    name: "Athena Weissnat",
    company: "Little - Rippin",
    email: "Elouise.Prohaska@yahoo.com",
  },
  // Add more initial data as needed
];

export default function TableSort() {
  const [data, setData] = useState<RowData[]>(initialData);
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<RowData[]>(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [newRowData, setNewRowData] = useState<RowData>({
    name: "",
    email: "",
    company: "",
  });
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editingRowData, setEditingRowData] = useState<RowData>({
    name: "",
    email: "",
    company: "",
  });

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    // Reset new row data
    setNewRowData({
      name: "",
      email: "",
      company: "",
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof RowData
  ) => {
    setNewRowData({ ...newRowData, [key]: event.target.value });
  };

  const handleSaveNewRow = () => {
    setData([...data, { ...newRowData }]);
    setSortedData(sortData([...data, { ...newRowData }], { sortBy, reversed: reverseSortDirection, search }));
    handleModalClose();
  };

  const handleEditModalOpen = (rowData: RowData) => {
    setEditingRowData(rowData);
    setEditModalOpened(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpened(false);
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof RowData
  ) => {
    setEditingRowData({ ...editingRowData, [key]: event.target.value });
  };

  const handleSaveEditedRow = () => {
    const updatedData = data.map((row) => {
      if (row === editingRowData) {
        return { ...row, ...editingRowData };
      }
      return row;
    });

    const updatedSortedData = sortData(updatedData, { sortBy, reversed: reverseSortDirection, search });

    setData(updatedData);
    setSortedData(updatedSortedData);

    // Close the edit modal after saving
    handleEditModalClose();
  };

  const handleDeleteRow = (rowToDelete: RowData) => {
    const updatedData = data.filter((row) => row !== rowToDelete);
    setData(updatedData);
    setSortedData(updatedData);
  };

  const rows = sortedData.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
      <Table.Td>
        <Group style={{ margin: "-8px -4px" }}>
          <IconPencil
            style={{ width: rem(20), height: rem(20), color: "green", cursor: "pointer" }}
            onClick={() => handleEditModalOpen(row)}
          />
          <IconTrash
            style={{ width: rem(20), height: rem(20), color: "red", cursor: "pointer" }}
            onClick={() => handleDeleteRow(row)}
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={{ marginRight: "-50px" }}>
      <Button onClick={handleModalOpen} style={{ marginBottom: "20px", backgroundColor: "#4CAF50" }}>
        <Group>
          <IconSelector />
          <span style={{ color: "white" }}>Add New Schedule</span>
        </Group>
      </Button>

      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
          <Table.Tbody>
            <Table.Tr>
              <Th sorted={sortBy === "name"} reversed={reverseSortDirection} onSort={() => setSorting("name")}>
                Name
              </Th>
              <Th sorted={sortBy === "email"} reversed={reverseSortDirection} onSort={() => setSorting("email")}>
                Email
              </Th>
              <Th
                sorted={sortBy === "company"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("company")}
              >
                Company
              </Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(data[0]).length}>
                  <Text style={{ fontWeight: 500, textAlign: "center" }}>Nothing found</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Modal opened={modalOpened} onClose={handleModalClose} title="Add New Schedule" size="sm">
        <TextInput
          label="Name"
          value={newRowData.name}
          onChange={(event) => handleInputChange(event, "name")}
          style={{ marginBottom: "16px" }}
        />
        <TextInput
          label="Email"
          value={newRowData.email}
          onChange={(event) => handleInputChange(event, "email")}
          style={{ marginBottom: "16px" }}
        />
        <TextInput
          label="Company"
          value={newRowData.company}
          onChange={(event) => handleInputChange(event, "company")}
          style={{ marginBottom: "32px" }}
        />
        <Button onClick={handleSaveNewRow} style={{ backgroundColor: "#4CAF50" }}>
          Save
        </Button>
      </Modal>

      <Modal opened={editModalOpened} onClose={handleEditModalClose} title="Edit Schedule" size="sm">
        <TextInput
          label="Name"
          value={editingRowData.name}
          onChange={(event) => handleEditInputChange(event, "name")}
          style={{ marginBottom: "16px" }}
        />
        <TextInput
          label="Email"
          value={editingRowData.email}
          onChange={(event) => handleEditInputChange(event, "email")}
          style={{ marginBottom: "16px" }}
        />
        <TextInput
          label="Company"
          value={editingRowData.company}
          onChange={(event) => handleEditInputChange(event, "company")}
          style={{ marginBottom: "32px" }}
        />
        <Button onClick={handleSaveEditedRow} style={{ backgroundColor: "#4CAF50" }}>
          Save
        </Button>
      </Modal>
    </div>
  );
}